"use client";
import {
  Box, Button, VStack, HStack, Text, Flex, Portal, IconButton, Input, Heading,
} from "@chakra-ui/react";
import { X, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Kata sandi lama wajib diisi"),
  newPassword: Yup.string()
    .min(8, "Minimal 8 karakter")
    .required("Kata sandi baru wajib diisi")
    .notOneOf([Yup.ref('oldPassword')], "Sandi baru tidak boleh sama dengan yang lama"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], "Konfirmasi sandi tidak cocok")
    .required("Konfirmasi sandi wajib diisi"),
});

export function ChangePassword({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      // Simulasi proses API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Kata sandi berhasil diperbarui!");
      resetForm();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <Portal>
      <Box position="fixed" inset={0} bg="blackAlpha.700" zIndex={2000} display="flex" alignItems="center" justifyContent="center" p={4} onClick={onClose}>
        <Box bg="white" w="full" maxW="500px" borderRadius="3xl" shadow="2xl" overflow="hidden" onClick={(e) => e.stopPropagation()}>
          
          <Flex justify="space-between" align="center" p={6} borderBottom="1px solid" borderColor="blue.50">
            <HStack gap={3}>
              <Box bg="blue.50" p={2} borderRadius="lg"><Lock size={20} color="#2563eb" /></Box>
              <VStack align="start" gap={0}>
                <Heading size="sm" color="blue.900">Ubah Kata Sandi</Heading>
                <Text fontSize="xs" color="blue.400" fontWeight="bold">Amankan akun Anda</Text>
              </VStack>
            </HStack>
            <IconButton variant="ghost" size="sm" onClick={onClose}><X size={20} color="#1e3a8a" /></IconButton>
          </Flex>

          <FormikProvider value={formik}>
            <Form>
              <VStack p={6} gap={6} align="stretch">
                <HStack bg="blue.50" p={4} borderRadius="xl" gap={4} align="start">
                  <ShieldCheck size={24} color="#2563eb" />
                  <Text fontSize="xs" color="blue.900" fontWeight="medium">Gunakan kombinasi huruf, angka, dan simbol untuk sandi yang kuat.</Text>
                </HStack>

                <VStack gap={4} align="stretch">
                  {/* Input Password Lama */}
                  <VStack align="start" gap={1.5}>
                    <Text fontWeight="bold" color="blue.900" fontSize="xs">Kata Sandi Saat Ini</Text>
                    <Box position="relative" w="full">
                      <Input 
                        name="oldPassword"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type={showOld ? "text" : "password"} 
                        placeholder="Masukkan sandi lama" 
                        size="lg" bg="blue.50/40" borderColor="blue.100" 
                      />
                      <IconButton position="absolute" right={2} top="50%" transform="translateY(-50%)" variant="ghost" size="sm" onClick={() => setShowOld(!showOld)}>
                        {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                      </IconButton>
                    </Box>
                    {formik.errors.oldPassword && formik.touched.oldPassword && (
                      <Text color="red.500" fontSize="xs">{formik.errors.oldPassword}</Text>
                    )}
                  </VStack>

                  {/* Input Password Baru */}
                  <VStack align="start" gap={1.5}>
                    <Text fontWeight="bold" color="blue.900" fontSize="xs">Kata Sandi Baru</Text>
                    <Box position="relative" w="full">
                      <Input 
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type={showNew ? "text" : "password"} 
                        placeholder="Minimal 8 karakter" 
                        size="lg" bg="blue.50/40" borderColor="blue.100" 
                      />
                      <IconButton position="absolute" right={2} top="50%" transform="translateY(-50%)" variant="ghost" size="sm" onClick={() => setShowNew(!showNew)}>
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </IconButton>
                    </Box>
                    {formik.errors.newPassword && formik.touched.newPassword && (
                      <Text color="red.500" fontSize="xs">{formik.errors.newPassword}</Text>
                    )}
                  </VStack>

                  {/* Konfirmasi Password */}
                  <VStack align="start" gap={1.5}>
                    <Text fontWeight="bold" color="blue.900" fontSize="xs">Konfirmasi Kata Sandi Baru</Text>
                    <Input 
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="password" 
                      placeholder="Ulangi sandi baru" 
                      size="lg" bg="blue.50/40" borderColor="blue.100" 
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                      <Text color="red.500" fontSize="xs">{formik.errors.confirmPassword}</Text>
                    )}
                  </VStack>
                </VStack>

                <Button type="submit" bg="blue.600" color="white" size="lg" borderRadius="xl" fontWeight="bold" mt={2} _hover={{ bg: "blue.700" }} loading={formik.isSubmitting}>
                  Simpan Perubahan
                </Button>
              </VStack>
            </Form>
          </FormikProvider>

        </Box>
      </Box>
    </Portal>
  );
}