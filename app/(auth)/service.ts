import { register } from "module";
import { api } from "../lib/axios";
import {
  RegisterPayload,
  RegisterResponse,
} from "./interface/register.interface";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const authService = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    return api.post("/auth/register", payload);
  },
};

export const useRegister = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (values: RegisterPayload): Promise<RegisterResponse> => {
      const { data } = await api.post("/auth/register", values);
      return data;
    },
    onSuccess: (data) => {
      // 1. Simpan Access Token ke Cookies (Berlaku 1 hari untuk simulasi)

      // 2. Tampilkan Toast Sukses
      Swal.fire({
        icon: "success",
        title: "Register Berhasil!",
        text: `Selamat datang kembali, ${data.data.username}`,
        timer: 2000,
        showConfirmButton: false,
      });

      // 3. Arahkan ke Dashboard/Home
      router.push("/");
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Email atau password salah",
      });
    },
  });
};
