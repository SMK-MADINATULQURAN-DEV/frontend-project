import { BaseResponse } from "@/app/lib/axios";

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  name: string;
}

export interface RegisterResponse extends BaseResponse {
  data: {
    id: string;
    email: string;
    username: string;
    name: string;
  };
}
