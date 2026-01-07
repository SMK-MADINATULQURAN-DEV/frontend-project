"use client";
import dynamic from 'next/dynamic';
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
  Link as LinkIcon 
} from "lucide-react";
import { useRouter } from 'next/navigation';

const USER_POSTS = [
  {
    id: 1,
    content: "Alhamdulillah, progress backend project sudah mencapai 80%. Tinggal integrasi Socket.io untuk fitur chat real-time. #SMKMQ #NestJS",
    likes: 24,
    comments: 5,
    date: "Kemarin"
  },
  {
    id: 2,
    content: "Sedang mencoba styling Chakra UI v3 di Next.js 15. Tantangannya ada di pemahaman sistem composition-nya, tapi hasilnya memuaskan!",
    likes: 18,
    comments: 2,
    date: "3 hari yang lalu"
  }
];

function ProfilePage() {
  const router = useRouter()
  return (
    <VStack flex={1} gap={6} align="stretch">
      {/* --- PROFILE HEADER CARD --- */}
      <Box bg="white" borderRadius="2xl" shadow="sm" overflow="hidden" border="1px solid" borderColor="gray.200">
        {/* Cover Image */}
        <Box h="160px" bg="blue.500" bgGradient="linear(to-r, blue.600, blue.400)" />
        
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
            <Button onClick={() => router.push('/profile/edit')} colorPalette="blue" borderRadius="full" px={6}>Edit Profil</Button>
          </Flex>

          <VStack align="start" gap={1} mt={4}>
            <Heading size="xl" fontWeight="black">Ahmad Zaki</Heading>
            <Text color="gray.500" fontSize="md">@zaki_dev</Text>
          </VStack>

          <Text mt={4} color="gray.700" fontSize="md">
            Fullstack Developer | Student at SMK Madinatul Quran. 
            Passionately building the future with NestJS and Next.js. 🚀
          </Text>

          <HStack gap={6} mt={4} color="gray.500" fontSize="sm" flexWrap="wrap">
            <HStack gap={1}><MapPin size={16} /> Jonggol, Indonesia</HStack>
            <HStack gap={1}><LinkIcon size={16} /> <Text color="blue.600">github.com/zaki</Text></HStack>
            <HStack gap={1}><Calendar size={16} /> Bergabung Januari 2026</HStack>
          </HStack>

          <HStack gap={8} mt={6}>
            <HStack gap={1}><Text fontWeight="bold">128</Text> <Text color="gray.500">Mengikuti</Text></HStack>
            <HStack gap={1}><Text fontWeight="bold">1,024</Text> <Text color="gray.500">Pengikut</Text></HStack>
          </HStack>
        </Box>
      </Box>

      {/* --- POSTS TABS TITLE --- */}
      <Box borderBottom="2px solid" borderColor="blue.500" w="fit-content" px={4} pb={2}>
        <Text fontWeight="bold" color="blue.600">Postingan</Text>
      </Box>

      {/* --- USER POSTS LIST --- */}
      <VStack gap={4} align="stretch">
        {USER_POSTS.map((post) => (
          <Box 
            key={post.id} 
            bg="white" 
            p={6} 
            borderRadius="xl" 
            borderWidth="1px" 
            borderColor="gray.200"
          >
            <HStack gap={3} mb={4}>
              <Box w="40px" h="40px" bg="gray.200" borderRadius="full" />
              <VStack align="start" gap={0}>
                <Text fontWeight="bold">Ahmad Zaki</Text>
                <Text fontSize="xs" color="gray.500">{post.date}</Text>
              </VStack>
            </HStack>
            
            <Text fontSize="md" color="gray.800" mb={4}>
              {post.content}
            </Text>

            <Box borderTop="1px solid" borderColor="gray.100" pt={4}>
              <HStack gap={6}>
                <HStack gap={2} color="gray.600">
                  <Heart size={20} />
                  <Text fontSize="sm">{post.likes}</Text>
                </HStack>
                <HStack gap={2} color="gray.600">
                  <MessageCircle size={20} />
                  <Text fontSize="sm">{post.comments}</Text>
                </HStack>
              </HStack>
            </Box>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}

export default dynamic(() => Promise.resolve(ProfilePage), {
  ssr: false,
});