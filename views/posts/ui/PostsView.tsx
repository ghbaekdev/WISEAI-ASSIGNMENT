'use client';

import { InfinitePostList } from '@/widgets/post/ui/InfinitePostList';
import { ComposeFab } from '@/features/posts/ui/ComposeFab';
import React from 'react';

export const PostsView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101624] via-[#1a2236] to-[#22304a] relative">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-30 w-full bg-white/60 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight drop-shadow-sm">
            무한스크롤 포스트
          </h1>
        </div>
      </header>
      {/* 포스트 카드 리스트 */}
      <main className="max-w-2xl mx-auto py-8 px-2 sm:px-4">
        <div className="space-y-4">
          <InfinitePostList />
        </div>
      </main>
      {/* 플로팅 버튼 */}
      <ComposeFab />
    </div>
  );
};
