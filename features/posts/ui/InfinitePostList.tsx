'use client';

import { useInfinitePosts } from '../api/useInfinitePosts';
import { useIntersectionObserver } from '@/shared/model/useIntersectionObserver';
import { PostCard } from './PostCard';

export const InfinitePostList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfinitePosts({ page: 1, limit: 10 });

  console.log(data);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: !!hasNextPage && !isFetchingNextPage,
    threshold: 0.1,
    rootMargin: '100px',
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">
          에러가 발생했습니다: {error?.message}
        </div>
      </div>
    );
  }

  const allPosts = data?.pages.flat() || [];

  if (allPosts.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">포스트가 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* 무한 스크롤 트리거 요소 */}
      <div ref={loadMoreRef} className="py-4">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* 더 이상 로드할 데이터가 없을 때 */}
      {!hasNextPage && allPosts.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          모든 포스트를 불러왔습니다.
        </div>
      )}
    </div>
  );
};
