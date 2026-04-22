/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Box,
  Input,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const LocationSearch = ({ formik }: { formik: any }) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const provider = new OpenStreetMapProvider();

  const handleSearch = async (query: string) => {
    formik.setFieldValue("location", query);
    
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await provider.search({ query });
      setResults(searchResults);
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (label: string) => {
    formik.setFieldValue("location", label);
    setResults([]);
  };

  return (
    <VStack align="start" gap={1} w="full" position="relative">
      <Text fontWeight="bold" color="blue.900" fontSize="sm">
        Lokasi
      </Text>
      
      <Box w="full" position="relative">
        <Input
          name="location"
          placeholder="Cari kota atau alamat..."
          value={formik.values.location}
          onChange={(e) => handleSearch(e.target.value)}
          size="lg"
          color="black"
          bg="blue.50/30"
          borderColor="blue.100"
          autoComplete="off" // Mematikan autocomplete bawaan browser
        />
        {isLoading && (
          <Spinner
            position="absolute"
            right={3}
            top={3}
            size="sm"
            color="blue.500"
            zIndex={2}
          />
        )}

        {/* Dropdown Saran Alamat */}
        {results.length > 0 && (
          <Box
            position="absolute"
            top="100%" // Muncul tepat di bawah input
            left={0}
            right={0}
            bg="white"
            shadow="2xl"
            zIndex={9999} // Sangat tinggi agar tidak tertutup elemen lain
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            mt={1}
            maxH="250px"
            overflowY="auto"
          >
            {results.map((result, index) => (
              <Box
                key={index}
                p={3}
                cursor="pointer"
                _hover={{ bg: "blue.50" }}
                onClick={() => handleSelect(result.label)}
                borderBottom={index !== results.length - 1 ? "1px solid" : "none"}
                borderColor="gray.100"
              >
                <Text fontSize="sm" color="gray.700" >
                  {result.label}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default LocationSearch;