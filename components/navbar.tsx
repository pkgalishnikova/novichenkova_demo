import { Avatar, Box, Flex, Heading, Link, Text, position } from "@chakra-ui/react";
import NextLink from 'next/link';

export function Navbar() {

    return (
        <Box
            maxW={"2000px"}
            m={"auto"}
            py={"10px"}
            px={"40px"}
            bg={"#ededed"}
            borderBottom={"1px solid"}
            borderColor={"gray.300"}
            position="sticky"
            top="0"
            zIndex="1000"
        >
            <Flex justifyContent={"space-between"} alignItems={"center"} height="60px"> {/* Fixed height */}
                <Flex alignItems={"center"} gap={"40px"} position="relative">
                    <Box position="fixed" left="20px" top="20px" zIndex="1100">
                    </Box>

                    {/* <Box ml="60px">
                        <Link as={NextLink} href='/'>
                            <Heading>NFT Marketplace</Heading>
                        </Link>
                    </Box> */}
                    <Link as={NextLink} href='/'>
                        <Text>главная</Text>
                    </Link>
                    <Link as={NextLink} href='/catalog'>
                        <Text>каталог</Text>
                    </Link>
                    <Link as={NextLink} href='/about_brand'>
                        <Text>о бренде</Text>
                    </Link>
                    <Link as={NextLink} href='/contacts'>
                        <Text>контакты</Text>
                    </Link>
                </Flex>

                <Flex alignItems={"center"} height="100%">
                    {/* <ConnectWallet/>
                    {address && (
                        <Link as={NextLink} href={`/profile/${address}`}>
                            <Avatar src='https://bit.ly/broken-link' ml={"20px"}/>
                        </Link>
                    )} */}

                </Flex>
            </Flex>
        </Box>
    )
}