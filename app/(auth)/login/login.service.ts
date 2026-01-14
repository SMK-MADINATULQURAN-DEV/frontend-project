import { api } from "@/app/lib/axios";
import { LoginPayload, LoginResponse } from "./login.interface";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const login = (payload: LoginPayload): Promise<LoginResponse> => {
  return api.post("/auth/login", payload).then((n) => n.data);
};

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (res: LoginResponse) => {
      console.log("kalau sucess ngapain", res);
      Cookies.set("access_token", res.access_token);
      Cookies.set("refresh_token", res.refresh_token);

      Swal.fire({
        title: "Login Berhasil",
        text: res.message,
        icon: "success",
      });
      router.push("/");
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
     
      Swal.fire({
        title: "Login Gagal",
        text: error.response.data.message,
        icon: "error",
      });
      console.log("kalau error ngapain");
    },
  });

  return mutation;
};
