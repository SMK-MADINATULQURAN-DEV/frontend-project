export interface ErrorType {
  response?: {
    data?: {
      message: string;
    };
    status?: number;
  };
  message: string; // Error pesan bawaan dari Axios (e.g. "Network Error")
}