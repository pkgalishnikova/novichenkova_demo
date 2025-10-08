// 

// components/grid.tsx
import { SimpleGrid, Text, Box } from "@chakra-ui/react";
import PotteryCard, { PotteryCardSkeleton } from "./card";

type PotteryItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  status: "in_stock" | "preorder" | "out_of_stock";
};

type Props = {
  isLoading: boolean;
  items?: PotteryItem[];
  emptyText?: string;
  overrideOnClickBehavior?: (item: PotteryItem) => void;
  showDelete?: boolean;
};

export default function Grid({
  isLoading,
  items = [],
  emptyText = "No pottery items found",
  overrideOnClickBehavior,
  showDelete = false,
}: Props) {
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (res.ok) {
        console.log("Deleted item", id);
        window.location.reload();
      } else {
        console.error("Failed to delete item");
      }
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
      spacing={6}
      w="100%"
      padding={2}
      my={5}
    >
      {isLoading ? (
        [...Array(8)].map((_, index) => (
          <PotteryCardSkeleton key={index} />
        ))
      ) : items && items.length > 0 ? (
        items.map((item) =>
          !overrideOnClickBehavior ? (
            <Box
              key={item.id}
              cursor="pointer"
              transition="opacity 0.2s"
              _hover={{ opacity: 0.85 }}
            >
              <PotteryCard
                item={item}
                onViewDetails={() => {
                  const url = showDelete
                    ? `/admin/item/${item.id}`
                    : `/pottery/item/${item.id}`;
                  window.location.href = url;
                }}
                onDelete={showDelete ? handleDelete : undefined}
              />
            </Box>
          ) : (
            <Box
              key={item.id}
              cursor="pointer"
              transition="opacity 0.2s"
              _hover={{ opacity: 0.85 }}
              onClick={() => overrideOnClickBehavior(item)}
            >
              <PotteryCard
                item={item}
                onDelete={showDelete ? handleDelete : undefined}
              />
            </Box>
          )
        )
      ) : (
        <Text
          gridColumn="1 / -1"
          textAlign="center"
          fontSize="lg"
          color="gray.500"
          py={10}
        >
          {emptyText}
        </Text>
      )}
    </SimpleGrid>
  );
}