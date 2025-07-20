import { mockPosts } from '@/shared/config/mockPosts';
import { ListRequest } from '@/shared/interface';
import { Post } from '../types';

// 무한 스크롤용
export const getPosts = async (request: ListRequest): Promise<Post[]> => {
  const { page, limit } = request;
  // 로컬 데이터에서 페이지네이션 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
  return mockPosts.slice((page - 1) * limit, page * limit);
};
