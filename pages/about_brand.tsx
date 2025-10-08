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
import { NextPage } from "next";
import React, { useState, useEffect } from 'react';

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
    <><Container maxW="1200px" py={24}>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={20} alignItems="center">
        <GridItem>
          <VStack align="start" spacing={6} animation="fadeInUp 0.8s ease-out">
            <Heading size="2xl" fontWeight="300">О бренде</Heading>
            <Text color="#666" lineHeight="1.7">
              Novichenkova — это современная интерпретация традиционного керамического мастерства.
              Мы создаем изделия, которые отражают философию осознанного потребления и ценность ручной работы.
            </Text>
            <Text color="#666" lineHeight="1.7">
              Каждое изделие проходит полный цикл создания в нашей мастерской — от идеи до финишного обжига.
              Мы используем только качественные материалы и проверенные временем техники.
            </Text>
            <Text color="#666" lineHeight="1.7">
              Наша цель — создавать керамику, которая прослужит долгие годы и будет радовать своих владельцев каждый день.
            </Text>
          </VStack>
        </GridItem>
        <GridItem>
          <Box w="100%" h="500px" bg="#f7f5f3" borderRadius="4px" />
        </GridItem>
      </Grid>
    </Container><Box bg="#f7f5f3" py={24}>
        <Container maxW="800px">
          <VStack spacing={12} textAlign="center">
            <Heading size="xl" fontWeight="300">Наши принципы</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={16}>
  {[
    {
      title: 'Качество',
      desc: 'Используем только проверенные материалы и техники, которые гарантируют долговечность и безопасность наших изделий.',
    },
    {
      title: 'Эстетика',
      desc: 'Создаем формы, которые радуют глаз и гармонично вписываются в современные интерьеры.',
    },
    {
      title: 'Устойчивость',
      desc: 'Ответственно относимся к окружающей среде, создавая изделия, которые служат долго и не теряют актуальности.',
    },
  ].map((principle, idx) => (
    <VStack
      key={idx}
      className="scroll-reveal"
      opacity={revealed.has(idx) ? 1 : 0}
      transform={revealed.has(idx) ? "translateY(0)" : "translateY(30px)"}
      transition="all 0.8s ease"
      spacing={4}
    >
      <Box w="48px" h="48px" bg="#c4a484" borderRadius="full" opacity={0.8} />
      <Heading size="md" fontWeight="400">{principle.title}</Heading>
      <Text fontSize="14px" color="#666" lineHeight="1.6">{principle.desc}</Text>
    </VStack>
  ))}
</SimpleGrid>

          </VStack>
        </Container>
      </Box></>

  )
}
export default Home;