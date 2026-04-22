import { BaseResponse } from "@/app/lib/axios";

export interface PostPayload {
  content: string;
  medias: {
    url?: string;
    type?: string;
  }[];
}

export interface PostResponseSingle {
  id: string;
  user : {
    name : string
    avatar : string
  }
  content: string;
  createdAt: Date;
  medias: {
    url: string;
    id: string;
  }[];
  likes: [];
  comments: [];
  commentsCount: number;
}
export interface PostResponse extends BaseResponse {
  data: PostResponseSingle;
}

export interface MyPostResponse extends BaseResponse {
  data: PostResponseSingle[];
  
}
