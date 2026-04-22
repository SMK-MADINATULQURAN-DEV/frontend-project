/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  Container,
  Center,
  Circle,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MailOpen, RefreshCcw, LogOut, ExternalLink } from "lucide-react";
import Cookies from "js-cookie";
import { useProfile } from "../(main)/profile/profile.service";
import { useResendEmail, useVerifikasiEmail } from "./service";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function EmailVerificationPage() {
  const router = useRouter();
  const { data } = useProfile();
  const mutation = useResendEmail();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");  // untuk mendpatkan id dari url
  const token = searchParams.get("token");  // untik mendapaktan token dari url
  
  const {data:dataEmail, isFetching} = useVerifikasiEmail(token as string, userId as string)

  useEffect(()=> {

    if(dataEmail?.data?.message){
      router.push("/")  // jika berhasil redirect ke beranda
    }

  },[dataEmail])

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/login");
  };

  const handleResendEmail = () => {
    mutation.mutate({ email: data?.data?.email as string });
  };

  if(isFetching){
    return (<div>sedang verifikasi email</div>)
  }

  return (
    <Box
      minH="100vh"
      bg="#F1F5F9"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container width="600px" py={10} px={{ base: 4, md: 0 }}>
        <Box
          bg="white"
          p={{ base: 8, md: 16 }}
          borderRadius="3xl"
          shadow="2xl"
          borderWidth="1px"
          borderColor="gray.100"
          w="full"
          textAlign="center"
        >
          <VStack gap={8} align="stretch" w="full">
            {/* Header dengan Animasi Visual */}
            <VStack gap={4}>
              <Center position="relative">
                <Circle size="100px" bg="blue.50" />
                <Box position="absolute">
                  <MailOpen size={48} color="#2563eb" />
                </Box>
              </Center>
              <VStack gap={1}>
                <Heading size="3xl" color="blue.600" fontWeight="black">
                  Verifikasi Email
                </Heading>
                <Text color="blue.900" fontWeight="bold" fontSize="lg">
                  Satu langkah lagi!
                </Text>
              </VStack>
            </VStack>

            {/* Content Body */}
            <VStack
              gap={6}
              bg="blue.50/50"
              p={6}
              borderRadius="2xl"
              border="1px dashed"
              borderColor="blue.200"
            >
              <Text color="blue.800" fontWeight="medium" lineHeight="relaxed">
                Kami telah mengirimkan email verifikasi ke: <br />
                <Text
                  as="span"
                  fontWeight="black"
                  color="blue.900"
                  fontSize="md"
                >
                  {data && data?.data?.email}
                </Text>
              </Text>
              <Text fontSize="sm" color="blue.600" fontWeight="medium">
                Silakan klik tautan di dalam email tersebut untuk mengaktifkan
                akun Anda dan mengakses Beranda Lentera.
              </Text>
            </VStack>

            {/* Action Buttons */}
            <VStack gap={4} w="full">
              <Button
                bg="blue.600"
                color="white"
                h="16"
                w="full"
                borderRadius="2xl"
                fontWeight="black"
                fontSize="lg"
                _hover={{ bg: "blue.700", shadow: "xl" }}
                onClick={() => window.open("https://gmail.com", "_blank")}
              >
                <HStack gap={3}>
                  <ExternalLink size={20} />
                  <Text>Buka Email Saya</Text>
                </HStack>
              </Button>

              <Button
                variant="ghost"
                color="blue.600"
                fontWeight="black"
                loading={mutation.isPending}
                onClick={handleResendEmail}
              >
                <HStack gap={2}>
                  <RefreshCcw size={18} />
                  <Text>Kirim Ulang Email Verifikasi</Text>
                </HStack>
              </Button>
            </VStack>

            {/* Footer / Logout */}
            <Box pt={4} borderTop="1px solid" borderColor="gray.100">
              <Button
                variant="plain"
                color="red.500"
                fontWeight="bold"
                fontSize="sm"
                onClick={handleLogout}
              >
                <HStack gap={2}>
                  <LogOut size={16} />
                  <Text>Gunakan akun lain / Keluar</Text>
                </HStack>
              </Button>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(EmailVerificationPage), {
  ssr: false,
});
