"use client";
import { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Button,
  Flex,
  Portal,
  Input,
  Heading,
  Circle,
} from "@chakra-ui/react";
import { X, Send, CornerDownRight, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

export function CommentModal({ isOpen, onClose, post }: any) {
  // State untuk menangani UX "Sedang Membalas"
  const [replyTo, setReplyTo] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <Portal>
      <Box
        position="fixed" inset={0} bg="blackAlpha.700" zIndex={2000}
        display="flex" alignItems="center" justifyContent="center" p={4}
        onClick={() => {
          setReplyTo(null);
          onClose();
        }}
      >
        <Box
          bg="white" w="full" maxW="2xl" borderRadius="3xl" shadow="2xl"
          onClick={(e) => e.stopPropagation()}
          maxH="85vh" display="flex" flexDirection="column"
        >
          {/* --- HEADER --- */}
          <Flex p={4} borderBottom="1px solid" borderColor="blue.50" justify="space-between" align="center">
            <VStack align="start" gap={0}>
              <Heading size="sm" color="blue.900">Diskusi</Heading>
              <Text fontSize="xs" color="blue.400" fontWeight="bold">Berikan pendapat Anda</Text>
            </VStack>
            <IconButton variant="ghost" size="sm" onClick={onClose} color="blue.900"><X size={20} /></IconButton>
          </Flex>

          {/* --- AREA KONTEN (SCROLLABLE) --- */}
          <Box flex={1} overflowY="auto" p={6} css={{
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: '10px' },
          }}>
            {/* Postingan Konteks */}
            <VStack align="start" gap={3} mb={8} p={4} bg="blue.50/30" borderRadius="2xl" border="1px solid" borderColor="blue.50">
                <HStack gap={3}>
                    <Box w="35px" h="35px" bg="blue.600" borderRadius="full" />
                    <VStack align="start" gap={0}>
                        <Text fontWeight="bold" color="blue.900" fontSize="sm">Ahmad Zaki</Text>
                        <Text fontSize="10px" color="blue.500" fontWeight="bold">Penulis Postingan</Text>
                    </VStack>
                </HStack>
                <Text fontSize="sm" color="blue.800" fontWeight="medium">{post.content}</Text>
            </VStack>

            {/* DAFTAR KOMENTAR */}
            <VStack gap={8} align="stretch">
              {/* TINGKAT 1 */}
              <Box>
                <HStack align="start" gap={3}>
                  <Box w="38px" h="38px" bg="blue.500" borderRadius="full" flexShrink={0} />
                  <VStack align="start" gap={1} flex={1}>
                    <Box bg="blue.50" p={4} borderRadius="2xl" borderTopLeftRadius="0" w="full" position="relative">
                      <Flex justify="space-between">
                        <Text fontWeight="bold" fontSize="xs" color="blue.900">Siti Aminah</Text>
                        <MoreHorizontal size={14} color="#64748b" cursor="pointer" />
                      </Flex>
                      <Text fontSize="sm" color="blue.800" mt={1}>Keren banget penjelasannya kak! Sangat membantu buat project akhir saya.</Text>
                    </Box>
                    
                    {/* Aksi Komentar */}
                    <HStack gap={6} px={2} mt={1}>
                      <HStack gap={1} cursor="pointer" color="red.500" _hover={{ opacity: 0.8 }}>
                        <Heart size={14} fill="currentColor" />
                        <Text fontSize="xs" fontWeight="bold">12</Text>
                      </HStack>
                      <HStack 
                        gap={1} cursor="pointer" color="blue.600" 
                        onClick={() => setReplyTo("Siti Aminah")}
                        _hover={{ color: "blue.800" }}
                      >
                        <MessageCircle size={14} />
                        <Text fontSize="xs" fontWeight="bold">Balas</Text>
                      </HStack>
                      <Text fontSize="xs" color="blue.300" fontWeight="bold">2 jam lalu</Text>
                    </HStack>
                  </VStack>
                </HStack>

                {/* TINGKAT 2 (Nested Balasan) */}
                <VStack align="stretch" mt={4} pl={10} borderLeft="2px solid" borderColor="blue.50" ml={4} gap={5}>
                  <HStack align="start" gap={3}>
                    <Box w="30px" h="30px" bg="orange.400" borderRadius="full" flexShrink={0} />
                    <VStack align="start" gap={1} flex={1}>
                      <Box bg="gray.50" p={3} borderRadius="2xl" borderTopLeftRadius="0" w="full">
                        <Text fontWeight="bold" fontSize="xs" color="blue.900">Budi Tabuti</Text>
                        <Text fontSize="sm" color="blue.800">Sama-sama Siti! Semangat project-nya.</Text>
                      </Box>
                      <HStack gap={5} px={2}>
                        <HStack gap={1} color="blue.400" cursor="pointer"><Heart size={12} /><Text fontSize="xs" fontWeight="bold">1</Text></HStack>
                        <Text 
                          fontSize="xs" fontWeight="bold" color="blue.600" cursor="pointer"
                          onClick={() => setReplyTo("Budi Tabuti")}
                        >Balas</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Box>

          {/* --- FOOTER: INPUT AREA --- */}
          <Box p={4} borderTop="1px solid" borderColor="blue.50" bg="white" borderRadius="3xl">
            {/* Indikator Membalas (UX Baru) */}
            {replyTo && (
              <Flex justify="space-between" align="center" px={4} py={2} bg="blue.50" borderTopRadius="xl" mb={0}>
                <Text fontSize="xs" color="blue.700" fontWeight="bold">
                  Membalas <Text as="span" color="blue.900">@{replyTo.replace(" ", "").toLowerCase()}</Text>
                </Text>
                <X size={14} color="#2563eb" cursor="pointer" onClick={() => setReplyTo(null)} />
              </Flex>
            )}

            <HStack bg="gray.50" px={4} py={3} borderRadius={replyTo ? "bottom-xl" : "2xl"} gap={3}>
              <Box w="32px" h="32px" bg="blue.600" borderRadius="full" flexShrink={0} />
              <Input 
                placeholder={replyTo ? `Tulis balasan untuk ${replyTo}...` : "Tulis komentar..."} 
                
                fontSize="sm" 
                color="blue.900" 
                fontWeight="medium"
              />
              <IconButton 
                bg="blue.600" color="white" borderRadius="xl" size="sm" 
                _hover={{ bg: "blue.700" }}
              >
                <Send size={16} />
              </IconButton>
            </HStack>
          </Box>
        </Box>
      </Box>
    </Portal>
  );
}