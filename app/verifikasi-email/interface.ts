import { BaseResponse } from "../lib/axios";

export interface ResendEmail {
  email: string;
}

export interface ResendEmailResponse extends BaseResponse {
  data: string;
}

export interface VerifikasiPayload {
  token: string;
  userId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VerifikasiResponse extends ResendEmailResponse {}
