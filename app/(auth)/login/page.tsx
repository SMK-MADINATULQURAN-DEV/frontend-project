"use client";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Heading,
  Field,
  Container,
  Separator,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Chrome, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik, FormikProvider } from "formik";
import { LoginPayload } from "./login.interface";
import { useLogin } from "./login.service";

function LoginPage() {
  const router = useRouter();
  const mutation = useLogin()
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL_GOOGLE!,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options).toString();
    window.location.assign(`${rootUrl}?${qs}`);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Format wajib email @").required("Wajib diisi"),
      password: Yup.string().required("Wajib diisi"),
    }),
    onSubmit: (values: LoginPayload) => {

      // panggil mutation ketuka submit berhasil

      mutation.mutate(values)
      console.log("submit", values);
    },
    enableReinitialize: true,
  });

  {
    console.log("validasi form", formik.errors);
  }
  {
    console.log("isi form", formik.values);
  }

  return (
    <Box
      minH="100vh"
      bg="#F1F5F9"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >

      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', margin: '20px 0' }}>
     

    </div>
      {/* Menggunakan maxW="600px" agar sama lebarnya dengan Register */}
      <Container width="600px" py={10} px={{ base: 4, md: 0 }}>
        <Box
          bg="white"
          p={{ base: 8, md: 16 }}
          borderRadius="3xl"
          shadow="2xl"
          borderWidth="1px"
          borderColor="gray.100"
          w="full"
        >
          <VStack gap={10} align="stretch" w="full">
            {/* Header */}
            <VStack gap={3} textAlign="center">
              <Heading
                size="5xl"
                color="blue.600"
                fontWeight="black"
                letterSpacing="tighter"
              >
                Lentera
              </Heading>
              <Text color="blue.900" fontWeight="bold" fontSize="xl">
                Selamat Datang Kembali!
              </Text>
              <Text color="blue.400" fontWeight="medium">
                Masuk untuk terus berbagi inspirasi.
              </Text>
            </VStack>

            <VStack gap={8} align="stretch" w="full">
              {/* Tombol Google */}
              <Button
                variant="outline"
                size="lg"
                h="16"
                w="full" // Pastikan tombol Google melebar penuh
                borderRadius="2xl"
                onClick={handleGoogleLogin}
                borderColor="gray.200"
                bg="white"
                _hover={{ bg: "gray.50", borderColor: "blue.200" }}
              >
                <HStack gap={4}>
                  <Chrome size={24} color="#4285F4" strokeWidth={2.5} />
                  <Text color="gray.700" fontWeight="bold" fontSize="md">
                    Masuk dengan Google
                  </Text>
                </HStack>
              </Button>

              <HStack w="full" gap={6}>
                <Separator flex={1} />
                <Text fontSize="xs" fontWeight="black" color="gray.300">
                  ATAU EMAIL
                </Text>
                <Separator flex={1} />
              </HStack>

              {/* Form Area */}
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <VStack gap={6} align="stretch" w="full">
                    {/* Email Field */}
                    <Field.Root
                      w="full"
                      invalid={!!formik.errors.email && formik.touched.email}
                    >
                      {" "}
                      {/* Tambahkan w="full" */}
                      <Field.Label fontWeight="bold" color="blue.900" mb={2}>
                        Email
                      </Field.Label>
                      <Box position="relative" w="full">
                        {" "}
                        {/* Tambahkan w="full" */}
                        <Flex
                          position="absolute"
                          left={5}
                          top="50%"
                          transform="translateY(-50%)"
                          zIndex={10}
                          color="blue.500"
                        >
                          <Mail size={22} />
                        </Flex>
                        <Input
                          w="full" // Tambahkan w="full"
                          name="email"
                          size="lg"
                          value={formik.values.email}
                          onChange={(e) => {
                            formik.setFieldValue("email", e.target.value);
                          }}
                          placeholder="nama@email.com"
                          h="16"
                          pl={14}
                          bg="blue.50/30"
                          color={"black"}
                          borderRadius="2xl"
                          fontSize="md"
                          _focus={{
                            bg: "white",
                            borderColor: "blue.500",
                            ring: "3px",
                            ringColor: "blue.50",
                          }}
                        />
                      </Box>
                      {formik.errors.email && (
                        <Text color={"red.500"} fontSize={"xs"}>
                          {formik.errors.email}
                        </Text>
                      )}
                    </Field.Root>

                    {/* Password Field */}
                    <Field.Root
                      w="full"
                      invalid={
                        !!formik.errors.password && formik.touched.password
                      }
                    >
                      {" "}
                      {/* Tambahkan w="full" */}
                      <Flex
                        justify="space-between"
                        align="center"
                        mb={2}
                        w="full"
                      >
                        <Field.Label fontWeight="bold" color="blue.900" m={0}>
                          Password
                        </Field.Label>
                        <Button
                          variant="plain"
                          size="sm"
                          color="blue.600"
                          fontWeight="black"
                          p={0}
                          h="auto"
                          onClick={() => router.push("/forgot-password")}
                          _hover={{ textDecoration: "underline" }}
                        >
                          Lupa Password?
                        </Button>
                      </Flex>
                      <Box position="relative" w="full">
                        {" "}
                        {/* Tambahkan w="full" */}
                        <Flex
                          position="absolute"
                          left={5}
                          top="50%"
                          transform="translateY(-50%)"
                          zIndex={10}
                          color="blue.500"
                        >
                          <Lock size={22} />
                        </Flex>
                        <Input
                          w="full" // Tambahkan w="full"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          h="16"
                          pl={14}
                          pr={14}
                          color={"black"}
                          value={formik.values.password}
                          onChange={(e) => {
                            formik.setFieldValue("password", e.target.value);
                          }}
                          bg="blue.50/30"
                          borderRadius="2xl"
                          fontSize="md"
                          _focus={{
                            bg: "white",
                            borderColor: "blue.500",
                            ring: "3px",
                            ringColor: "blue.50",
                          }}
                        />
                        {/* Tombol Show/Hide Password */}
                        <Box
                          position="absolute"
                          right={4}
                          top="50%"
                          transform="translateY(-50%)"
                          zIndex={10}
                        >
                          <IconButton
                            variant="ghost"
                            color="blue.400"
                            _hover={{ color: "blue.600", bg: "transparent" }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={22} />
                            ) : (
                              <Eye size={22} />
                            )}
                          </IconButton>
                        </Box>
                      </Box>
                      {formik.errors.password && (
                        <Text color={"red.500"} fontSize={"xs"}>
                          {formik.errors.password}
                        </Text>
                      )}
                    </Field.Root>

                    <Button
                      bg="blue.600"
                      color="white"
                      type="submit"
                      h="16"
                      w="full" // Tambahkan w="full"
                      borderRadius="2xl"
                      fontWeight="black"
                      fontSize="lg"
                      loading={mutation.isPending}
                      mt={4}
                      _hover={{
                        bg: "blue.700",
                        shadow: "2xl",
                        transform: "translateY(-2px)",
                      }}
                      gap={3}
                    >
                      Masuk Sekarang <ArrowRight size={24} />
                    </Button>
                  </VStack>
                </form>
              </FormikProvider>
            </VStack>

            <Box textAlign="center">
              <Text fontSize="md" color="blue.900" fontWeight="bold">
                Belum punya akun?{" "}
                <Text
                  as="span"
                  color="blue.600"
                  cursor="pointer"
                  fontWeight="black"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => router.push("/register")}
                >
                  Daftar Gratis
                </Text>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false });
