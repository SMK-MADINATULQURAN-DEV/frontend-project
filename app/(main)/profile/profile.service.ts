import { api } from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChangePasswodPayload,
  ProfileEditPayload,
  ProfileResponse,
} from "./profile.interface";
import Swal from "sweetalert2";
import { useState } from "react";

const getProfile = async (): Promise<ProfileResponse> => {
  return api.get("/auth/profile").then((n) => n.data);
};

export const useProfile = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryFn: () => getProfile(),
    queryKey: ["/auth/profile"],
    staleTime: 1000 * 60 * 60,
  });

  return { data, isFetching, isLoading };
};

// 1. Ubah GET menjadi PATCH atau POST sesuai Controller NestJS Anda
const updateProfile = async (
  payload: ProfileEditPayload,
): Promise<ProfileResponse> => {
  // Gunakan .patch jika di NestJS menggunakan @Patch
  return api.put("/profile/update", payload).then((n) => n.data);
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ProfileEditPayload) => updateProfile(payload),
    onSuccess: () => {
      // 2. Invalidate cache agar data profil di UI langsung terupdate
      queryClient.invalidateQueries({ queryKey: ["/auth/profile"] });

      Swal.fire({
        title: "Berhasil",
        text: "Profil Anda telah diperbarui",
        icon: "success",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      Swal.fire({
        title: "Gagal Memperbarui",
        text: error.response?.data?.message || "Terjadi kesalahan pada server",
        icon: "error",
      });
    },
  });

  return mutation;
};

const changePassword = async (
  payload: ChangePasswodPayload,
): Promise<ProfileResponse> => {
  // Gunakan .patch jika di NestJS menggunakan @Patch
  return api.put("/profile/change-password", payload).then((n) => n.data);
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ChangePasswodPayload) => changePassword(payload),
    onSuccess: () => {
      // 2. Invalidate cache agar data profil di UI langsung terupdate
      queryClient.invalidateQueries({ queryKey: ["/auth/profile"] });

      Swal.fire({
        title: "Berhasil",
        text: "Password telah diperbarui",
        icon: "success",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      Swal.fire({
        title: "Gagal Memperbarui",
        text: error.response?.data?.message || "Terjadi kesalahan pada server",
        icon: "error",
      });
    },
  });

  return mutation;
};


