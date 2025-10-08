import { Box, Image, Text, VStack, Badge, Button, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

type PotteryCardProps = {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    status: "in_stock" | "preorder" | "out_of_stock";
  };
  onViewDetails?: () => void;
  onDelete?: (id: string) => void;
};

export function PotteryCardSkeleton() {
  return (
    <Box
      fontFamily="Inter, -apple-system, sans-serif"
      bg="white"
      overflow="hidden"
    >
      <Skeleton height="300px" bg="#f7f5f3" />
      <VStack align="start" spacing={3} p={5}>
        <SkeletonText noOfLines={2} spacing={2} width="80%" />
        <Skeleton height="24px" width="100px" />
      </VStack>
    </Box>
  );
}

export default function PotteryCard({ item, onViewDetails, onDelete }: PotteryCardProps) {
  const getStatusConfig = () => {
    switch (item.status) {
      case "in_stock":
        return {
          text: "В наличии",
          bg: "rgba(155, 165, 148, 0.15)",
          color: "#5a6652",
        };
      case "preorder":
        return {
          text: "Предзаказ",
          bg: "rgba(196, 164, 132, 0.15)",
          color: "#8a7358",
        };
      case "out_of_stock":
        return {
          text: "Нет в наличии",
          bg: "rgba(150, 150, 150, 0.15)",
          color: "#666",
        };
      default:
        return { text: "", bg: "", color: "" };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <Box
      fontFamily="Inter, -apple-system, sans-serif"
      position="relative"
      overflow="hidden"
      cursor="pointer"
      transition="opacity 0.2s ease"
      onClick={onViewDetails}
      bg="white"
      _hover={{ opacity: 0.85 }}
    >
      {/* Image Container */}
      <Box
        position="relative"
        overflow="hidden"
        height="300px"
        bg="#f7f5f3"
      >
        <Image
          src={item.image}
          alt={item.name}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>

      {/* Content */}
      <VStack align="start" spacing={3} p={5}>
        <Text
          fontWeight="400"
          fontSize="lg"
          color="#1a1a1a"
          letterSpacing="-0.01em"
          lineHeight="1.3"
          minHeight="56px"
          noOfLines={2}
        >
          {item.name}
        </Text>
        
        <HStack justify="space-between" width="100%" align="center" spacing={2}>
          <Text
            fontWeight="500"
            fontSize="xl"
            color="#5a6652"
            letterSpacing="-0.02em"
            flexShrink={0}
          >
            {item.price.toFixed(2)} ₽
          </Text>
          
          <Badge
            fontSize="xs"
            fontWeight="400"
            px={3}
            py={1}
            bg={statusConfig.bg}
            color={statusConfig.color}
            textTransform="none"
            letterSpacing="0.02em"
            flexShrink={0}
            whiteSpace="nowrap"
          >
            {statusConfig.text}
          </Badge>
        </HStack>
      </VStack>

      {/* Delete Button */}
      {onDelete && (
        <Box px={5} pb={5}>
          <Button
            size="sm"
            width="100%"
            bg="rgba(220, 38, 38, 0.08)"
            color="#dc2626"
            fontWeight="400"
            fontSize="14px"
            transition="all 0.2s ease"
            _hover={{
              bg: "#dc2626",
              color: "white",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            Удалить
          </Button>
        </Box>
      )}
    </Box>
  );
}


