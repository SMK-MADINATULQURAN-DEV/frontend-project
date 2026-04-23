"use client";
import dynamic from "next/dynamic";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import {
  Heart,
  MessageCircle,
  MapPin,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetMyPost } from "../post/post.service";
import { PostCard } from "../post/PostCard";

const USER_POSTS = [
  {
    id: 1,
    content:
      "Alhamdulillah, progress backend project sudah mencapai 80%. Tinggal integrasi Socket.io untuk fitur chat real-time. #SMKMQ #NestJS",
    likes: 24,
    comments: 5,
    date: "Kemarin",
  },
  {
    id: 2,
    content:
      "Sedang mencoba styling Chakra UI v3 di Next.js 15. Tantangannya ada di pemahaman sistem composition-nya, tapi hasilnya memuaskan!",
    likes: 18,
    comments: 2,
    date: "3 hari yang lalu",
  },
];

function ProfilePage() {
  const router = useRouter();
  const { data: posting, query, setQuery, isFetching } = useGetMyPost();

  console.log("Data postingan saya:", posting);
  return (
    <VStack flex={1} gap={6} align="stretch">
      {/* --- PROFILE HEADER CARD --- */}
      <Box
        bg="white"
        borderRadius="2xl"
        shadow="sm"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.200"
      >
        {/* Cover Image */}
        <Box
          h="160px"
          bg="blue.500"
          bgGradient="linear(to-r, blue.600, blue.400)"
        />

        <Box px={6} pb={6}>
          <Flex justify="space-between" align="end" mt="-50px">
            {/* Avatar Profile */}
            <Box
              w="110px"
              h="110px"
              bg="gray.100"
              borderRadius="full"
              border="5px solid"
              borderColor="white"
              overflow="hidden"
            >
              <Box w="full" h="full" bg="blue.200" /> {/* Placeholder Image */}
            </Box>
            <Button
              onClick={() => router.push("/profile/edit")}
              colorPalette="blue"
              borderRadius="full"
              px={6}
            >
              Edit Profil
            </Button>
          </Flex>

          <VStack align="start" gap={1} mt={4}>
            <Heading size="xl" fontWeight="black">
              Ahmad Zaki
            </Heading>
            <Text color="gray.500" fontSize="md">
              @zaki_dev
            </Text>
          </VStack>

          <Text mt={4} color="gray.700" fontSize="md">
            Fullstack Developer | Student at SMK Madinatul Quran. Passionately
            building the future with NestJS and Next.js. 🚀
          </Text>

          <HStack gap={6} mt={4} color="gray.500" fontSize="sm" flexWrap="wrap">
            <HStack gap={1}>
              <MapPin size={16} /> Jonggol, Indonesia
            </HStack>
            <HStack gap={1}>
              <LinkIcon size={16} />{" "}
              <Text color="blue.600">github.com/zaki</Text>
            </HStack>
            <HStack gap={1}>
              <Calendar size={16} /> Bergabung Januari 2026
            </HStack>
          </HStack>

          <HStack gap={8} mt={6}>
            <HStack gap={1}>
              <Text fontWeight="bold">128</Text>{" "}
              <Text color="gray.500">Mengikuti</Text>
            </HStack>
            <HStack gap={1}>
              <Text fontWeight="bold">1,024</Text>{" "}
              <Text color="gray.500">Pengikut</Text>
            </HStack>
          </HStack>
        </Box>
      </Box>

      {/* --- POSTS TABS TITLE --- */}
      <Box
        borderBottom="2px solid"
        borderColor="blue.500"
        w="fit-content"
        px={4}
        pb={2}
      >
        <Text fontWeight="bold" color="blue.600">
          Postingan
        </Text>
      </Box>

      {/* --- USER POSTS LIST --- */}
      <VStack gap={4} align="stretch">
        {isFetching ? (
          <Text textAlign="center" color="gray.500" py={10}>
            Memuat postingan...
          </Text>
        ) : (
          posting &&
          posting?.data?.map((post) => <PostCard key={post.id} post={post} />)
        )}

        {!isFetching && posting?.data?.length === 0 && (
        <Box textAlign="center" py={10}>
          <Text color="gray.500">Belum ada postingan.</Text>
        </Box>
      )}

      {/* --- PAGINATION CONTROLS --- */}
      <HStack justify="center" gap={4} py={8}>
        <Button
          variant="outline"
          colorPalette="blue"
          borderRadius="full"
          disabled={query.page === 1 || isFetching}
          onClick={() => setQuery({ ...query, page: query.page - 1 })}
        >
          Sebelumnya
        </Button>
 
        <Box bg="blue.50" px={4} py={2} borderRadius="lg">
          <Text fontWeight="bold" color="blue.600">
            Halaman {query.page}
          </Text>
        </Box>
 
        <Button
          variant="outline"
          colorPalette="blue"
          borderRadius="full"
          disabled={
            !posting?.meta?.totalPages ||
            query.page >= posting.meta.totalPages ||
            isFetching
          }
          onClick={() => setQuery({ ...query, page: query.page + 1 })}
        >
          Berikutnya
        </Button>
      </HStack>
      </VStack>
    </VStack>
  );
}

export default dynamic(() => Promise.resolve(ProfilePage), {
  ssr: false,
});
