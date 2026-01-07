"use client";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import {
  LogOut,
  Home,
  Search,
  Bell,
  PlusSquare,
  MessageSquare, // Ikon untuk Pesan
  User as UserIcon,
} from "lucide-react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import Link from "next/link";
import Swal from "sweetalert2";
import { useState } from "react";
import { CreatePostModal } from "./createPosting";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan URL saat ini
  const posting = useDisclosure();

  // 1. Definisi Array Navigasi
  const NAV_ITEMS = [
    { label: "Beranda", icon: Home, path: "/" },
    { label: "Jelajah", icon: Search, path: "/explore" },
    { label: "Notifikasi", icon: Bell, path: "/notifications" },
    { label: "Pesan", icon: MessageSquare, path: "/messages" }, // Button Pesan Baru
    { label: "Profil", icon: UserIcon, path: "/profile" },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Anda akan keluar dari aplikasi Lentera.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Ya, Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("access_token");
        router.push("/login");
      }
    });
  };

  return (
    <Box minH="100vh" bg="#F1F5F9">

      <CreatePostModal isOpen={posting.open} onClose={posting.onClose} />
      {/* --- STICKY HEADER --- */}
      <Box
        as="nav"
        position="sticky"
        top="0"
        zIndex="1000"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Container maxW="6xl" py={3}>
          <Flex align="center" justify="space-between">
            <Heading
              size="xl"
              color="blue.600"
              fontWeight="black"
              letterSpacing="tighter"
              cursor="pointer"
              onClick={() => router.push("/")}
            >
              Lentera
            </Heading>

            <HStack gap={6} display={{ base: "none", md: "flex" }}>
              {/* Mapping untuk Header Icons (Opsional jika ingin sinkron) */}
              {NAV_ITEMS.filter((item) => item.path !== "/profile").map(
                (item) => (
                  <Link key={item.path} href={item.path}>
                    <item.icon
                      size={22}
                      color={pathname === item.path ? "#2563eb" : "#64748b"}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                )
              )}
              <PlusSquare onClick={posting.onOpen} size={22} color="#64748b" cursor="pointer" />
            </HStack>

            <HStack gap={4}>
              <Box
                w="35px"
                h="35px"
                bg="blue.500"
                borderRadius="full"
                cursor="pointer"
                onClick={() => router.push("/profile")}
              />
              <Button
                display={{ base: "none", md: "flex" }}
                variant="ghost"
                color="red.500"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut size={18} />
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* --- MAIN CONTENT --- */}
      <Container maxW="6xl" py={8}>
        <HStack align="start" gap={8} position="relative">
          {/* Sisi Kiri (NAVIGASI DARI ARRAY) */}
          <VStack
            w="240px"
            align="stretch"
            gap={2}
            display={{ base: "none", md: "flex" }}
            position="sticky"
            top="100px"
            h="fit-content"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "surface" : "ghost"} // Menggunakan variant surface jika aktif
                    colorPalette="blue"
                    justifyContent="start"
                    gap={4}
                    width="full"
                    fontWeight={isActive ? "bold" : "medium"}
                  >
                    <item.icon size={20} /> {item.label}
                  </Button>
                </Link>
              );
            })}
          </VStack>
          <VStack flex={1} gap={6} align="stretch">
            {children}
          </VStack>

          {/* Sisi Tengah (FEED) */}
        </HStack>
      </Container>
    </Box>
  );
}
