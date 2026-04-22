"use client";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Textarea,
  Flex,
  Portal,
  IconButton,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { Image as ImageIcon, Trash2, X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import { useUpload } from "@/hook/useUpload"; // Sesuaikan path hook Anda
import { useCreatePost } from "./post/post.service";

export function CreatePostModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, isUploading } = useUpload();
  const mutation = useCreatePost()

  const formik = useFormik({
    initialValues: {
      content: "",
      medias: [] as { url: string; type: "image" | "video" }[],
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Konten tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      // Di sini panggil hook create post Anda nantinya
      console.log("Payload siap kirim ke Backend:", values);

      mutation.mutate(values, {
      onSuccess: () => {
        onClose(); // Tutup modal hanya jika berhasil
        formik.resetForm();
      }
    });
    },
  });

  // Fungsi untuk menangani pemilihan file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1. Upload file ke Cloudinary/Server via Hook
      const url = await upload(file);

      // 2. Simpan URL hasil upload ke state Formik
      const newMedia = {
        url: url,
        type: file.type.startsWith("video") ? "video" : ("image" as const),
      };

      formik.setFieldValue("medias", [...formik.values.medias, newMedia]);

      // Reset input file agar bisa pilih file yang sama lagi jika perlu
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Gagal upload:", err);
    }
  };

  const removeMedia = (index: number) => {
    const updated = formik.values.medias.filter((_, i) => i !== index);
    formik.setFieldValue("medias", updated);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        inset={0}
        bg="blackAlpha.600"
        zIndex={2000}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onClose}
      >
        <Box
          bg="white"
          w="full"
          maxW="lg"
          borderRadius="2xl"
          shadow="2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Flex
            justify="space-between"
            align="center"
            p={4}
            borderBottom="1px solid"
            borderColor="blue.50"
          >
            <IconButton variant="ghost" onClick={onClose} color="blue.900">
              <X size={20} />
            </IconButton>
            <Text fontWeight="black" color="blue.900">
              Buat Postingan Baru
            </Text>
            <Box w="40px" />
          </Flex>

          <VStack p={5} align="stretch" gap={4}>
            <Textarea
              name="content"
              color={"black"}
              value={formik.values.content}
              onChange={formik.handleChange}
              placeholder="Apa yang Anda pikirkan?"
              size="lg"
              minH="120px"
              fontSize="xl"
              resize="none"
              autoFocus
            />

            {/* Hidden Input File */}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
            />

            {/* Preview Media */}
            {formik.values.medias.length > 0 && (
              <HStack overflowX="auto" py={2} gap={3}>
                {formik.values.medias.map((media, index) => (
                  <Box
                    key={index}
                    position="relative"
                    minW="100px"
                    h="100px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      as="img"
                      src={media.url}
                      w="full"
                      h="full"
                      objectFit="cover"
                      alt="image.jpg"
                    />
                    <IconButton
                      aria-label="Remove"
                      size="xs"
                      colorPalette="red" // Di v3 'colorScheme' berubah menjadi 'colorPalette'
                      position="absolute"
                      zIndex={1}
                      top={1}
                      right={1}
                      onClick={() => removeMedia(index)}
                    >
                      <Trash2 size={12} />{" "}
                      {/* Ikon diletakkan di sini sebagai children */}
                    </IconButton>
                  </Box>
                ))}
              </HStack>
            )}

            {/* Tombol Trigger Upload */}
            <Box
              border="2px dashed"
              borderColor="blue.100"
              borderRadius="xl"
              p={6}
              textAlign="center"
              cursor={isUploading ? "not-allowed" : "pointer"}
              _hover={!isUploading ? { bg: "blue.50" } : {}}
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              <VStack gap={1}>
                {isUploading ? (
                  <Spinner color="blue.500" />
                ) : (
                  <ImageIcon size={24} color="#2563eb" />
                )}
                <Text fontSize="xs" color="blue.800" fontWeight="bold">
                  {isUploading ? "Sedang Mengunggah..." : "Tambah Foto/Video"}
                </Text>
              </VStack>
            </Box>
          </VStack>

          <Flex p={4} borderTop="1px solid" borderColor="blue.50" justify="end">
            <Button
              bg="blue.600"
              color="white"
              px={8}
              borderRadius="full"
              fontWeight="bold"
              loading={mutation.isPending}
              onClick={() => formik.handleSubmit()}
              disabled={!formik.values.content || isUploading || mutation.isPending}
            >
              Kirim Postingan
            </Button>
          </Flex>
        </Box>
      </Box>
    </Portal>
  );
}
