import { BaseResponse } from "@/app/lib/axios"

export interface ProfileResponse extends BaseResponse {
  data: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar : string;
    bio : string
    location:string
    sampul : string
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}


export interface ProfileEditPayload {
  id:string
  name:string
  bio:string
  avatar:string
  sampul:string
  location:string
  username:string

}


export interface ChangePasswodPayload {
  newPassword : string
  oldPassword : string
  confirmPassword : string

}