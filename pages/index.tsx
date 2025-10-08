import Image from "next/image";
import { NextPage } from "next";
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    Link,
    Button,
    Grid,
    GridItem,
    VStack,
    HStack,
    SimpleGrid,
} from '@chakra-ui/react';

const Home: NextPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [revealed, setRevealed] = useState(new Set<number>());

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const elements = document.querySelectorAll('.scroll-reveal');
            elements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 50) {
                    setRevealed(prev => new Set([...prev, index]));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setRevealed(new Set());
    };

    return (
        <Box fontFamily="Inter, -apple-system, sans-serif" bg="#fafafa" color="#1a1a1a" minH="100vh">
            <Box py={32} textAlign="center" bgGradient="linear(135deg, #fafafa 0%, #f7f5f3 100%)">
                <Container maxW="1200px">
                    <VStack spacing={6} animation="fadeInUp 0.8s ease-out">
                        <Heading
                            fontSize={{ base: '2.5rem', md: '3.5rem', lg: '4.5rem' }}
                            fontWeight="300"
                            letterSpacing="-0.03em"
                            lineHeight="1.1"
                        >
                            Современная керамика<br />ручной работы
                        </Heading>
                        <Text fontSize="18px" color="#666" maxW="600px" mx="auto">
                            Создаем изделия, которые объединяют традиционное мастерство с современным дизайном.
                            Каждое изделие — уникальное произведение искусства для вашего дома.
                        </Text>
                    </VStack>
                </Container>
            </Box>

            <Container maxW="1600px" py={20}>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={0.5} mb={32}>
                    {[
                        {
                            title: "Интерьерная керамика",
                            desc: "Вазы, кашпо, декоративные объекты — изделия, которые создают атмосферу и подчеркивают стиль вашего пространства.",
                            gradient:
                                "linear(135deg, rgba(196, 164, 132, 0.6), rgba(155, 165, 148, 0.6))",
                            image: "/interior.jpeg", 
                        },
                        {
                            title: "Столовая посуда",
                            desc: "Тарелки, чашки, миски — функциональная керамика для ежедневного использования, созданная с вниманием к деталям.",
                            gradient:
                                "linear(135deg, rgba(155, 165, 148, 0.6), rgba(196, 164, 132, 0.6))",
                            image: "/dishes.jpeg",
                        },
                    ].map((collection, idx) => (
                        <Box
                            key={idx}
                            className="scroll-reveal"
                            position="relative"
                            minH="500px"
                            overflow="hidden"
                            cursor="pointer"
                            transition="transform 0.4s ease"
                            opacity={revealed.has(idx) ? 1 : 0}
                            transform={revealed.has(idx) ? "translateY(0)" : "translateY(30px)"}
                            _hover={{ transform: "scale(1.02)" }}
                            role="group"
                        >
                            {/* Background Image */}
                            <Box
                                as="img"
                                src={collection.image}
                                alt={collection.title}
                                position="absolute"
                                inset={0}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                transition="all 0.4s ease"
                                _groupHover={{ filter: "blur(4px) brightness(0.9)" }}
                            />

                            {/* Gradient Overlay */}
                            <Box
                                position="absolute"
                                inset={0}
                                bgGradient={collection.gradient}
                                opacity={0.4}
                                transition="opacity 0.3s ease"
                                _groupHover={{ opacity: 0.6 }}
                            />

                            {/* Title & Description */}
                            <Box position="absolute" bottom={10} left={10} color="white" zIndex={10}>
                                <Heading
                                    size="lg"
                                    fontWeight="300"
                                    mb={2}
                                    textShadow="0 2px 8px rgba(0,0,0,0.3)"
                                >
                                    {collection.title}
                                </Heading>
                                <Text
                                    fontSize="14px"
                                    maxW="300px"
                                    textShadow="0 1px 4px rgba(0,0,0,0.3)"
                                >
                                    {collection.desc}
                                </Text>
                            </Box>

                            {/* Hover Text Overlay */}
                            <Box
                                position="absolute"
                                inset={0}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="white"
                                fontSize="xl"
                                fontWeight="500"
                                opacity={0}
                                transition="opacity 0.3s ease"
                                zIndex={20}
                                _groupHover={{ opacity: 1 }}
                            >
                                <Text size="lg"
                                    fontWeight="300"
                                    mb={2}>Посмотреть коллекцию</Text>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>


            <Box bg="#f7f5f3" py={24}>
                <Container maxW="1400px">
                    <Grid
                        templateColumns={{ base: "1fr", lg: "1fr 2fr" }}
                        gap={20}
                        alignItems="center"
                    >
                        <GridItem
                            className="scroll-reveal"
                            opacity={revealed.has(2) ? 1 : 0} // ✅ changed 20 → 2
                            transform={revealed.has(2) ? "translateY(0)" : "translateY(30px)"}
                            transition="all 0.8s ease"
                        >
                            <VStack align="start" spacing={6}>
                                <Heading size="xl" fontWeight="300">
                                    Философия мастерства
                                </Heading>
                                <Text color="#666" fontSize="16px" lineHeight="1.6">
                                    В каждом изделии мы стремимся достичь идеального баланса между
                                    формой и функцией. Наша керамика рождается из понимания того, как
                                    важны детали в создании атмосферы дома.
                                </Text>
                                <Text color="#666" fontSize="16px" lineHeight="1.6">
                                    Простота линий, качество исполнения и внимание к текстурам —
                                    основные принципы нашей работы.
                                </Text>
                            </VStack>
                        </GridItem>

                        {/* Right Grid Column */}
                        <GridItem>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                                {[
                                    {
                                        title: "Минималистичные формы",
                                        desc: "Чистые линии и простые формы, которые не теряют актуальности",
                                    },
                                    {
                                        title: "Природные текстуры",
                                        desc: "Натуральные оттенки и тактильные поверхности, приятные на ощупь",
                                    },
                                    {
                                        title: "Функциональность",
                                        desc: "Каждое изделие продумано для комфортного ежедневного использования",
                                    },
                                    {
                                        title: "Уникальность",
                                        desc: "Ручная работа делает каждое изделие неповторимым",
                                    },
                                ].map((feature, idx) => (
                                    <Box
                                        key={idx}
                                        className="scroll-reveal"
                                        bg="white"
                                        borderRadius="8px"
                                        overflow="hidden"
                                        boxShadow="sm"
                                        transition="all 0.3s ease"
                                        opacity={revealed.has(3 + idx) ? 1 : 0} // ✅ changed 21+idx → 3+idx
                                        transform={
                                            revealed.has(3 + idx)
                                                ? "translateY(0)"
                                                : "translateY(30px)"
                                        }
                                        _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
                                    >
                                        <Box w="100%" h="200px" bg="#e9e7e5" />
                                        <Box p={5}>
                                            <Heading size="sm" fontWeight="400" mb={2}>
                                                {feature.title}
                                            </Heading>
                                            <Text fontSize="14px" color="#777" lineHeight="1.4">
                                                {feature.desc}
                                            </Text>
                                        </Box>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </GridItem>
                    </Grid>
                </Container>
            </Box>



            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </Box>
    );
};

export default Home;