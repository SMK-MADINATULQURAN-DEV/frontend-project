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
} from "@chakra-ui/react";
import { Camera, ArrowLeft, Save, Globe, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangePassword } from "./changePassword";

function EditProfilePage() {
  const router = useRouter();
  const passwordChange = useDisclosure();

  return (
    <VStack flex={1} gap={6} align="stretch">

        <ChangePassword isOpen={passwordChange.open} onClose={passwordChange.onClose} />
      {/* Header Navigasi Internal */}
      <HStack justify="space-between" mb={2}>
        <HStack gap={4}>
          <IconButton 
            variant="ghost" 
            onClick={() => router.back()}
            color="blue.900"
          >
            <ArrowLeft size={24} />
          </IconButton>
          <Heading size="md" color="blue.900">Edit Profil</Heading>
        </HStack>
        <Button 
          colorPalette="blue" 
          size="sm" 
          borderRadius="full" 
          px={6}
        //   leftIcon={<Save size={16} />}
        >
          Simpan Perubahan
        </Button>
      </HStack>

      <Box bg="white" borderRadius="2xl" shadow="sm" border="1px solid" borderColor="blue.50" overflow="hidden">
        {/* Edit Cover Photo */}
        <Box h="180px" bg="blue.500" position="relative">
          <Box 
            position="absolute" inset={0} bg="blackAlpha.300" 
            display="flex" alignItems="center" justifyContent="center"
            cursor="pointer" _hover={{ bg: "blackAlpha.500" }} transition="0.3s"
          >
            <VStack gap={1} color="white">
              <Camera size={28} />
              <Text fontSize="xs" fontWeight="bold">Ubah Foto Sampul</Text>
            </VStack>
          </Box>
        </Box>

        <Box px={8} pb={8}>
          {/* Edit Avatar */}
          <Flex justify="start" mt="-60px" mb={8}>
            <Box position="relative">
              <Circle 
                size="120px" 
                bg="blue.100" 
                border="6px solid" 
                borderColor="white" 
                overflow="hidden"
                shadow="lg"
              >
                <Box w="full" h="full" bg="blue.300" />
              </Circle>
              <Circle 
                position="absolute" bottom="5px" right="5px" 
                size="35px" bg="blue.600" color="white" 
                border="3px solid white" cursor="pointer"
                _hover={{ transform: "scale(1.1)" }} transition="0.2s"
              >
                <Camera size={16} />
              </Circle>
            </Box>
          </Flex>

          {/* Form Fields */}
          <VStack gap={6} align="stretch">
            <HStack gap={6} align="start">
              <VStack align="start" flex={1} gap={1}>
                <Text fontWeight="bold" color="blue.900" fontSize="sm">Nama Lengkap</Text>
                <Input 
                  defaultValue="Ahmad Zaki" 
                  size="lg" 
                  bg="blue.50/30" 
                  borderColor="blue.100"
                  color="blue.900"
                  fontWeight="medium"
                  _focus={{ bg: "white", borderColor: "blue.500" }}
                />
              </VStack>
              <VStack align="start" flex={1} gap={1}>
                <Text fontWeight="bold" color="blue.900" fontSize="sm">Username</Text>
                <Input 
                  defaultValue="@zaki_dev" 
                  size="lg" 
                  bg="blue.50/30" 
                  borderColor="blue.100"
                  color="blue.900"
                  fontWeight="medium"
                  _focus={{ bg: "white", borderColor: "blue.500" }}
                />
              </VStack>
            </HStack>

            <VStack align="start" gap={1}>
              <Text fontWeight="bold" color="blue.900" fontSize="sm">Bio</Text>
              <Textarea 
                defaultValue="Fullstack Developer | Student at SMK Madinatul Quran. Passionately building the future with NestJS and Next.js. 🚀" 
                size="lg" 
                bg="blue.50/30" 
                borderColor="blue.100"
                color="blue.900"
                fontWeight="medium"
                minH="120px"
                _focus={{ bg: "white", borderColor: "blue.500" }}
              />
              <Text fontSize="xs" color="blue.400" fontWeight="bold">Tuliskan sesuatu yang menarik tentang diri Anda.</Text>
            </VStack>

            <VStack align="start" gap={1}>
              <Text fontWeight="bold" color="blue.900" fontSize="sm">Lokasi</Text>
              <Input 
                defaultValue="Jonggol, Indonesia" 
                size="lg" 
                bg="blue.50/30" 
                borderColor="blue.100"
                color="blue.900"
                fontWeight="medium"
                _focus={{ bg: "white", borderColor: "blue.500" }}
              />
            </VStack>

            <VStack align="start" gap={1}>
              <Text fontWeight="bold" color="blue.900" fontSize="sm">Website (URL)</Text>
              <Input 
                defaultValue="https://github.com/zaki" 
                size="lg" 
                bg="blue.50/30" 
                borderColor="blue.100"
                color="blue.900"
                fontWeight="medium"
                _focus={{ bg: "white", borderColor: "blue.500" }}
              />
            </VStack>
          </VStack>
        </Box>
      </Box>

      {/* Akun & Keamanan Section */}
      <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="red.100">
        <Heading size="xs" color="red.600" mb={4} display="flex" alignItems="center" gap={2}>
          <Lock size={16} /> Privasi & Keamanan
        </Heading>
        <HStack justify="space-between">
          <VStack align="start" gap={0}>
            <Text fontWeight="bold" color="blue.900" fontSize="sm">Ubah Kata Sandi</Text>
            <Text fontSize="xs" color="blue.400" fontWeight="bold">Amankan akun Anda dengan sandi yang kuat</Text>
          </VStack>
          <Button size="sm" colorPalette="red" onClick={passwordChange.onOpen}>Ubah Sandi</Button>
        </HStack>
      </Box>
    </VStack>
  );
}

// Komponen IconButton manual jika snippets belum ada
const IconButton = ({ children, ...props }: any) => (
  <Button p={2} minW="auto" {...props}>{children}</Button>
);

export default dynamic(() => Promise.resolve(EditProfilePage), {
  ssr: false,
});