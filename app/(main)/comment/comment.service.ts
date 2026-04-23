import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";
import Swal from "sweetalert2";
import { CommentPayload, PostCommentResponse } from "./comment.interface";

const createComment= async (payload: CommentPayload): Promise<PostCommentResponse> => {
  return api.post("/comment", payload).then((res) => res.data);
};


// 2. Custom Hook Mutation
export const useCreateCommnt = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CommentPayload) => createComment(payload),
    onSuccess: () => {
      // Invalidate cache agar list postingan di timeline langsung terbaru
      // Pastikan queryKey ini sama dengan yang digunakan di hook getPosts
      queryClient.invalidateQueries({ queryKey: ["/posts/randoms"] });
      queryClient.invalidateQueries({ queryKey: ["/posts/my-posts"] });

      Swal.fire({
        title: "Berhasil",
        text: "Komentar Berhasil ditambahkan",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      Swal.fire({
        title: "Gagal Membuat Komentar",
        text: error.response?.data?.message || "Terjadi kesalahan pada server",
        icon: "error",
      });
    },
  });

  return mutation;
}


