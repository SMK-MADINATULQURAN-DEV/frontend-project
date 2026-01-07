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
  Circle,
} from "@chakra-ui/react";
import {
  Heart,
  MessageSquare,
  UserPlus,
  Bell,
  MoreHorizontal,
  AtSign,
} from "lucide-react";

// Dummy Data Notifikasi yang Banyak
const NOTIFICATIONS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  type: ["like", "comment", "follow", "mention"][i % 4],
  user: ["Ahmad Zaki", "Siti Aminah", "Faisal Dev", "Admin MQ"][i % 4],
  content: [
    "menyukai postingan Anda",
    "mengomentari: 'Wah keren banget backend-nya!'",
    "mulai mengikuti Anda",
    "menyebut Anda dalam sebuah diskusi",
  ][i % 4],
  time: `${i + 1}j yang lalu`,
  isRead: i > 2, // 3 teratas belum dibaca
}));

function NotificationsPage() {
  return (
    <HStack align="start" gap={8} h="calc(100vh - 120px)">
      {/* --- KIRI: DAFTAR NOTIFIKASI (SCROLLABLE AREA) --- */}
      <VStack
        flex={1}
        bg="white"
        borderRadius="2xl"
        shadow="sm"
        border="1px solid"
        borderColor="blue.50"
        align="stretch"
        gap={0}
        h="full" // Mengikuti tinggi container utama
      >
        <Box p={6} borderBottom="1px solid" borderColor="blue.50">
          <Flex justify="space-between" align="center">
            <Heading size="md" color="blue.900">Notifikasi</Heading>
            <Button variant="ghost" colorPalette="blue" size="xs" fontWeight="bold">
              Tandai semua dibaca
            </Button>
          </Flex>
        </Box>

        {/* Independent Scroll Area */}
        <Box 
          flex={1} 
          overflowY="auto" 
          css={{
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: '10px' },
          }}
        >
          {NOTIFICATIONS.map((item) => (
            <HStack
              key={item.id}
              p={5}
              gap={4}
              borderBottom="1px solid"
              borderColor="blue.50"
              bg={item.isRead ? "transparent" : "blue.50/30"}
              _hover={{ bg: "gray.50" }}
              transition="0.2s"
              cursor="pointer"
              align="start"
            >
              {/* Icon Berdasarkan Tipe */}
              <Circle size="40px" bg={
                item.type === "like" ? "red.50" : 
                item.type === "comment" ? "blue.50" : 
                item.type === "follow" ? "green.50" : "purple.50"
              }>
                {item.type === "like" && <Heart size={18} color="#e11d48" fill="#e11d48" />}
                {item.type === "comment" && <MessageSquare size={18} color="#2563eb" />}
                {item.type === "follow" && <UserPlus size={18} color="#16a34a" />}
                {item.type === "mention" && <AtSign size={18} color="#9333ea" />}
              </Circle>

              <VStack align="start" gap={1} flex={1}>
                <HStack gap={2} flexWrap="wrap">
                  <Text fontWeight="bold" color="blue.900" fontSize="sm">
                    {item.user}
                  </Text>
                  <Text color="blue.800" fontSize="sm" fontWeight="medium">
                    {item.content}
                  </Text>
                </HStack>
                <Text fontSize="xs" color="blue.400" fontWeight="bold">
                  {item.time}
                </Text>
              </VStack>

              {!item.isRead && (
                <Circle size="8px" bg="blue.500" alignSelf="center" />
              )}
            </HStack>
          ))}
        </Box>
      </VStack>

      {/* --- KANAN: FILTER/SETTINGS (FIXED AREA) --- */}
      <Box 
        w="300px" 
        display={{ base: "none", lg: "block" }}
        position="sticky"
        top="0"
        h="fit-content"
      >
        <VStack gap={4} align="stretch">
          <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="blue.50" shadow="sm">
            <Heading size="xs" mb={4} color="blue.900" fontWeight="bold">Filter Notifikasi</Heading>
            <VStack gap={2} align="stretch">
              <Button variant="surface" colorPalette="blue" justifyContent="start" size="sm">Semua</Button>
              <Button variant="ghost" justifyContent="start" size="sm" color="blue.800">Belum Dibaca</Button>
              <Button variant="ghost" justifyContent="start" size="sm" color="blue.800">Mentions</Button>
            </VStack>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="blue.50" shadow="sm">
            <HStack gap={3}>
              <Bell size={18} color="#1e3a8a" />
              <Text fontSize="sm" fontWeight="bold" color="blue.900">Pengaturan Notifikasi</Text>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </HStack>
  );
}

export default dynamic(() => Promise.resolve(NotificationsPage), {
  ssr: false,
});