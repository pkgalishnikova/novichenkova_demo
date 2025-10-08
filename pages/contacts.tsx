import { Box, Container, Flex, Stack, Heading, Button, Text, VStack } from "@chakra-ui/react";
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
          <>
            <Box py={24} textAlign="center" bg="#f7f5f3">
              <VStack spacing={6} animation="fadeInUp 0.8s ease-out">
                <Heading size="2xl" fontWeight="300">Свяжитесь с нами</Heading>
                <Text color="#666" maxW="600px" mx="auto" fontSize="16px">
                  Готовы ответить на ваши вопросы, обсудить индивидуальные заказы или рассказать больше о наших изделиях. 
                  Будем рады новому знакомству.
                </Text>
              </VStack>
            </Box>

            <Container maxW="1000px" py={24}>
              <VStack align="stretch" spacing={10}>
                {[
                  { title: 'АДРЕС МАСТЕРСКОЙ', content: 'г. Рига, Латвия\nул. Мастеров, 15\n(посещение по предварительной записи)' },
                  { title: 'КОНТАКТЫ', content: '+371 25 123 456\nhello@novichenkova.lv' },
                  { title: 'СОЦИАЛЬНЫЕ СЕТИ', content: 'Instagram: @novichenkova_ceramics\nTelegram: @novichenkova' },
                  { title: 'ЧАСЫ РАБОТЫ', content: 'Пн-Пт: 10:00 - 18:00\nСб: 11:00 - 16:00\nВс: выходной' }
                ].map((item, idx) => (
                  <Box key={idx} className="scroll-reveal">
                    <Text
                      fontSize="14px"
                      textTransform="uppercase"
                      letterSpacing="1px"
                      color="#999"
                      mb={2}
                    >
                      {item.title}
                    </Text>
                    <Text fontSize="16px" color="#1a1a1a" whiteSpace="pre-line" lineHeight="1.5">
                      {item.content}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Container>
          </>
        )}
export default Home;