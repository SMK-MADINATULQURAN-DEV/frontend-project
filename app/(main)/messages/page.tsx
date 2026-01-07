"use client";
import dynamic from "next/dynamic";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { Send, Search, MoreVertical, Phone, Video } from "lucide-react";

// Dummy Data User yang Banyak
const DUMMY_CHATS = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  name: ["Ahmad Zaki", "Admin MQ", "Siti Aminah", "Budi Tabuti", "Faisal Dev"][i % 5],
  lastMsg: "Pesan terakhir yang dikirim pengguna ini...",
  time: `${10 + i}:${i + 10}`,
  active: i === 0,
}));

// Dummy Data Pesan yang Banyak
const DUMMY_MESSAGES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  text: i % 2 === 0 ? "Ini pesan dari teman kamu yang cukup panjang untuk testing bubble chat." : "Ini jawaban dari saya sendiri.",
  sender: i % 2 === 0 ? "them" : "me",
  time: "10:45",
}));

function MessagesPage() {
  return (
    <Box
      h="calc(100vh - 140px)" // Tinggi dibatasi agar scroll muncul
      bg="white"
      borderRadius="2xl"
      shadow="md"
      border="1px solid"
      borderColor="blue.100"
      overflow="hidden"
    >
      <HStack h="full" gap={0} align="stretch">
        
        {/* --- KIRI: DAFTAR PESAN (SCROLLABLE) --- */}
        <VStack
          w="350px"
          borderRight="2px solid"
          borderColor="blue.50"
          align="stretch"
          gap={0}
        >
          <Box p={5} borderBottom="1px solid" borderColor="blue.50">
            <Heading size="md" color="blue.900" mb={4}>Pesan</Heading>
            <HStack bg="blue.50" px={4} py={2} borderRadius="xl">
              <Search size={18} color="#1e3a8a" />
              <Input
                placeholder="Cari pesan..."
               
                fontSize="sm"
                color="blue.900"
                _placeholder={{ color: "blue.400" }}
              />
            </HStack>
          </Box>

          {/* Container Scroll untuk Daftar User */}
          <Box flex={1} overflowY="auto" css={{
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: '10px' },
          }}>
            {DUMMY_CHATS.map((chat) => (
              <HStack
                key={chat.id}
                px={5}
                py={4}
                gap={4}
                cursor="pointer"
                bg={chat.active ? "blue.50" : "transparent"}
                _hover={{ bg: "blue.50" }}
                transition="0.2s"
              >
                <Box w="45px" h="45px" bg="blue.600" borderRadius="full" flexShrink={0} />
                <VStack align="start" gap={0} flex={1}>
                  <Flex justify="space-between" w="full">
                    <Text fontWeight="bold" color="blue.900" fontSize="sm">{chat.name}</Text>
                    <Text fontSize="xs" color="blue.600" fontWeight="bold">{chat.time}</Text>
                  </Flex>
                  <Text fontSize="xs" color="blue.700" fontWeight="medium" >
                    {chat.lastMsg}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </Box>
        </VStack>

        {/* --- KANAN: WINDOW CHAT --- */}
        <Flex flex={1} direction="column" bg="white">
          {/* Header Chat */}
          <Flex p={4} borderBottom="1px solid" borderColor="blue.50" justify="space-between" align="center" shadow="sm">
            <HStack gap={3}>
              <Box w="40px" h="40px" bg="blue.600" borderRadius="full" />
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" color="blue.900" fontSize="md">Ahmad Zaki</Text>
                <Text fontSize="xs" color="green.500" fontWeight="bold">Online</Text>
              </VStack>
            </HStack>
            <HStack gap={2}>
              <IconButton variant="ghost" color="blue.800"><Phone size={20} /></IconButton>
              <IconButton variant="ghost" color="blue.800"><Video size={20} /></IconButton>
              <IconButton variant="ghost" color="blue.800"><MoreVertical size={20} /></IconButton>
            </HStack>
          </Flex>

          {/* Area Bubble Pesan (SCROLLABLE) */}
          <VStack 
            flex={1} 
            p={6} 
            bg="#F8FAFC" 
            overflowY="auto" 
            gap={4} 
            align="stretch"
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: '10px' },
            }}
          >
            {DUMMY_MESSAGES.map((msg) => (
              <Box 
                key={msg.id} 
                alignSelf={msg.sender === "me" ? "end" : "start"} 
                maxW="70%"
              >
                <Box 
                  bg={msg.sender === "me" ? "blue.600" : "white"} 
                  color={msg.sender === "me" ? "white" : "blue.900"}
                  p={3} 
                  px={4}
                  borderRadius="2xl" 
                  borderBottomRightRadius={msg.sender === "me" ? "0" : "2xl"}
                  borderBottomLeftRadius={msg.sender === "them" ? "0" : "2xl"}
                  shadow="sm"
                  border={msg.sender === "them" ? "1px solid" : "none"}
                  borderColor="blue.50"
                >
                  <Text fontSize="sm" fontWeight="medium">
                    {msg.text}
                  </Text>
                </Box>
                <Text 
                  fontSize="10px" 
                  color="blue.400" 
                  mt={1} 
                  textAlign={msg.sender === "me" ? "right" : "left"} 
                  fontWeight="bold"
                >
                  {msg.time}
                </Text>
              </Box>
            ))}
          </VStack>

          {/* Input Chat */}
          <Box p={4} bg="white" borderTop="1px solid" borderColor="blue.50">
            <HStack bg="gray.50" px={4} py={2} borderRadius="2xl" gap={4} border="1px solid" borderColor="blue.50">
              <Input
                placeholder="Ketik pesan..."
               
                fontSize="sm"
                color="blue.900"
                fontWeight="medium"
              />
              <IconButton
                bg="blue.600"
                color="white"
                borderRadius="xl"
                _hover={{ bg: "blue.700" }}
                aria-label="Send"
              >
                <Send size={18} />
              </IconButton>
            </HStack>
          </Box>
        </Flex>
      </HStack>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(MessagesPage), {
  ssr: false,
});