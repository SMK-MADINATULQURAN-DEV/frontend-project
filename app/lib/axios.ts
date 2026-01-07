import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // URL Backend NestJS
});

// Interceptor untuk menyisipkan token di setiap request
// api.interceptors.request.use((config) => {
//   const token = Cookies.get('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });