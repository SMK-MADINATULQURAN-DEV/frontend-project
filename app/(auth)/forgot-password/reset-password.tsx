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
  Container,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, RefreshCcw } from "lucide-react";
import { useState, useRef } from "react";

function ResetPasswordOTPPage({email}: {email: string   }) {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Logika untuk berpindah input secara otomatis
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Pindah ke kolom berikutnya jika terisi
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Logika untuk tombol backspace (hapus dan mundur)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
   
      
          <VStack gap={10} align="stretch" w="full">
            {/* Header */}
            <VStack gap={3} textAlign="center">
              <Center bg="blue.50" w="80px" h="80px" borderRadius="2xl" mb={2}>
                <ShieldCheck size={40} color="#2563eb" />
              </Center>
              <Heading size="3xl" color="blue.600" fontWeight="black">
                Verifikasi Kode
              </Heading>
              <Text color="blue.900" fontWeight="bold" fontSize="lg">
                Masukkan 6-digit kode keamanan
              </Text>
              <Text color="blue.400" fontWeight="medium">
                Kode telah dikirim ke email **na***@email.com**. Kode berlaku selama 5 menit.
              </Text>
            </VStack>

            {/* Input OTP 6-Digit */}
            <HStack justify="center" gap={3} w="full">
              {otp.map((data, index) => (
                <Input
                  key={index}
                 ref={(el) => {
    if (el) inputRefs.current[index] = el as HTMLInputElement;
  }}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  w={{ base: "45px", md: "60px" }}
                  h={{ base: "55px", md: "75px" }}
                  textAlign="center"
                  fontSize="2xl"
                  fontWeight="black"
                  color="blue.900"
                  bg="blue.50/30"
                  borderColor="blue.100"
                  borderRadius="xl"
                  _focus={{
                    bg: "white",
                    borderColor: "blue.500",
                    ring: "3px",
                    ringColor: "blue.50",
                  }}
                />
              ))}
            </HStack>

            {/* Tombol Aksi */}
            <VStack gap={6} w="full">
              <Button
                bg="blue.600"
                color="white"
                h="16"
                w="full"
                borderRadius="2xl"
                fontWeight="black"
                fontSize="lg"
                _hover={{
                  bg: "blue.700",
                  shadow: "2xl",
                  transform: "translateY(-2px)",
                }}
                gap={3}
                onClick={() => router.push("/login")}
              >
                Verifikasi Sekarang <ArrowRight size={24} />
              </Button>

              <HStack justify="center" gap={2}>
                <Text color="blue.900" fontWeight="medium" fontSize="sm">
                  Tidak menerima kode?
                </Text>
                <Button variant="ghost">
  <RefreshCcw size={14} style={{ marginRight: '8px' }} />
  Kirim Ulang
</Button>
              </HStack>
            </VStack>
          </VStack>
       
     
  );
}

export default dynamic(() => Promise.resolve(ResetPasswordOTPPage), { ssr: false });