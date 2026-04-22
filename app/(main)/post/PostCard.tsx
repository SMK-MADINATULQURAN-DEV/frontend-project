"use client";
import { Box, VStack, HStack, Text, Image, Flex } from "@chakra-ui/react";
import { Heart, MessageCircle } from "lucide-react";
import { MyPostResponse, PostResponseSingle } from "./post.interface";

interface PostCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: PostResponseSingle; // Gunakan interface MyPostResponse.data[0] yang sudah kamu buat
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      shadow="sm"
    >
      {/* Header: User Info */}
      <HStack gap={3} mb={4}>
        <Box
          w="40px"
          h="40px"
          borderRadius="full"
          overflow="hidden"
          bg="gray.100"
        >
          <Image
            src={post.user?.avatar || "/default-avatar.png"}
            objectFit="cover"
            alt="Profile Picture"
            w="full"
            h="full"
          />
        </Box>
        <VStack align="start" gap={0}>
          <Text color={"black"} fontWeight="bold" fontSize="sm">
            {post.user?.name || "User"}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {new Date(post.createdAt).toLocaleDateString("id-ID")}
          </Text>
        </VStack>
      </HStack>

      {/* Content */}
      <Text fontSize="md" color="gray.800" mb={4}>
        {post.content}
      </Text>

      {/* Manual CSS Slider */}
      {post.medias && post.medias.length > 0 && (
        <Box position="relative" mb={4}>
          <Flex
            overflowX="auto"
            overflowY="hidden"
            css={{
              "scroll-snap-type": "x mandatory",
              "&::-webkit-scrollbar": { display: "none" }, // Sembunyikan scrollbar
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
            borderRadius="lg"
            bg="gray.50"
          >
            {post.medias.map((media: { url: string; id: string }) => (
              <Box
                key={media.id}
                minW="100%" // Setiap gambar mengambil 100% lebar container
                scrollSnapAlign="start" // Berhenti tepat di awal gambar
              >
                <Image
                  src={media.url}
                  alt="Post Media"
                  w="full"
                  h="350px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Flex>

          {/* Indikator Jumlah Gambar (Opsional) */}
          {post.medias.length > 1 && (
            <Box
              position="absolute"
              top={3}
              right={3}
              bg="rgba(0,0,0,0.6)"
              color="white"
              px={2}
              py={1}
              borderRadius="md"
              fontSize="xs"
              zIndex={10}
            >
              1 / {post.medias.length}
            </Box>
          )}
        </Box>
      )}

      {/* Footer: Actions */}
      <Box borderTop="1px solid" borderColor="gray.100" pt={4}>
        <HStack gap={6}>
          <HStack gap={2} color="gray.600">
            <Heart size={20} />
            <Text fontSize="sm">{post.likes?.length || 0}</Text>
          </HStack>
          <HStack gap={2} color="gray.600">
            <MessageCircle size={20} />
            <Text fontSize="sm">{post.comments?.length || 0}</Text>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};
