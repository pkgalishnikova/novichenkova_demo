import { Box, Container, Flex, Stack, Heading, Button, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <Container maxW={'7xl'}>
            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'red.400',
                                zIndex: -1,
                            }}>
                            Welcome to the
                        </Text>
                        <br />
                        <Text as={'span'} color={'red.400'}>
                            Pottery Store
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        Discover unique, handcrafted pottery from artisanal creators around the world.
                    </Text>
                    <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
                        <Button
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                            colorScheme={'red'}
                            bg={'red.400'}
                            _hover={{ bg: 'red.500' }}>
                            Get started
                        </Button>
                        <Button
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}>
                            Learn more
                        </Button>
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Box
                        position={'relative'}
                        height={'300px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}>
                        {/* <Image
                            alt={'Hero Image'}
                            layout={'fill'}
                            objectFit={'cover'}
                            src={'/hero-image.jpg'}
                        /> */}
                    </Box>
                </Flex>
            </Stack>

            <Stack spacing={{ base: 10 }} py={10}>
                <Heading textAlign="center">Features</Heading>
                <Flex direction={{ base: 'column', md: 'row' }} justify="space-around" align="center">
                    <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md" m={2}>
                        <Heading fontSize="xl">Handcrafted Quality</Heading>
                        <Text mt={4}>Each piece is uniquely crafted by skilled artisans.</Text>
                        <Box mt={4} borderRadius="md" overflow="hidden">
                            <Image
                                src="/path-to-image-1.jpg"
                                alt="Feature 1 image"
                                width={500}
                                height={300}
                            />
                        </Box>
                    </Box>
                    <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md" m={2}>
                        <Heading fontSize="xl">Worldwide Shipping</Heading>
                        <Text mt={4}>We deliver your favorite pottery right to your doorstep.</Text>
                        <Box mt={4} borderRadius="md" overflow="hidden">
                            {/* <Image
                                src="/path-to-image-2.jpg"
                                alt="Feature 2 image"
                                width={500}
                                height={300}
                            /> */}
                        </Box>
                    </Box>
                </Flex>
            </Stack>
        </Container>
    );
};

export default Home;