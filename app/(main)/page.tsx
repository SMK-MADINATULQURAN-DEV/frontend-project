"use client";
import dynamic from "next/dynamic";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { CommentModal } from "./CommentModal";

const DUMMY_POSTS = Array(10).fill({
  id: Math.random(),
  user: "Ahmad Zaki",
  username: "@zaki_dev",
  content:
    "Lagi belajar NestJS di SMK Madinatul Quran, seru banget bangun arsitektur backend! 🚀 #Lentera #CodingLife",
  likes: 12,
  comments: 4,
  time: "2j",
});

function DashboardPage() {
  const comment = useDisclosure()
  const [post, setPost] = useState<number | null>(null);
  return (
    <HStack align="start" gap={8}>

      <CommentModal isOpen={comment.open} onClose={comment.onClose} post={post} />
      {/* --- SISI TENGAH (FEED) --- */}
      <VStack flex={1} gap={4} align="stretch">
        {DUMMY_POSTS.map((post, index) => (
          <Box
            key={index}
            bg="white"
            p={5}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="blue.50"
            boxShadow="sm"
            transition="all 0.2s"
          >
            {/* Header Postingan */}
            <HStack justify="space-between" mb={3}>
              <HStack gap={3}>
                <Box 
                  w="48px" 
                  h="48px" 
                  bg="blue.600" 
                  borderRadius="full" 
                />
                <VStack align="start" gap={0}>
                  <Text fontWeight="bold" fontSize="md" color="blue.900">
                    {post.user}
                  </Text>
                  <Text fontSize="sm" color="blue.700" fontWeight="medium">
                    {post.username} • {post.time}
                  </Text>
                </VStack>
              </HStack>
              <IconButton 
                variant="ghost" 
                size="sm" 
                color="blue.900" 
                aria-label="More options"
              >
                <MoreHorizontal size={18} />
              </IconButton>
            </HStack>

            {/* Isi Konten - Warna Hitam/Navy Solid */}
            <Text fontSize="md" color="blue.800"  lineHeight="tall" mb={4}>
              {post.content}
            </Text>

            {/* Action Bar */}
            <Box borderTop="1px solid" borderColor="blue.50" pt={3}>
              <HStack gap={8}>
                <HStack 
                  gap={2} 
                  color="blue.800" 
                  cursor="pointer" 
                  _hover={{ color: "red.600" }}
                >
                  <Heart size={20} strokeWidth={2.5} />
                  <Text fontSize="sm" fontWeight="bold">{post.likes}</Text>
                </HStack>
                <HStack 
                  gap={2} 
                  color="blue.800" 
                  cursor="pointer" 
                  _hover={{ color: "blue.600" }}
                  onClick={()=> {
                    setPost(post)
                    comment.onOpen()
                  }}
                >
                  <MessageCircle size={20} strokeWidth={2.5} />
                  <Text fontSize="sm" fontWeight="bold">{post.comments}</Text>
                </HStack>
                <IconButton 
                  variant="ghost" 
                  size="sm" 
                  color="blue.800"
                  _hover={{ color: "green.600" }}
                >
                  <Share2 size={18} strokeWidth={2.5} />
                </IconButton>
              </HStack>
            </Box>
          </Box>
        ))}
      </VStack>

      {/* --- SISI KANAN (WIDGET) --- */}
      <Box w="320px" display={{ base: "none", lg: "block" }} position="sticky" top="100px" h="fit-content">
        <VStack gap={4} align="stretch">
          <Box bg="white" p={5} borderRadius="2xl" border="1px solid" borderColor="blue.50" shadow="sm">
            <Heading size="sm" mb={5} color="blue.900" fontWeight="black">
              Saran Pertemanan
            </Heading>
            <VStack gap={4} align="stretch">
              {[1, 2, 3].map((item) => (
                <HStack key={item} justify="space-between">
                  <HStack gap={3}>
                    <Box w="36px" h="36px" bg="blue.100" borderRadius="full" />
                    <VStack align="start" gap={0}>
                      <Text fontWeight="bold" fontSize="xs" color="blue.900">
                        User MQ {item}
                      </Text>
                      <Text fontSize="10px" color="blue.700" fontWeight="bold">
                        Followed by Admin
                      </Text>
                    </VStack>
                  </HStack>
                  <Button 
                    size="xs" 
                    bg="blue.600" 
                    color="white"
                    _hover={{ bg: "blue.700" }}
                    borderRadius="full"
                    px={4}
                  >
                    Ikuti
                  </Button>
                </HStack>
              ))}
            </VStack>
          </Box>

         
        </VStack>
      </Box>
    </HStack>
  );
}

export default dynamic(() => Promise.resolve(DashboardPage), {
  ssr: false,
});