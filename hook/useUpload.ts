import { ErrorType } from "@/app/interface/error.interface";
import { api } from "@/app/lib/axios";
import { useState } from "react";


interface FileUploadResponse {
  message: string;
  file_url: string;
  file_name: string;
  file_size: string;
}

export const uploadFile = async (file: File): Promise<FileUploadResponse> => {
  // 1. Gunakan FormData untuk mengirim file
  const formData = new FormData();
  formData.append("file", file); // "file" adalah key yang biasanya diharapkan backend

  // 2. Kirim formData sebagai body request
  const response = await api.post<FileUploadResponse>("/upload/file", formData, {
    headers: {
        'Content-Type': 'multipart/form-data'

      // Axios akan otomatis mengatur Boundary jika kita mengirim FormData,
      // jadi sebenarnya kita tidak perlu menulis 'Content-Type': 'multipart/form-data' secara manual.
    },
  });

  return response.data;
};

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const response = await uploadFile(file);
      return response.file_url;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;
      const msg = error?.response?.data?.message || "Gagal mengunggah file";
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, error };
};
