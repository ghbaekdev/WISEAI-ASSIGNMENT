'use client';

import { PostForm } from '@/features/posts/ui/PostForm';

export const PostComposeView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101624] via-[#1a2236] to-[#22304a] flex items-center justify-center px-2">
      <main className="w-full max-w-xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
          <PostForm />
        </div>
      </main>
    </div>
  );
};
