import { useMutation } from "@tanstack/react-query";
import { LupPassword, LupPasswordResponse, ResetPasswordPayload } from "./forgot-password.interface";

import { api } from "@/app/lib/axios";

export const useLupaPassword = () => {
  const mutation = useMutation({
    mutationFn: (payload: LupPassword): Promise<LupPasswordResponse> => {
      return api.post("auth/lupa-password", payload);
    },
    onSuccess: (res: LupPasswordResponse) => {
      alert(res.data.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.response.data.message);
    },
  });

  return mutation;
};


export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: (payload: ResetPasswordPayload): Promise<LupPasswordResponse> => {
      return api.post("auth/reset-password", payload);
    },
    onSuccess: (res: LupPasswordResponse) => {
      alert(res.data.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.response.data.message);
    },
  });

  return mutation;
};
