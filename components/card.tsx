// components/card.tsx
import { Box, Image, Text, VStack, Badge } from "@chakra-ui/react";

type PotteryCardProps = {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
    inStock?: boolean;
  };
  onViewDetails?: () => void;
};

export default function PotteryCard({ item, onViewDetails }: PotteryCardProps) {
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={4}
      onClick={onViewDetails}
    >
      <Image 
        src={item.image} 
        alt={item.name}
        height="200px"
        width="100%"
        objectFit="cover"
        borderRadius="md"
      />
      <VStack align="start" mt={3} spacing={1}>
        <Text fontWeight="bold" fontSize="lg">{item.name}</Text>
        <Text color="gray.600" fontSize="sm" noOfLines={2}>
          {item.description}
        </Text>
        <Badge colorScheme={item.inStock ? "green" : "red"}>
          {item.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
        <Text fontWeight="semibold" color="blue.600" fontSize="xl">
          ${item.price}
        </Text>
      </VStack>
    </Box>
  );
}