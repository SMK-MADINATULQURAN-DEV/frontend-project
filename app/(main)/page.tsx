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
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { CommentModal } from "./CommentModal";
import { useGetMyFeed } from "./post/post.service";
import { PostCard } from "./post/PostCard";

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
  const comment = useDisclosure();
  const [post, setPost] = useState<number | null>(null);

  const { data, isFetching, isLoading, query, setQuery } = useGetMyFeed();

  console.log("Data feed saya:", data);

  console.log("Query feed saya:", data);
  return (
    <HStack align="start" gap={8}>
      <CommentModal
        isOpen={comment.open}
        onClose={comment.onClose}
        post={post}
      />
      {/* --- SISI TENGAH (FEED) --- */}
      <VStack flex={1} gap={4} align="stretch">
        {isFetching ? (
          <Text textAlign="center" color="gray.500" py={10}>
            Memuat postingan...
          </Text>
        ) : (
          data &&
          data?.data?.map((post) => <PostCard key={post.id} post={post} />)
        )}

        {!isFetching && data?.data?.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text color="gray.500">Belum ada postingan.</Text>
          </Box>
        )}
      </VStack>

      {/* --- SISI KANAN (WIDGET) --- */}
      <Box
        w="320px"
        display={{ base: "none", lg: "block" }}
        position="sticky"
        top="100px"
        h="fit-content"
      >
        <VStack gap={4} align="stretch">
          <Box
            bg="white"
            p={5}
            borderRadius="2xl"
            border="1px solid"
            borderColor="blue.50"
            shadow="sm"
          >
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
