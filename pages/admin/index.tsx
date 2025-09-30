// pages/admin/index.tsx
import { useSession, signIn } from "next-auth/react";
import {
  Box,
  Button,
  Heading,
  Text,
  Container,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Grid from "../../components/grid";
import AddItemModal, { PotteryItemInput } from "../../components/add_item_modal";

type PotteryItem = PotteryItemInput & { id: string };

function AdminDashboard() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<PotteryItem[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching from /api/items...");
      
      const res = await fetch("/api/items");
      console.log("Response status:", res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Received items:", data);
      setItems(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast({
        title: "Error loading items",
        description: error instanceof Error ? error.message : "Could not load items",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async (item: PotteryItemInput) => {
    try {
      console.log("Adding item:", item);
      
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add item");
      }

      const newItem = await res.json();
      console.log("Item added:", newItem);
      
      setItems((prev) => [...prev, newItem]);

      toast({
        title: "Success!",
        description: `${newItem.name} added to catalog`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Add error:", error);
      toast({
        title: "Error adding item",
        description: error instanceof Error ? error.message : "Could not add item",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (status === "loading") {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" mt={10}>
          <Heading size="md" mb={4}>Admin Login Required</Heading>
          <Button colorScheme="blue" onClick={() => signIn("google")}>
            Sign in with Google
          </Button>
        </Box>
      </Container>
    );
  }

  if (session.user?.role !== "admin") {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" mt={10}>
          <Text fontSize="xl" color="red.500" mb={2}>
            Access Denied
          </Text>
          <Text color="gray.600">
            Admin privileges required. Current role: {session.user?.role || "none"}
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={8}>
        <Box>
          <Heading as="h1" size="2xl" mb={2} color="orange.700">
            Pottery Collection
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Admin Dashboard - Manage your pottery items
          </Text>
        </Box>
        <Button colorScheme="teal" size="lg" onClick={onOpen}>
          + Add Item
        </Button>
      </Box>

      <Grid 
        isLoading={isLoading} 
        items={items} 
        emptyText="No items yet. Click 'Add Item' to get started!" 
      />

      <AddItemModal isOpen={isOpen} onClose={onClose} onAdd={handleAddItem} />
    </Container>
  );
}

export default AdminDashboard;