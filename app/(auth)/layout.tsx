"use client"
import { Box } from "@chakra-ui/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Box className="min-h-screen flex items-center justify-center bg-[#F8FAFC]" px={4}>{children}</Box>
   
  );
}
