// // pages/pottery/item/[id].tsx (Public view - NO EDIT FUNCTIONALITY)
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import {
//   Container,
//   Box,
//   Image,
//   Heading,
//   Text,
//   Badge,
//   Button,
//   Grid,
//   GridItem,
//   VStack,
//   useToast,
//   Skeleton,
//   Divider,
// } from "@chakra-ui/react";

// type PotteryItem = {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
//   category: string;
//   status: "in_stock" | "preorder" | "out_of_stock";
//   weight?: string;
//   dimensions?: string;
//   care?: string;
//   materials?: string;
//   additionalInfo?: string;
// };

// export default function ItemDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const toast = useToast();
  
//   const [item, setItem] = useState<PotteryItem | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       loadItem();
//     }
//   }, [id]);

//   const loadItem = async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`/api/items/${id}`);
      
//       if (!res.ok) {
//         throw new Error("Failed to load item");
//       }
      
//       const data = await res.json();
//       setItem(data);
//     } catch (error) {
//       console.error("Error loading item:", error);
//       toast({
//         title: "Ошибка",
//         description: "Не удалось загрузить товар",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "in_stock":
//         return <Badge variant="subtle" fontSize="lg" px={3} py={1}>В наличии</Badge>;
//       case "preorder":
//         return <Badge variant="subtle" fontSize="lg" px={3} py={1}>Предзаказ</Badge>;
//       case "out_of_stock":
//         return <Badge variant="subtle" fontSize="lg" px={3} py={1}>Нет в наличии</Badge>;
//       default:
//         return null;
//     }
//   };

//   if (isLoading) {
//     return (
//       <Container maxW="container.xl" py={8}>
//         <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
//           <Skeleton height="500px" />
//           <VStack align="stretch" spacing={4}>
//             <Skeleton height="40px" />
//             <Skeleton height="30px" />
//             <Skeleton height="200px" />
//           </VStack>
//         </Grid>
//       </Container>
//     );
//   }

//   if (!item) {
//     return (
//       <Container maxW="container.xl" py={8}>
//         <Text>Товар не найден</Text>
//         <Button mt={4} onClick={() => router.push("/catalog")}>
//           Вернуться к каталогу
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container maxW="container.xl" py={8}>
//       <Button mb={4} onClick={() => router.back()}>
//         ← Назад
//       </Button>

//       <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
//         {/* Image */}
//         <GridItem>
//           <Image
//             src={item.image}
//             alt={item.name}
//             width="100%"
//             maxH="600px"
//             objectFit="cover"
//             borderRadius="lg"
//             boxShadow="lg"
//           />
//         </GridItem>

//         {/* Details */}
//         <GridItem>
//           <VStack align="stretch" spacing={4}>
//             {getStatusBadge(item.status)}

//             <Heading size="2xl">{item.name}</Heading>

//             <Text fontSize="3xl" fontWeight="bold">
//               {item.price.toFixed(2)}₽
//             </Text>

//             <Divider />

//             {item.description && (
//               <Box>
//                 <Text fontSize="md" color="gray.700" whiteSpace="pre-wrap">
//                   {item.description}
//                 </Text>
//               </Box>
//             )}

//             {item.weight && (
//               <Box>
//                 <Text fontWeight="bold" fontSize="sm" color="gray.500" mb={1}>
//                   ВЕС
//                 </Text>
//                 <Text fontSize="md">{item.weight}</Text>
//               </Box>
//             )}

//             {item.dimensions && (
//               <Box>
//                 <Text fontWeight="bold" fontSize="sm" color="gray.500" mb={1}>
//                   ГАБАРИТЫ
//                 </Text>
//                 <Text fontSize="md">{item.dimensions}</Text>
//               </Box>
//             )}

//             {item.care && (
//               <Box>
//                 <Text fontWeight="bold" fontSize="sm" color="gray.500" mb={1}>
//                   УХОД
//                 </Text>
//                 <Text fontSize="md" whiteSpace="pre-wrap">
//                   {item.care}
//                 </Text>
//               </Box>
//             )}

//             {item.materials && (
//               <Box>
//                 <Text fontWeight="bold" fontSize="sm" color="gray.500" mb={1}>
//                   СОСТАВ
//                 </Text>
//                 <Text fontSize="md">{item.materials}</Text>
//               </Box>
//             )}

//             {item.additionalInfo && (
//               <Box mt={4}>
//                 <Text fontSize="md" color="gray.700" whiteSpace="pre-wrap">
//                   {item.additionalInfo}
//                 </Text>
//               </Box>
//             )}

//             {item.category && (
//               <Box>
//                 <Badge colorScheme="purple" fontSize="sm">
//                   {item.category.toUpperCase()}
//                 </Badge>
//               </Box>
//             )}
//           </VStack>
//         </GridItem>
//       </Grid>
//     </Container>
//   );
// }
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  Grid,
  GridItem,
  VStack,
  useToast,
  Skeleton,
  SkeletonText,
  HStack,
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

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const [item, setItem] = useState<PotteryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadItem();
    }
  }, [id]);

  const loadItem = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/items/${id}`);
      if (!res.ok) {
        throw new Error("Failed to load item");
      }
      const data = await res.json();
      setItem(data);
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

  const getStatusConfig = (status: string) => {
    switch (status) {
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

  if (isLoading) {
    return (
      <Box fontFamily="Inter, -apple-system, sans-serif" bg="#fafafa" minH="100vh" py={16}>
        <Container maxW="1200px">
          <Skeleton height="40px" width="100px" mb={8} />
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
            <Skeleton height="600px" bg="#f7f5f3" />
            <VStack align="stretch" spacing={6}>
              <Skeleton height="30px" width="120px" />
              <Skeleton height="48px" />
              <Skeleton height="36px" width="150px" />
              <SkeletonText noOfLines={6} spacing={4} mt={8} />
            </VStack>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (!item) {
    return (
      <Box fontFamily="Inter, -apple-system, sans-serif" bg="#fafafa" minH="100vh" py={16}>
        <Container maxW="1200px">
          <VStack spacing={6} py={20}>
            <Text fontSize="xl" color="#666" fontWeight="300">
              Товар не найден
            </Text>
            <Button
              bg="white"
              color="#1a1a1a"
              fontWeight="400"
              px={8}
              py={6}
              transition="opacity 0.2s"
              _hover={{ opacity: 0.7 }}
              onClick={() => router.push("/catalog")}
            >
              Вернуться к каталогу
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  const statusConfig = getStatusConfig(item.status);

  return (
    <Box fontFamily="Inter, -apple-system, sans-serif" bg="#fafafa" minH="100vh" py={16}>
      <Container maxW="1200px">
        {/* Back Button */}
        <Button
          mb={12}
          bg="transparent"
          color="#1a1a1a"
          fontWeight="400"
          fontSize="16px"
          px={0}
          transition="opacity 0.2s"
          _hover={{ opacity: 0.6, bg: "transparent" }}
          onClick={() => router.back()}
        >
          ← Назад
        </Button>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
          {/* Image */}
          <GridItem>
            <Box bg="white" overflow="hidden">
              <Image
                src={item.image}
                alt={item.name}
                width="100%"
                height="100%"
                maxH="700px"
                objectFit="cover"
              />
            </Box>
          </GridItem>

          {/* Details */}
          <GridItem>
            <VStack align="stretch" spacing={6}>
              {/* Title and Price Row */}
              <Box>
                <Heading
                  size="2xl"
                  fontWeight="300"
                  letterSpacing="-0.02em"
                  color="#1a1a1a"
                  mb={4}
                >
                  {item.name}
                </Heading>
                <HStack spacing={4} align="center">
                  <Text fontSize="3xl" fontWeight="500" color="#5a6652" letterSpacing="-0.02em">
                    {item.price.toFixed(2)} ₽
                  </Text>
                  <Badge
                    fontSize="sm"
                    fontWeight="400"
                    px={4}
                    py={2}
                    bg={statusConfig.bg}
                    color={statusConfig.color}
                    textTransform="none"
                    letterSpacing="0.02em"
                  >
                    {statusConfig.text}
                  </Badge>
                </HStack>
              </Box>

              {/* Description */}
              {item.description && (
                <Box pt={4}>
                  <Text
                    fontSize="16px"
                    color="#666"
                    lineHeight="1.7"
                    whiteSpace="pre-wrap"
                  >
                    {item.description}
                  </Text>
                </Box>
              )}

              {/* Specifications */}
              <VStack align="stretch" spacing={5} pt={6}>
                {item.weight && (
                  <Box>
                    <Text
                      fontSize="11px"
                      fontWeight="500"
                      letterSpacing="0.1em"
                      color="#999"
                      mb={2}
                    >
                      ВЕС
                    </Text>
                    <Text fontSize="15px" color="#1a1a1a">
                      {item.weight}
                    </Text>
                  </Box>
                )}

                {item.dimensions && (
                  <Box>
                    <Text
                      fontSize="11px"
                      fontWeight="500"
                      letterSpacing="0.1em"
                      color="#999"
                      mb={2}
                    >
                      ГАБАРИТЫ
                    </Text>
                    <Text fontSize="15px" color="#1a1a1a">
                      {item.dimensions}
                    </Text>
                  </Box>
                )}

                {item.materials && (
                  <Box>
                    <Text
                      fontSize="11px"
                      fontWeight="500"
                      letterSpacing="0.1em"
                      color="#999"
                      mb={2}
                    >
                      СОСТАВ
                    </Text>
                    <Text fontSize="15px" color="#1a1a1a">
                      {item.materials}
                    </Text>
                  </Box>
                )}

                {item.care && (
                  <Box>
                    <Text
                      fontSize="11px"
                      fontWeight="500"
                      letterSpacing="0.1em"
                      color="#999"
                      mb={2}
                    >
                      УХОД
                    </Text>
                    <Text fontSize="15px" color="#1a1a1a" lineHeight="1.6" whiteSpace="pre-wrap">
                      {item.care}
                    </Text>
                  </Box>
                )}
              </VStack>

              {/* Additional Info */}
              {item.additionalInfo && (
                <Box pt={4}>
                  <Text fontSize="15px" color="#666" lineHeight="1.7" whiteSpace="pre-wrap">
                    {item.additionalInfo}
                  </Text>
                </Box>
              )}

              {/* Category Badge */}
              {item.category && (
                <Box pt={2}>
                  <Badge
                    bg="rgba(0, 0, 0, 0.05)"
                    color="#666"
                    fontSize="xs"
                    fontWeight="400"
                    px={3}
                    py={1}
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                  >
                    {item.category}
                  </Badge>
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}