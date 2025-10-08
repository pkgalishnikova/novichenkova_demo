// pages/admin/item/[id].tsx (Admin edit page)
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  Grid,
  VStack,
  HStack,
  useToast,
  Skeleton,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";

type PotteryItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  status: "in_stock" | "preorder" | "out_of_stock";
  weight?: string;
  dimensions?: string;
  care?: string;
  materials?: string;
  additionalInfo?: string;
};

export default function AdminEditItemPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const toast = useToast();

  const [item, setItem] = useState<PotteryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<PotteryItem>>({});
  const [imagePreview, setImagePreview] = useState("");

  // Check admin access
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !isAdmin) {
      router.push("/");
      return;
    }

    if (id) {
      loadItem();
    }
  }, [id, session, status, isAdmin]);

  const loadItem = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/items/${id}`);

      if (!res.ok) {
        throw new Error("Failed to load item");
      }

      const data = await res.json();
      setItem(data);
      setEditForm(data);
      setImagePreview(data.image);
    } catch (error) {
      console.error("Error loading item:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товар",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await res.json();
      setItem(updatedItem);

      toast({
        title: "Успех!",
        description: "Товар успешно обновлен",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect back to admin dashboard
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } catch (error) {
      console.error("Error updating item:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить товар",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Skeleton height="60px" mb={4} />
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <Skeleton height="400px" />
          <Skeleton height="400px" />
        </Grid>
      </Container>
    );
  }

  if (!session || !isAdmin) {
    return null; // Will redirect
  }

  if (!item) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Товар не найден</Text>
        <Button mt={4} onClick={() => router.push("/admin")}>
          Вернуться в панель администратора
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Button mb={4} onClick={() => router.push("/admin")}>
        ← Назад к панели администратора
      </Button>

      <Heading size="xl" mb={6}>Редактировать товар</Heading>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        {/* Left Column - Image Preview */}
        <VStack align="stretch" spacing={4}>
          <Box>
            <Text fontWeight="bold" mb={2}>Предпросмотр изображения</Text>
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width="100%"
                maxH="500px"
                objectFit="cover"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
              />
            )}
          </Box>
        </VStack>

        {/* Right Column - Form Fields */}
        <VStack align="stretch" spacing={4}>
          <FormControl isRequired>
            <FormLabel>Название</FormLabel>
            <Input
              value={editForm.name || ""}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Цена ($)</FormLabel>
            <Input
              type="number"
              step="0.01"
              value={editForm.price || 0}
              onChange={(e) =>
                setEditForm({ ...editForm, price: parseFloat(e.target.value) })
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>URL изображения</FormLabel>
            <Input
              value={editForm.image || ""}
              onChange={(e) => {
                setEditForm({ ...editForm, image: e.target.value });
                setImagePreview(e.target.value);
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Категория</FormLabel>
            <Select
              value={editForm.category || ""}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            >
              <option value="">Выберите категорию</option>
              <option value="mugs">Кружки</option>
              <option value="bowls">Миски</option>
              <option value="vases">Вазы</option>
              <option value="plates">Тарелки</option>
              <option value="sculptures">Скульптуры</option>
              <option value="other">Другое</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Статус наличия</FormLabel>
            <Select
              value={editForm.status || "in_stock"}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  status: e.target.value as "in_stock" | "preorder" | "out_of_stock",
                })
              }
            >
              <option value="in_stock">В наличии</option>
              <option value="preorder">Предзаказ</option>
              <option value="out_of_stock">Нет в наличии</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Описание</FormLabel>
            <Textarea
              rows={4}
              value={editForm.description || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Вес (например, "300 Г")</FormLabel>
            <Input
              placeholder="300 Г"
              value={editForm.weight || ""}
              onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Габариты (например, "20 × 20 × 2 СМ")</FormLabel>
            <Input
              placeholder="20 × 20 × 2 СМ"
              value={editForm.dimensions || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, dimensions: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Уход</FormLabel>
            <Textarea
              rows={3}
              placeholder="Можно мыть в посудомоечной машине..."
              value={editForm.care || ""}
              onChange={(e) => setEditForm({ ...editForm, care: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Состав</FormLabel>
            <Input
              placeholder="Полуфарфор, пищевые глазури"
              value={editForm.materials || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, materials: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Дополнительная информация</FormLabel>
            <Textarea
              rows={4}
              placeholder="Любая дополнительная информация о товаре..."
              value={editForm.additionalInfo || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, additionalInfo: e.target.value })
              }
            />
          </FormControl>
        </VStack>
      </Grid>

      <HStack spacing={4} mt={8}>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleSave}
          isLoading={isSaving}
          loadingText="Сохранение..."
        >
          Сохранить изменения
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => router.push("/admin")}
        >
          Отмена
        </Button>
      </HStack>
    </Container>
  );
}