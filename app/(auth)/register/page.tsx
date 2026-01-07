"use client";
import dynamic from 'next/dynamic';
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
import { Mail, Lock, User, AtSign, ArrowRight, Chrome, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box minH="100vh" bg="#F1F5F9" display="flex" alignItems="center" justifyContent="center" py={10}>
      {/* Menggunakan maxW="600px" agar lebar sama persis dengan Login */}
      <Container width="600px" px={{ base: 4, md: 0 }}>
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
              <Heading size="5xl" color="blue.600" fontWeight="black" letterSpacing="tighter">
                Lentera
              </Heading>
              <Text color="blue.900" fontWeight="bold" fontSize="xl">
                Buat Akun Baru
              </Text>
              <Text color="blue.400" fontWeight="medium">
                Bergabunglah dengan komunitas kreatif kami hari ini.
              </Text>
            </VStack>

            <VStack gap={6} align="stretch" w="full">
              {/* Tombol Google */}
              <Button
                variant="outline"
                size="lg"
                h="16"
                w="full"
                borderRadius="2xl"
                borderColor="gray.200"
                bg="white"
                _hover={{ bg: "gray.50", borderColor: "blue.200" }}
              >
                <HStack gap={4}>
                  <Chrome size={24} color="#4285F4" strokeWidth={2.5} />
                  <Text color="gray.700" fontWeight="bold" fontSize="md">Daftar dengan Google</Text>
                </HStack>
              </Button>

              <HStack w="full" gap={6}>
                <Separator flex={1} />
                <Text fontSize="xs" fontWeight="black" color="gray.300">ATAU FORMULIR</Text>
                <Separator flex={1} />
              </HStack>

              {/* Form Area */}
              <VStack gap={5} align="stretch" w="full">
                {/* Field Nama */}
                <Field.Root w="full">
                  <Field.Label fontWeight="bold" color="blue.900" mb={2}>Nama Lengkap</Field.Label>
                  <Box position="relative" w="full">
                    <Flex position="absolute" left={5} top="50%" transform="translateY(-50%)" zIndex={10} color="blue.500">
                      <User size={22} />
                    </Flex>
                    <Input 
                      w="full"
                      placeholder="Nama lengkap Anda" 
                      h="16" pl={14} bg="blue.50/30" borderRadius="2xl" borderColor="blue.100" fontSize="md"
                      _focus={{ bg: "white", borderColor: "blue.500", ring: "3px", ringColor: "blue.50" }}
                    />
                  </Box>
                </Field.Root>

                {/* Field Username */}
                <Field.Root w="full">
                  <Field.Label fontWeight="bold" color="blue.900" mb={2}>Username</Field.Label>
                  <Box position="relative" w="full">
                    <Flex position="absolute" left={5} top="50%" transform="translateY(-50%)" zIndex={10} color="blue.500">
                      <AtSign size={22} />
                    </Flex>
                    <Input 
                      w="full"
                      placeholder="username_anda" 
                      h="16" pl={14} bg="blue.50/30" borderRadius="2xl" borderColor="blue.100" fontSize="md"
                      _focus={{ bg: "white", borderColor: "blue.500", ring: "3px", ringColor: "blue.50" }}
                    />
                  </Box>
                </Field.Root>

                {/* Field Email */}
                <Field.Root w="full">
                  <Field.Label fontWeight="bold" color="blue.900" mb={2}>Email</Field.Label>
                  <Box position="relative" w="full">
                    <Flex position="absolute" left={5} top="50%" transform="translateY(-50%)" zIndex={10} color="blue.500">
                      <Mail size={22} />
                    </Flex>
                    <Input 
                      w="full"
                      type="email"
                      placeholder="nama@email.com" 
                      h="16" pl={14} bg="blue.50/30" borderRadius="2xl" borderColor="blue.100" fontSize="md"
                      _focus={{ bg: "white", borderColor: "blue.500", ring: "3px", ringColor: "blue.50" }}
                    />
                  </Box>
                </Field.Root>

                {/* Field Password */}
                <Field.Root w="full">
                  <Field.Label fontWeight="bold" color="blue.900" mb={2}>Password</Field.Label>
                  <Box position="relative" w="full">
                    <Flex position="absolute" left={5} top="50%" transform="translateY(-50%)" zIndex={10} color="blue.500">
                      <Lock size={22} />
                    </Flex>
                    <Input 
                      w="full"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      h="16" pl={14} pr={14}
                      bg="blue.50/30" borderRadius="2xl" borderColor="blue.100" fontSize="md"
                      _focus={{ bg: "white", borderColor: "blue.500", ring: "3px", ringColor: "blue.50" }}
                    />
                    <Box position="absolute" right={4} top="50%" transform="translateY(-50%)" zIndex={10}>
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

                <Button
                  bg="blue.600" color="white" h="16" w="full" borderRadius="2xl" fontWeight="black" fontSize="lg" mt={4}
                  _hover={{ bg: "blue.700", shadow: "2xl", transform: "translateY(-2px)" }}
                  gap={3}
                >
                  Daftar Sekarang <ArrowRight size={24} />
                </Button>
              </VStack>
            </VStack>

            <Box textAlign="center">
              <Text fontSize="md" color="blue.900" fontWeight="bold">
                Sudah punya akun?{" "}
                <Text 
                  as="span" color="blue.600" cursor="pointer" fontWeight="black"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => router.push("/login")}
                >
                  Masuk di sini
                </Text>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(RegisterPage), { ssr: false });