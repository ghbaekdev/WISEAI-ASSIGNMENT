import { Post } from '@/entities/posts/types';
import FallbackImage from '@/shared/ui/FallbackImage';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { formatRelativeTime } from '../lib/formatRelativeTime';
import { usePostToggleLike } from '../model/usePostToggleLike';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { handleToggleLike, isToggleLikeLoading } = usePostToggleLike();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Author Info */}
      <div className="flex items-center mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
          <FallbackImage
            src={post.author.profileImage}
            alt={post.author.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-semibold text-gray-900">
              {post.author.name}
            </span>
            {post.author.verified && (
              <svg
                className="w-4 h-4 text-blue-500 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="text-gray-500 text-sm ml-1">
              @{post.author.username}
            </span>
          </div>
          <span className="text-gray-400 text-sm">
            {formatRelativeTime(post.createdAt)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3 whitespace-pre-wrap">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="mb-3">
          {post.images.length === 1 ? (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <FallbackImage
                src={post.images[0]}
                alt="Post image"
                fill
                sizes="(max-width: 740px) 300px, 600px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {post.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <FallbackImage
                    src={image}
                    alt={`Post image ${index + 1}`}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-6">
          <button
            disabled={isToggleLikeLoading}
            onClick={() => handleToggleLike(post.id)}
            className={`flex cursor-pointer items-center space-x-1 hover:text-blue-500 transition-colors ${
              post.isLiked ? 'text-blue-500' : ''
            }`}
          >
            <Heart
              size={20}
              fill={post.isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={2}
            />
            <span className="text-sm">{post.likes}</span>
          </button>

          <button
            className={`flex cursor-pointer items-center space-x-1 hover:text-green-500 transition-colors ${
              post.isRetweeted ? 'text-green-500' : ''
            }`}
          >
            <Repeat2 size={20} />
            <span className="text-sm">{post.retweets}</span>
          </button>

          <button className="flex cursor-pointer items-center space-x-1 hover:text-blue-500 transition-colors">
            <MessageCircle size={20} />
            <span className="text-sm">{post.comments}</span>
          </button>
        </div>

        <button className="hover:text-blue-500 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
