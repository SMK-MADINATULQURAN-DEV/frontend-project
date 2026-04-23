import { BaseResponse } from "@/app/lib/axios";

export interface CommentPayload {
  content: string;
  postId: string;
}

export interface CommentResponse {
    id : string
    content :string
    createdAt : string
    user : {
        id : string
        name : string
        avatar :string
    }
}


export interface PostCommentResponse extends BaseResponse{
    data : {
        id : string
    }
}