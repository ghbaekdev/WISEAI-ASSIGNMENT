export interface Post {
  id: number;
  author: {
    name: string;
    username: string;
    profileImage: string;
    verified: boolean;
  };
  content: string;
  images: string[];
  createdAt: string;
  likes: number;
  retweets: number;
  comments: number;
  isLiked: boolean;
  isRetweeted: boolean;
}
