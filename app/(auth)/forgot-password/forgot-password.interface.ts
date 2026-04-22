import { BaseResponse } from "@/app/lib/axios";

export interface LupPassword {
  email: string;
}

export interface LupPasswordResponse extends BaseResponse {
  data: {
    message : string
  }
}


export interface  ResetPasswordPayload {
  email :string
  otp :string
  password : string
}

// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface VerifikasiResponse extends ResendEmailResponse {}
