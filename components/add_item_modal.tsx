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
  Switch,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export type PotteryItemInput = {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
};

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: PotteryItemInput) => void;
};

export default function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const toast = useToast();
  const [form, setForm] = useState<PotteryItemInput>({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    inStock: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!form.name || form.name.trim() === "") {
      toast({
        title: "Name is required",
        description: "Please enter a name for the pottery item",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!form.image || form.image.trim() === "") {
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
      
      // Call the onAdd function passed from parent
      await onAdd(form);
      
      // Reset form after successful add
      setForm({
        name: "",
        price: 0,
        image: "",
        description: "",
        category: "",
        inStock: true,
      });
      
      onClose();
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
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Pottery Item</ModalHeader>
        <ModalCloseButton isDisabled={isSubmitting} />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="e.g., Handmade Ceramic Mug"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              isDisabled={isSubmitting}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
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
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              placeholder="https://example.com/image.jpg or /images/mug.jpg"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              isDisabled={isSubmitting}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Describe the pottery item..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              isDisabled={isSubmitting}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Input
              placeholder="e.g., mugs, bowls, vases, plates"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              isDisabled={isSubmitting}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">In Stock?</FormLabel>
            <Switch
              isChecked={form.inStock}
              onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
              colorScheme="teal"
              isDisabled={isSubmitting}
            />
          </FormControl>
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