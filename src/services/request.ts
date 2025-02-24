import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from '@/types/network';
import { Message } from '@tc/ui-react';

// 创建 axios 实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5 * 60 * 1000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  async (config) => {
    // 排除登录相关接口
    const noAuthUrls = ['/account/login', '/account/check_login'];
    if (noAuthUrls.some((url) => config.url?.includes(url))) {
      return config;
    }
    // 如果是文件上传，删除 Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
      };
    }

    return config;
  },
  (error) => {
    Message.error('请求配置错误');
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    if (error.response?.status === 401) {
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = `/api/account/login?next=${currentUrl}`;
      return Promise.reject(error);
    }

    if (error.isAxiosError) {
      return Promise.reject(error);
    }

    const errorMsg =
      (error.response?.data as ApiResponse)?.message || '请求失败';
    Message.error(errorMsg);
    return Promise.reject(error);
  }
);

// 导出检查登录状态的函数
export const checkLogin = async () => {
  try {
    const response = await request.get('/account/check_login');
    if (response?.status === 200) {
      const username = response.data?.data?.username || response.data?.username;
      // 保存用户名到 localStorage
      localStorage.setItem('username', username);
      // 触发自定义事件通知用户名更新
      window.dispatchEvent(new Event('usernameUpdated'));
      console.log('username', username);
      return {
        isLoggedIn: true,
        username,
      };
    }
    localStorage.removeItem('username');
    // 触发自定义事件通知用户名更新
    window.dispatchEvent(new Event('usernameUpdated'));
    return {
      isLoggedIn: false,
      username: null,
    };
  } catch (error: unknown ) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      localStorage.removeItem('username');
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = `/api/account/login?next=${currentUrl}`;
    }
    return {
      isLoggedIn: false,
      username: null,
    };
  }
};

const clearUserStorage = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('user-')) {
      localStorage.removeItem(key);
      // 因为删除了一个键，localStorage 的长度减少了，所以需要调整索引
      i--;
    }
  }
};


// 导出登出函数
export const logout = async () => {
  try {
    // 清除本地存储的用户信息
    localStorage.removeItem('username');
    // 登出成功后重定向到登录页
    const currentUrl = encodeURIComponent(window.location.origin+'/workbench');
    window.location.href = `/api/account/logout?next=${currentUrl}`;
    clearUserStorage();
    return true;
  } catch {
    Message.error('登出失败');
    return false;
  }
};

export default request;
