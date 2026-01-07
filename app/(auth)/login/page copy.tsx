"use client";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../lib/axios";
import Swal from "sweetalert2";
import dynamic from 'next/dynamic';
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  Field,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const { data } = await api.post("/auth/login", values);
      return data;
    },
    onSuccess: (data) => {
      // 1. Simpan Access Token ke Cookies (Berlaku 1 hari untuk simulasi)
      Cookies.set("access_token", data.access_token, { expires: 1 });
      
      // 2. Tampilkan Toast Sukses
      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang kembali, ${data.user.username}`,
        timer: 2000,
        showConfirmButton: false,
      });

      // 3. Arahkan ke Dashboard/Home
      router.push("/dashboard");
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Email atau password salah",
      });
    },
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Format email tidak valid").required("Wajib diisi"),
      password: Yup.string().required("Wajib diisi"),
    }),
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
   
      <Container maxW="lg" py={20} px={{ base: 4, md: 0 }}>
        <Box 
          bg="white" 
          p={{ base: 8, md: 12 }} 
          borderRadius="3xl" 
          shadow="xl" 
          borderWidth="1px" 
          borderColor="gray.100"
        >
          <VStack gap={10} align="stretch">
            <VStack gap={2} textAlign="center">
              <Heading size="4xl" color="blue.600" fontWeight="black" letterSpacing="tighter">
                Lentera
              </Heading>
              <Text color="gray.500" fontWeight="medium">
                Masuk untuk melihat apa yang baru.
              </Text>
            </VStack>

            <form onSubmit={formik.handleSubmit}>
              <VStack gap={6}>
                {/* Field Email */}
                <Field.Root invalid={!!formik.errors.email && formik.touched.email}>
                  <Field.Label fontWeight="bold" color="gray.700">Email</Field.Label>
                  <Input 
                    name="email"
                    type="email"
                    placeholder="nama@email.com" 
                    size="lg"
                    bg="gray.50"
                    _focus={{ bg: "white", borderColor: "blue.500" }}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && (
                    <Text color="red.500" fontSize="xs" mt={1}>{formik.errors.email}</Text>
                  )}
                </Field.Root>

                {/* Field Password */}
                <Field.Root invalid={!!formik.errors.password && formik.touched.password}>
                  <Field.Label fontWeight="bold" color="gray.700">Password</Field.Label>
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    size="lg"
                    bg="gray.50"
                    _focus={{ bg: "white", borderColor: "blue.500" }}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password && (
                    <Text color="red.500" fontSize="xs" mt={1}>{formik.errors.password}</Text>
                  )}
                </Field.Root>

                <Button
                  loading={mutation.isPending}
                  bg="blue.600"
                  color="white"
                  _hover={{ bg: "blue.700" }}
                  size="lg"
                  width="full"
                  type="submit"
                  fontWeight="bold"
                  h="14"
                  borderRadius="2xl"
                >
                  Masuk
                </Button>
              </VStack>
            </form>

            <Text textAlign="center" fontSize="sm" color="gray.600">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => router.push("register")}
                style={{ color: "#2563eb", fontWeight: "bold" }}
              >
                Daftar sekarang
              </button>
            </Text>
          </VStack>
        </Box>
      </Container>
   
  );
}

export default dynamic(() => Promise.resolve(LoginPage), {
  ssr: false,
});