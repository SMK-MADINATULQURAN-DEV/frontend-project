"use client";
import dynamic from "next/dynamic";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  SimpleGrid,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import { Search, TrendingUp, Hash, Users, Image as ImageIcon } from "lucide-react";

// Dummy Data untuk Trending
const TRENDING_TOPICS = [
  { tag: "NestJS", posts: "12.5K", category: "Technology" },
  { tag: "SMK_MQ", posts: "8.2K", category: "Education" },
  { tag: "NextJS15", posts: "5.1K", category: "Programming" },
  { tag: "LenteraProject", posts: "3.9K", category: "Startup" },
];

// Dummy Data untuk Grid Jelajah (Masonry Look)
const EXPLORE_ITEMS = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `Inspirasi Project ${i + 1}`,
  user: `@user_${i}`,
  likes: Math.floor(Math.random() * 500),
  color: ["blue.400", "blue.600", "blue.200", "blue.800"][i % 4],
  height: [200, 300, 250, 180][i % 4], // Variasi tinggi untuk efek grid dinamis
}));

function ExplorePage() {
  return (
    <VStack gap={8} align="stretch" w="full">
      {/* --- SECTION 1: SEARCH HEADER --- */}
      <Box 
        bg="white" 
        p={6} 
        borderRadius="2xl" 
        shadow="sm" 
        border="1px solid" 
        borderColor="blue.50"
      >
        <VStack gap={4} align="start">
          <Heading size="md" color="blue.900">Jelajah Inspirasi</Heading>
          <HStack w="full" bg="blue.50" px={4} py={3} borderRadius="xl" border="1px solid" borderColor="blue.100">
            <Search size={20} color="#1e3a8a" />
            <Input 
              placeholder="Cari orang, topik, atau kata kunci..." 
             
              fontSize="md" 
              color="blue.900"
              fontWeight="medium"
              _placeholder={{ color: "blue.300" }} 
            />
          </HStack>
        </VStack>
      </Box>

      <HStack align="start" gap={8}>
        {/* --- SECTION 2: EXPLORE GRID (SCROLLABLE AREA) --- */}
        <Box flex={1}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {EXPLORE_ITEMS.map((item) => (
              <Box 
                key={item.id}
                h={`${item.height}px`}
                bg={item.color}
                borderRadius="2xl"
                position="relative"
                overflow="hidden"
                cursor="pointer"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.02)", shadow: "xl" }}
              >
                {/* Overlay Konten saat Hover */}
                <Flex 
                  position="absolute" 
                  inset={0} 
                  bg="blackAlpha.400" 
                  direction="column" 
                  justify="end" 
                  p={4}
                  color="white"
                >
                  <HStack justify="space-between">
                    <VStack align="start" gap={0}>
                      <Text fontWeight="bold" fontSize="sm">{item.title}</Text>
                      <Text fontSize="xs" opacity={0.8}>{item.user}</Text>
                    </VStack>
                    <HStack gap={1}>
                      <ImageIcon size={14} />
                    </HStack>
                  </HStack>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* --- SECTION 3: TRENDING SIDEBAR (STICKY) --- */}
        <VStack 
          w="320px" 
          gap={6} 
          display={{ base: "none", lg: "flex" }}
          position="sticky"
          top="100px"
          h="fit-content"
        >
          <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="blue.50" shadow="sm" w="full">
            <HStack mb={5} color="blue.900">
              <TrendingUp size={20} />
              <Heading size="xs" fontWeight="black">Sedang Tren</Heading>
            </HStack>
            
            <VStack gap={5} align="stretch">
              {TRENDING_TOPICS.map((topic, i) => (
                <VStack key={i} align="start" gap={0} cursor="pointer" _hover={{ opacity: 0.7 }}>
                  <Text fontSize="xs" color="blue.500" fontWeight="bold">{topic.category}</Text>
                  <Text fontWeight="bold" color="blue.900">#{topic.tag}</Text>
                  <Text fontSize="xs" color="blue.700" fontWeight="medium">{topic.posts} postingan</Text>
                </VStack>
              ))}
            </VStack>

            <Button mt={6} w="full" variant="subtle" colorPalette="blue" size="sm" fontWeight="bold">
              Tampilkan lebih banyak
            </Button>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="blue.50" shadow="sm" w="full">
            <Heading size="xs" mb={4} color="blue.900" fontWeight="bold">Komunitas Populer</Heading>
            <VStack gap={4}>
              <HStack w="full" justify="space-between">
                <HStack gap={3}>
                  <Box bg="blue.100" p={2} borderRadius="lg"><Users size={16} color="#2563eb" /></Box>
                  <Text fontSize="sm" fontWeight="bold" color="blue.900">Backend MQ</Text>
                </HStack>
                <Badge colorPalette="blue">Join</Badge>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default dynamic(() => Promise.resolve(ExplorePage), {
  ssr: false,
});