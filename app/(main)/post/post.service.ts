import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";
import Swal from "sweetalert2";
import { MyPostResponse, PostPayload, PostResponse } from "./post.interface";
import { useState } from "react";

// 1. Fungsi API Service
const createPost = async (payload: PostPayload): Promise<PostResponse> => {
  return api.post("/posts", payload).then((res) => res.data);
};

// 2. Custom Hook Mutation
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: PostPayload) => createPost(payload),
    onSuccess: () => {
      // Invalidate cache agar list postingan di timeline langsung terbaru
      // Pastikan queryKey ini sama dengan yang digunakan di hook getPosts
      queryClient.invalidateQueries({ queryKey: ["/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/posts/my-posts"] });

      Swal.fire({
        title: "Berhasil",
        text: "Postingan Anda telah diterbitkan",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      Swal.fire({
        title: "Gagal Membuat Postingan",
        text: error.response?.data?.message || "Terjadi kesalahan pada server",
        icon: "error",
      });
    },
  });

  return mutation;
};


const getMyPosts = async (
  params : {
    page : number
    limit :number
  },
): Promise<MyPostResponse> => {

  console.log("params", params)
  
  return api.get("/posts/my-posts", {params}).then((n) => n.data);
};



export const useGetMyPost = () => {

  const [query, setQuery] = useState({
    page :1,
    limit : 10
  })
  const { data, isFetching, isLoading } = useQuery({
    queryFn: () => getMyPosts(query),
    queryKey: ["/posts/my-posts"],
    staleTime: 1000 * 60 * 60,
  });

  return { data, isFetching, isLoading, query, setQuery };
}; 



//

const getMyFeed = async (
  params : {
    page : number
    limit :number
  },
): Promise<MyPostResponse> => {

  console.log("params", params)
  
  return api.get("/posts/random", {params}).then((n) => n.data);
};



export const useGetMyFeed = () => {

  const [query, setQuery] = useState({
    page :1,
    limit : 10
  })
  const { data, isFetching, isLoading } = useQuery({
    queryFn: () => getMyFeed(query),
    queryKey: ["/posts/randoms"],
    staleTime: 1000 * 60 * 60,
  });

  return { data, isFetching, isLoading, query, setQuery };
};


