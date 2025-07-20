'use client';

import Link from 'next/link';

export const ComposeFab = () => (
  <Link
    href="/compose"
    className="
      fixed z-50 right-6 bottom-6
      w-16 h-16 rounded-full
      bg-gradient-to-br from-blue-500 via-sky-400 to-blue-700
      shadow-xl shadow-blue-300/40
      flex items-center justify-center
      transition-all
      text-white text-4xl
      sm:right-8 sm:bottom-8
      hover:scale-110 hover:shadow-2xl hover:from-blue-600 hover:to-blue-800
      focus:outline-none focus:ring-2 focus:ring-blue-300
      backdrop-blur-md
      border border-white/20
    "
    aria-label="게시물 작성"
  >
    {/* + 아이콘 */}
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6v12M6 12h12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </Link>
);
