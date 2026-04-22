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
  IconButton,
  Field,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ArrowRight,
  RefreshCcw,
  Lock,
  EyeOff,
  Eye,
} from "lucide-react";
import { useState, useRef } from "react";
import { useResetPassword } from "./forgot-password.service";

function ResetPasswordOTPPage({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const mutation = useResetPassword();

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
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
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
          Kode telah dikirim ke email **na***@email.com**. Kode berlaku selama 5
          menit.
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

      <HStack>
        <Field.Root
          w="full"
          // invalid={
          //   !!formik.errors.password && formik.touched.password
          // }
        >
          {" "}
          {/* Tambahkan w="full" */}
          <Flex justify="space-between" align="center" mb={2} w="full">
            <Field.Label fontWeight="bold" color="blue.900" m={0}>
              Password Baru
            </Field.Label>
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </IconButton>
            </Box>
          </Box>
        </Field.Root>
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
          onClick={() => {
            mutation.mutate({
              email,
              otp: `${otp.join("")}`,
              password,
            }, 
          {
            onSuccess : () =>{
              router.push("/login")
            }
          });
          }}
        >
          Verifikasi Sekarang <ArrowRight size={24} />
        </Button>

        <HStack justify="center" gap={2}>
          <Text color="blue.900" fontWeight="medium" fontSize="sm">
            Tidak menerima kode?
          </Text>
          <Button variant="ghost">
            <RefreshCcw size={14} style={{ marginRight: "8px" }} />
            Kirim Ulang
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default dynamic(() => Promise.resolve(ResetPasswordOTPPage), {
  ssr: false,
});
