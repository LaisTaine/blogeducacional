export interface Post {
  _id: number | string;
  title: string;
  description: string; 
  image?: string; 
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  // author: string;
}

export interface CreatePostBody {
  title: string;
  description: string;
  image?: string;
  isPublished: boolean;
}

export type UpdatePostBody = Partial<CreatePostBody>;