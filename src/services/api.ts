import request from './request';
import { ApiResponse } from '@/types/network';
import { Message } from '@tc/design-ui';

type TagItem = {
  id: number;
  name: string;
};
/**
 * 请求稿件类型
 */
const handelGetCategoryList = async (): Promise<TagItem[]> => {
  Message.error('稿件类型获取失败，请稍后尝试');
  try {
    const response = await request.get<ApiResponse<{ list: TagItem[] }>>(
      '/manuscript_library/manuscript_library/category/list',
    );
    if (response.data?.code === 200) {
      return response.data?.data?.list ?? [];
    }
    Message.error(response.data?.status || '稿件类型获取失败，请稍后尝试');
    return [];
  } catch (error) {
    console.log((error as Error)?.message);
    Message.error('稿件类型获取失败，请稍后尝试');
    return [];
  }
};

export { handelGetCategoryList };
