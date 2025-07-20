import { useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '@/entities/posts/api/toggleLike';
import { InfiniteQueryData } from '@/shared/interface';
import { Post } from '@/entities/posts/types';
import useToast from '@/shared/model/useToast';
import { useState } from 'react';

type InfinitePostsQueryData = InfiniteQueryData<Post>;

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const { errorToast } = useToast();
  const [isToggleLikeLoading, setIsToggleLikeLoading] = useState(false);

  const handleToggleLike = async (postId: number) => {
    setIsToggleLikeLoading(true);
    // 1. 캐시에서 현재 데이터 가져오기
    const key = ['posts', { page: 1, limit: 10 }];
    const oldData = queryClient.getQueryData<InfinitePostsQueryData>(key);

    if (!oldData) {
      setIsToggleLikeLoading(false);
      return;
    }

    // 2. 좋아요 api 호출
    const success = await toggleLike(postId);

    if (!success) {
      errorToast('좋아요 처리에 실패했습니다.');
      setIsToggleLikeLoading(false);
      return;
    }

    // 3. 해당 post의 isLiked/likes 토글
    const updated: InfinitePostsQueryData = {
      ...oldData,
      pages: oldData.pages.map((page) =>
        page.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      ),
    };

    // 4. optimistic update
    queryClient.setQueryData(key, updated);
    setIsToggleLikeLoading(false);
  };

  return { handleToggleLike, isToggleLikeLoading };
};
