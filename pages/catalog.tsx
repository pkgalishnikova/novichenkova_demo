// pages/catalog.tsx
import { useState, useEffect } from "react";
import { Container, Heading, Box, useToast } from "@chakra-ui/react";
import Grid from "../components/grid";

type PotteryItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
};

export default function PotteryCatalog() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<PotteryItem[]>([]);
  const toast = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      console.log("Loading items from /api/items...");
      
      const res = await fetch("/api/items");
      console.log("Response status:", res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Loaded items:", data);
      setItems(data);
    } catch (error) {
      console.error("Load error:", error);
      toast({
        title: "Error loading catalog",
        description: "Could not load pottery items. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="2xl" mb={4} color="brown.600">
          Pottery Collection
        </Heading>
        <Heading as="h2" size="md" color="gray.600" fontWeight="normal">
          Handcrafted ceramics made with care and tradition
        </Heading>
      </Box>
      
      <Grid
        isLoading={isLoading}
        items={items}
        emptyText="No pottery items available at the moment"
      />
    </Container>
  );
}