import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ResendEmail,
  ResendEmailResponse,
  VerifikasiPayload,
} from "./interface";
import { api } from "../lib/axios";

export const useResendEmail = () => {
  const mutation = useMutation({
    mutationFn: (payload: ResendEmail): Promise<ResendEmailResponse> => {
      return api.post("auth/resend-email-verifikasi", payload);
    },

    onSuccess: (res: ResendEmailResponse) => {
      alert(res.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.response.data.message);
    },
  });

  return mutation;
};

export const useVerifikasiEmail = (token: string, userId: string) => {
  const { data, isFetching } = useQuery({
    queryFn: () => {
      const params: VerifikasiPayload = {
        token,
        userId,
      };
      return api.get("auth/cek-verifikasi-email", {
        params,
      });
    },
    queryKey: ["auth/cek-verifikasi-email"],
    enabled: !!token === true && !!userId === true,
  });

  return { data, isFetching };
};
