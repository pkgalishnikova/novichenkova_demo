// components/add_item_modal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export type PotteryItemInput = {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  status: "in_stock" | "preorder" | "out_of_stock";
};

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: PotteryItemInput) => void;
};

const CATEGORIES = ["mugs", "bowls", "vases", "plates", "sculptures", "other"];

export default function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const toast = useToast();
  const [form, setForm] = useState<PotteryItemInput>({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    status: "in_stock",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSubmit = async () => {
    // Basic Validation
    if (!form.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter a name for the pottery item",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!form.image.trim()) {
      toast({
        title: "Image URL is required",
        description: "Please enter an image URL",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (form.price < 0) {
      toast({
        title: "Invalid price",
        description: "Price cannot be negative",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await onAdd(form);
      // Reset form after successful add
      setForm({
        name: "",
        price: 0,
        image: "",
        description: "",
        category: "",
        status: "in_stock",
      });
      setImageError(false);
      onClose();
      toast({
        title: "Success!",
        description: "Pottery item added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error in modal submit:", error);
      toast({
        title: "Error",
        description: "Failed to add item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setForm({
        name: "",
        price: 0,
        image: "",
        description: "",
        category: "",
        status: "in_stock",
      });
      setImageError(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Pottery Item</ModalHeader>
        <ModalCloseButton isDisabled={isSubmitting} />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="e.g., Handmade Ceramic Mug"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                isDisabled={isSubmitting}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price ($)</FormLabel>
              <Input
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={form.price || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm({
                    ...form,
                    price: value === "" ? 0 : parseFloat(value),
                  });
                }}
                isDisabled={isSubmitting}
              />
              {form.price > 0 && (
                <Text fontSize="sm" color="gray.600" mt={1}>
                  Display price: ${form.price.toFixed(2)}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={(e) => {
                  setForm({ ...form, image: e.target.value });
                  setImageError(false);
                }}
                isDisabled={isSubmitting}
              />
              {form.image && !imageError && (
                <img
                  src={form.image}
                  alt="Preview"
                  style={{
                    maxHeight: "100px",
                    marginTop: "8px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                  onError={() => setImageError(true)}
                />
              )}
              {imageError && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  Unable to load image. Please check the URL.
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Describe the pottery item..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                isDisabled={isSubmitting}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                isDisabled={isSubmitting}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Availability Status</FormLabel>
              <Select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as "in_stock" | "preorder" | "out_of_stock",
                  })
                }
                isDisabled={isSubmitting}
              >
                <option value="in_stock">In Stock</option>
                <option value="preorder">Available for Preorder</option>
                <option value="out_of_stock">Out of Stock</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={handleClose}
            isDisabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Adding..."
          >
            Add Item
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}