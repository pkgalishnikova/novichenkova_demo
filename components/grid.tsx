import { SimpleGrid, Skeleton, Text, Box } from "@chakra-ui/react";
import PotteryCard from "./card"; // Adjust import path as needed

type PotteryItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  inStock?: boolean;
};

type Props = {
  isLoading: boolean;
  items?: PotteryItem[];
  emptyText?: string;
  overrideOnClickBehavior?: (item: PotteryItem) => void;
};

export default function Grid({
  isLoading,
  items = [],
  emptyText = "No pottery items found",
  overrideOnClickBehavior,
}: Props) {
  return (
    <SimpleGrid 
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
      spacing={6} 
      w="100%" 
      padding={4}
      my={5}
    >
      {isLoading ? (
        [...Array(8)].map((_, index) => (
          <Skeleton 
            key={index} 
            height="350px" 
            width="100%" 
            borderRadius="lg"
          />
        ))
      ) : items && items.length > 0 ? (
        items.map((item) =>
          !overrideOnClickBehavior ? (
            <Box
              key={item.id}
              cursor="pointer"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <PotteryCard 
                item={item}
                onViewDetails={() => {
                  // Navigate to item detail page
                  window.location.href = `/pottery/item/${item.id}`;
                }}
              />
            </Box>
          ) : (
            <Box
              key={item.id}
              cursor="pointer"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => overrideOnClickBehavior(item)}
            >
              <PotteryCard item={item} />
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
