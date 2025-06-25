import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/network';
import { Message } from '@tc/design-ui';

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
  async config => {
    // 如果是文件上传，删除 Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  error => {
    Message.error('请求配置错误');
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    if (response.request.responseType === 'arraybuffer') {
      return Promise.resolve(response.data);
    }

    if (
      response?.config?.url !== '/account/check_login' &&
      response.data?.status !== 1
    ) {
      const errMessage = response?.data?.message;
      Message.error(typeof errMessage === 'string' ? errMessage : '请求失败');

      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
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
  },
);

// 导出登出函数
export const logout = async () => {
  const currentUrl = encodeURIComponent(window.location.origin + '/workbench');
  window.location.href = `/api/account/logout?next=${currentUrl}`;
};

export default request;
