"use client";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Textarea,
  Flex,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { Image as ImageIcon, X, Globe } from "lucide-react";

export function CreatePostModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <Portal>
      {/* Overlay Gelap */}
      <Box 
        position="fixed" inset={0} bg="blackAlpha.600" zIndex={2000} 
        display="flex" alignItems="center" justifyContent="center"
        onClick={onClose}
      >
        {/* Konten Modal */}
        <Box 
          bg="white" w="full" maxW="lg" borderRadius="2xl" shadow="2xl" 
          onClick={(e) => e.stopPropagation()} // Agar tidak close saat klik dalam kotak
        >
          {/* Header Modal */}
          <Flex justify="space-between" align="center" p={4} borderBottom="1px solid" borderColor="blue.50">
            <IconButton variant="ghost" onClick={onClose} color="blue.900"><X size={20} /></IconButton>
            <Text fontWeight="black" color="blue.900">Buat Postingan Baru</Text>
            <Box w="40px" /> {/* Spacer untuk keseimbangan */}
          </Flex>

          {/* Body Modal */}
          <VStack p={5} align="stretch" gap={4}>
            <HStack gap={3}>
              <Box w="45px" h="45px" bg="blue.600" borderRadius="full" />
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" color="blue.900">Ahmad Zaki</Text>
                <HStack gap={1} color="blue.600">
                  <Globe size={12} />
                  <Text fontSize="xs" fontWeight="bold">Publik</Text>
                </HStack>
              </VStack>
            </HStack>

            <Textarea 
              placeholder="Apa yang Anda pikirkan?" 
              
              size="lg"
              minH="150px"
              fontSize="xl"
              color="blue.900"
              fontWeight="medium"
              _placeholder={{ color: "blue.200" }}
              resize="none"
              autoFocus
            />

            {/* Media Preview Placeholder (Opsional) */}
            <Box border="2px dashed" borderColor="blue.50" borderRadius="xl" p={8} textAlign="center" cursor="pointer" _hover={{ bg: "blue.50" }}>
               <VStack gap={1}>
                  <ImageIcon size={30} color="#2563eb" />
                  <Text fontSize="sm" color="blue.800" fontWeight="bold">Tambah Foto/Video</Text>
               </VStack>
            </Box>
          </VStack>

          {/* Footer Modal */}
          <Flex p={4} borderTop="1px solid" borderColor="blue.50" justify="end">
            <Button 
              bg="blue.600" color="white" px={8} borderRadius="full" fontWeight="bold"
              _hover={{ bg: "blue.700" }}
              onClick={() => {
                alert("Postingan berhasil dikirim!");
                onClose();
              }}
            >
              Kirim Postingan
            </Button>
          </Flex>
        </Box>
      </Box>
    </Portal>
  );
}