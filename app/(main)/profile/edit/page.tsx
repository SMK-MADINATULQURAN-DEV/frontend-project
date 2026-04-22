"use client";
import dynamic from "next/dynamic";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  Textarea,
  Button,
  Flex,
  Circle,
  useDisclosure,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Camera, ArrowLeft, Lock, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangePassword } from "./changePassword";
import { useProfile, useUpdateProfile } from "../profile.service";
import { useFormik, FormikProvider, Form } from "formik"; // Tambahkan Form di sini
import * as Yup from "yup";
import { useUpload } from "@/hook/useUpload";
import { useRef } from "react";
import { ProfileEditPayload } from "../profile.interface";
import L from "leaflet";
import LocationSearch from "@/components/LocationInput";

// Validasi Skema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  username: Yup.string()
    .min(3, "Minimal 3 karakter")
    .required("Username wajib diisi"),
  bio: Yup.string().max(250, "Bio maksimal 250 karakter"),
  location: Yup.string().nullable(),
});

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function EditProfilePage() {
  const router = useRouter();
  const passwordChange = useDisclosure();
  const { data: profileData, isLoading } = useProfile();
  const { upload: uploadAvatar, isUploading: loadingAvatar } = useUpload();
  const { upload: uploadSampul, isUploading: loadingSampul } = useUpload();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const sampulInputRef = useRef<HTMLInputElement>(null);
  const mutation = useUpdateProfile();

  const formik = useFormik({
    initialValues: {
      id: profileData?.data?.id as string,
      name: profileData?.data?.name || "",
      username: profileData?.data?.username || "",
      bio: profileData?.data?.bio || "",
      location: profileData?.data?.location || "",
      avatar: profileData?.data?.avatar || "",
      sampul: profileData?.data?.sampul || "",
    },
    enableReinitialize: true,
    validationSchema: ProfileSchema,
    onSubmit: async (values: ProfileEditPayload) => {
      // Formik secara otomatis menjalankan e.preventDefault() di sini
      mutation.mutate(values);
    },
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "avatar" | "sampul",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url =
        field === "avatar"
          ? await uploadAvatar(file)
          : await uploadSampul(file);
      formik.setFieldValue(field, url);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) return <Text p={10}>Memuat data profil...</Text>;

  return (
    <FormikProvider value={formik}>
      {/* Menggunakan Form dari Formik agar handle submit otomatis prevent default */}
      <Form style={{ width: "100%" }}>
        <VStack flex={1} gap={6} align="stretch">
          <input
            type="file"
            hidden
            ref={avatarInputRef}
            accept="image/*"
            onChange={(e) => handleFileChange(e, "avatar")}
          />
          <input
            type="file"
            hidden
            ref={sampulInputRef}
            accept="image/*"
            onChange={(e) => handleFileChange(e, "sampul")}
          />
          <ChangePassword
            isOpen={passwordChange.open}
            onClose={passwordChange.onClose}
          />

          <LocationSearch formik={formik} />

          {/* Header Navigasi */}
          <HStack justify="space-between" mb={2}>
            <HStack gap={4}>
              <IconButton
                variant="ghost"
                onClick={() => router.back()}
                color="blue.900"
              >
                <ArrowLeft size={24} />
              </IconButton>
              <Heading size="md" color="blue.900">
                Edit Profil
              </Heading>
            </HStack>
            <Button
              type="submit"
              colorPalette="blue"
              size="sm"
              borderRadius="full"
              px={6}
              loading={mutation.isPending}
            >
              <HStack gap={2}>
                {mutation.isPending ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <Save size={16} /> Simpan Perubahan
                  </>
                )}
              </HStack>
            </Button>
          </HStack>

          <Box
            bg="white"
            borderRadius="2xl"
            shadow="sm"
            border="1px solid"
            borderColor="blue.50"
            overflow="hidden"
          >
            {/* Foto Sampul */}
            {/* Foto Sampul */}
            <Box
              h="180px"
              bg="blue.500"
              position="relative"
              onClick={() => sampulInputRef.current?.click()}
              cursor="pointer"
              overflow="hidden" // Memastikan gambar tidak keluar batas
            >
              {formik.values.sampul && (
                <Image
                  src={formik.values.sampul}
                  alt="Sampul"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              )}

              {/* Overlay Kamera - Diposisikan mutlak mengisi seluruh parent */}
              <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                bg="blackAlpha.400"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: "blackAlpha.600" }}
                transition="0.3s"
              >
                <VStack gap={1} color="white">
                  {loadingSampul ? (
                    <Spinner size="md" />
                  ) : (
                    <>
                      <Camera size={28} />
                      <Text fontSize="xs" fontWeight="bold">
                        Ubah Foto Sampul
                      </Text>
                    </>
                  )}
                </VStack>
              </Box>
            </Box>

            <Box px={8} pb={8}>
              {/* Avatar Area */}
              <Flex justify="start" mt="-60px" mb={8}>
                <Box position="relative">
                  <Circle
                    size="120px"
                    bg="blue.100"
                    border="6px solid white"
                    overflow="hidden"
                    shadow="lg"
                  >
                    <Image
                      src={formik.values.avatar || "/default-avatar.png"}
                      alt="Avatar"
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Circle>
                  <Circle
                    position="absolute"
                    bottom="5px"
                    right="5px"
                    size="35px"
                    bg="blue.600"
                    color="white"
                    border="3px solid white"
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      avatarInputRef.current?.click();
                    }}
                  >
                    {loadingAvatar ? (
                      <Spinner size="xs" />
                    ) : (
                      <Camera size={16} />
                    )}
                  </Circle>
                </Box>
              </Flex>

              <VStack gap={6} align="stretch">
                <HStack gap={6} align="start">
                  <VStack align="start" flex={1} gap={1}>
                    <Text fontWeight="bold" color="blue.900" fontSize="sm">
                      Nama Lengkap
                    </Text>
                    <Input
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      size="lg"
                      color={"black"}
                      bg="blue.50/30"
                      borderColor="blue.100"
                    />
                    {formik.errors.name && formik.touched.name && (
                      <Text color="red.500" fontSize="xs">
                        {formik.errors.name}
                      </Text>
                    )}
                  </VStack>

                  <VStack align="start" flex={1} gap={1}>
                    <Text fontWeight="bold" color="blue.900" fontSize="sm">
                      Username
                    </Text>
                    <Input
                      disabled
                       color={"black"}
                      name="username"
                      value={formik.values.username}
                      size="lg"
                      bg="blue.50/10"
                      borderColor="blue.100"
                    />
                  </VStack>
                </HStack>

                <VStack align="start" gap={1}>
                  <Text fontWeight="bold" color="blue.900" fontSize="sm">
                    Bio
                  </Text>
                  <Textarea
                    name="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    size="lg"
                    bg="blue.50/30"
                    color={"black"}
                    borderColor="blue.100"
                    minH="120px"
                  />
                </VStack>

                <VStack align="start" gap={1}>
                  
                  <LocationSearch formik={formik} />
                 
                </VStack>
              </VStack>
            </Box>
          </Box>

          {/* Keamanan */}
          <Box
            bg="white"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="red.100"
          >
            <Heading
              size="xs"
              color="red.600"
              mb={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Lock size={16} /> Privasi & Keamanan
            </Heading>
            <HStack justify="space-between">
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" color="blue.900" fontSize="sm">
                  Ubah Kata Sandi
                </Text>
                <Text fontSize="xs" color="blue.400" fontWeight="bold">
                  Amankan akun Anda dengan sandi yang kuat
                </Text>
              </VStack>
              <Button
                type="button"
                size="sm"
                colorPalette="red"
                onClick={passwordChange.onOpen}
              >
                Ubah Sandi
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Form>
    </FormikProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconButton = ({ children, ...props }: any) => (
  <Button p={2} minW="auto" {...props}>
    {children}
  </Button>
);

export default dynamic(() => Promise.resolve(EditProfilePage), {
  ssr: false,
});
