import { getPosts } from '@/entities/posts/api/getPosts';
import { ListRequest } from '@/shared/interface';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfinitePosts = (filter: ListRequest) => {
  return useInfiniteQuery({
    queryKey: ['posts', filter],
    queryFn: ({ pageParam = 1 }) =>
      getPosts({ page: pageParam, limit: filter.limit }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
