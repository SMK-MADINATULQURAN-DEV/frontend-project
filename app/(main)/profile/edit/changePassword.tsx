"use client";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Portal,
  IconButton,
  Input,
  Heading,
} from "@chakra-ui/react";
import { X, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function ChangePassword({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
  if (!isOpen) return null;

  return (
    <Portal>
      {/* Overlay Gelap */}
      <Box 
        position="fixed" 
        inset={0} 
        bg="blackAlpha.700" 
        zIndex={2000} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        p={4} // Padding agar tidak mepet layar saat di HP
        onClick={onClose}
      >
        {/* Kontainer Putih Modal (Dibatasi Lebarnya) */}
        <Box 
          bg="white" 
          w="full" 
          maxW="500px" // Kunci agar tidak FULL
          borderRadius="3xl" 
          shadow="2xl" 
          overflow="hidden"
          onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat area putih diklik
        >
          {/* Header Modal */}
          <Flex justify="space-between" align="center" p={6} borderBottom="1px solid" borderColor="blue.50">
            <HStack gap={3}>
              <Box bg="blue.50" p={2} borderRadius="lg">
                <Lock size={20} color="#2563eb" />
              </Box>
              <VStack align="start" gap={0}>
                <Heading size="sm" color="blue.900">Ubah Kata Sandi</Heading>
                <Text fontSize="xs" color="blue.400" fontWeight="bold">Amankan akun Anda</Text>
              </VStack>
            </HStack>
            <IconButton variant="ghost" size="sm" onClick={onClose}>
              <X size={20} color="#1e3a8a" />
            </IconButton>
          </Flex>

          {/* Body Modal */}
          <VStack p={6} gap={6} align="stretch">
            {/* Info Section */}
            <HStack bg="blue.50" p={4} borderRadius="xl" gap={4} align="start">
              <ShieldCheck size={24} color="#2563eb" />
              <Text fontSize="xs" color="blue.900" fontWeight="medium" lineHeight="tall">
                Gunakan kombinasi huruf, angka, dan simbol untuk kata sandi yang lebih kuat.
              </Text>
            </HStack>

            <VStack gap={4} align="stretch">
              {/* Input Password Lama */}
              <VStack align="start" gap={1.5}>
                <Text fontWeight="bold" color="blue.900" fontSize="xs">Kata Sandi Saat Ini</Text>
                <Box position="relative" w="full">
                  <Input 
                    type={showOld ? "text" : "password"}
                    placeholder="Masukkan sandi lama" 
                    size="lg" bg="blue.50/40" borderColor="blue.100" color="blue.900"
                    _focus={{ bg: "white", borderColor: "blue.500" }}
                  />
                  <IconButton 
                    position="absolute" right={2} top="50%" transform="translateY(-50%)" 
                    variant="ghost" size="sm" onClick={() => setShowOld(!showOld)}
                  >
                    {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconButton>
                </Box>
              </VStack>

              {/* Input Password Baru */}
              <VStack align="start" gap={1.5}>
                <Text fontWeight="bold" color="blue.900" fontSize="xs">Kata Sandi Baru</Text>
                <Box position="relative" w="full">
                  <Input 
                    type={showNew ? "text" : "password"}
                    placeholder="Minimal 8 karakter" 
                    size="lg" bg="blue.50/40" borderColor="blue.100" color="blue.900"
                    _focus={{ bg: "white", borderColor: "blue.500" }}
                  />
                  <IconButton 
                    position="absolute" right={2} top="50%" transform="translateY(-50%)" 
                    variant="ghost" size="sm" onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconButton>
                </Box>
              </VStack>

              {/* Konfirmasi Password */}
              <VStack align="start" gap={1.5}>
                <Text fontWeight="bold" color="blue.900" fontSize="xs">Konfirmasi Kata Sandi Baru</Text>
                <Input 
                  type="password"
                  placeholder="Ulangi sandi baru" 
                  size="lg" bg="blue.50/40" borderColor="blue.100" color="blue.900"
                  _focus={{ bg: "white", borderColor: "blue.500" }}
                />
              </VStack>
            </VStack>

            <Button 
              bg="blue.600" color="white" size="lg" h="12" borderRadius="xl"
              fontWeight="bold" mt={2} _hover={{ bg: "blue.700" }}
            >
              Simpan Perubahan
            </Button>
          </VStack>
        </Box>
      </Box>
    </Portal>
  );
}