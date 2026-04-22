import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND, // URL Backend NestJS
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menyisipkan token di setiap request
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token"); // mengambil acces token di cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // menambahkan header
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Cek jika error 401 dan bukan sedang mencoba refresh token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Tandai agar tidak looping

//       try {
//         const refreshToken = Cookies.get("refresh_token");

//         // Ambil ID User (bisa disimpan di cookie atau decode dari token)
//         // Sesuai requirement controller Anda yang butuh header 'id'
//         const userId = Cookies.get("uuid");

//         // 1. Panggil API Refresh Token
//         const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/auth/refresh`,
//           {}, {
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//             id: userId, // Menyesuaikan req.headers.id di controller NestJS
//           }
//         });

//         // 2. Simpan token baru ke Cookie
//         Cookies.set("access_token", data.access_token);
//         Cookies.set("refresh_token", data.refresh_token);

//         // 3. Ulangi request yang tadi gagal dengan token baru
//         originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
//         return api(originalRequest);

//       } catch (refreshError) {
//         // Jika refresh token juga gagal/expired
//         console.log("Refresh token expired, silakan login kembali");

//         Cookies.remove("access_token");
//         Cookies.remove("refresh_token");
//         Cookies.remove("user_id");

//         Swal.fire({
//           title: "Sesi Berakhir",
//           text: "Silakan login kembali untuk melanjutkan",
//           icon: "warning",
//         });

//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    // jika request berhasil status 200 atau 201
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // jika ada error saat request seperti 401, 500, 400

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; /// tandai req agar tidak terjadi looping
      try {
        // ambil refresh token dari cookies
        const refreshToken = Cookies.get("refresh_token");
        const uuid = Cookies.get("uuid");

        // hit api refresh token

        const res = await axios.post(
          "http://localhost:8700/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              id: uuid,
            },
          },
        );

        // simpan token ke cookiet

        Cookies.set("access_token", res.data.access_token);
        Cookies.set("refresh_token", res.data.refresh_token);
        Cookies.set("uuid", res.data.user.uuid);

        // ulangi hit request yang gagal

        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Unauthorized, request gagal");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("uuid");

        Swal.fire({
          title: "UnAuthorized",
          text: "Waktu Habis",
          icon: "error",
        });
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export interface BaseResponse {
  message: string;
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems:number;
    totalPages: number;
  };
}