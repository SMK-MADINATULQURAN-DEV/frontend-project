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
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";
import ResetPassword from "./reset-password";
import { useLupaPassword, useResetPassword } from "./forgot-password.service";

function ForgotPasswordPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const [email, setEmail] = useState<string>("");
  const mutation = useLupaPassword();


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
        >
          {!isSubmitted ? (
            <VStack gap={10} align="stretch" w="full">
              {/* Header */}
              <VStack gap={3} textAlign="center">
                <Box bg="blue.50" p={4} borderRadius="2xl" mb={2}>
                  <ShieldCheck size={40} color="#2563eb" />
                </Box>
                <Heading size="3xl" color="blue.600" fontWeight="black">
                  Lupa Kata Sandi?
                </Heading>
                <Text color="blue.900" fontWeight="bold" fontSize="lg">
                  Jangan khawatir, kami akan membantu.
                </Text>
                <Text color="blue.400" fontWeight="medium">
                  Masukkan email yang terdaftar untuk menerima instruksi
                  pemulihan akun.
                </Text>
              </VStack>

              {/* Form Area */}
              <VStack gap={6} align="stretch" w="full">
                <Field.Root w="full">
                  <Field.Label fontWeight="bold" color="blue.900" mb={2}>
                    Alamat Email
                  </Field.Label>
                  <Box position="relative" w="full">
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
                      w="full"
                      type="email"
                        color={"black"}
                      placeholder="nama@email.com"
                      h="16"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      pl={14}
                      bg="blue.50/30"
                      borderRadius="2xl"
                      borderColor="blue.100"
                      fontSize="md"
                      _focus={{
                        bg: "white",
                        borderColor: "blue.500",
                        ring: "3px",
                        ringColor: "blue.50",
                      }}
                    />
                  </Box>
                </Field.Root>

                <Button
                  bg="blue.600"
                  color="white"
                  h="16"
                  w="full"
                  borderRadius="2xl"
                  fontWeight="black"
                  fontSize="lg"
                  mt={4}
                  loading={mutation.isPending}
                  onClick={() => {
                    mutation.mutate({ email: email }, {
                      onSuccess : () => {
                        setIsSubmitted(true)
                      }
                    });
                  }}
                  _hover={{
                    bg: "blue.700",
                    shadow: "2xl",
                    transform: "translateY(-2px)",
                  }}
                  gap={3}
                >
                  Kirim Instruksi <ArrowRight size={24} />
                </Button>
              </VStack>

              {/* Back to Login */}
              <HStack justify="center" pt={4}>
                <Button
                  variant="ghost"
                  color="blue.600"
                  fontWeight="bold"
                  gap={2}
                  onClick={() => router.push("/login")}
                >
                  <ArrowLeft size={18} /> Kembali ke Login
                </Button>
              </HStack>
            </VStack>
          ) : (
            /* --- TAMPILAN SETELAH KIRIM (UX SUCCESS) --- */
            <ResetPassword email={email} />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(ForgotPasswordPage), {
  ssr: false,
});
