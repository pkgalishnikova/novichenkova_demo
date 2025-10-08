import { Box, Flex, Heading, Link, Text, Container, HStack, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      maxW="2000px"
      m="auto"
      py="10px"
      px="40px"
      bg="rgba(250, 250, 250, 0.95)"
      borderBottom="1px solid"
      borderColor="gray.100"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Container maxW="1600px">
        <Flex justify="space-between" align="center" py={6} px={10}>
          <Image
  src="/logo.png"
  width={51}
  height={51}
  alt="Logo"
  style={{ transform: 'scale(1.05)' }} // 5% bigger
/>


          <HStack spacing={12}>
            {/* Home */}
            <Link
              as={NextLink}
              href="/"
              onClick={() => handleTabChange("home")}
              color={activeTab === "home" ? "#f4621fff" : "#f4621fff"}
              fontSize="14px"
              fontWeight="400"
              letterSpacing="0.3px"
              textDecoration="none"
              position="relative"
              pb={2}
              borderBottom={activeTab === "home" ? "1px solid #c4a484" : "none"}
              _hover={{ color: "#1a1a1a" }}
              transition="all 0.3s ease"
            >
              <Text>главная</Text>
            </Link>

            {/* Catalog */}
            <Link
              as={NextLink}
              href="/catalog"
              onClick={() => handleTabChange("catalog")}
              color={activeTab === "catalog" ? "#f4621fff" : "#f4621fff"}
              fontSize="14px"
              fontWeight="400"
              letterSpacing="0.3px"
              textDecoration="none"
              position="relative"
              pb={2}
              borderBottom={activeTab === "catalog" ? "1px solid #c4a484" : "none"}
              _hover={{ color: "#1a1a1a" }}
              transition="all 0.3s ease"
            >
              <Text>каталог</Text>
            </Link>

            {/* About Brand */}
            <Link
              as={NextLink}
              href="/about_brand"
              onClick={() => handleTabChange("about_brand")}
              color={activeTab === "about_brand" ? "#f4621fff" : "#f4621fff"}
              fontSize="14px"
              fontWeight="400"
              letterSpacing="0.3px"
              textDecoration="none"
              position="relative"
              pb={2}
              borderBottom={activeTab === "about_brand" ? "1px solid #c4a484" : "none"}
              _hover={{ color: "#1a1a1a" }}
              transition="all 0.3s ease"
            >
              <Text>о бренде</Text>
            </Link>

            {/* Contacts */}
            <Link
              as={NextLink}
              href="/contacts"
              onClick={() => handleTabChange("contacts")}
              color={activeTab === "contacts" ? "#f4621fff" : "#f4621fff"}
              fontSize="14px"
              fontWeight="400"
              letterSpacing="0.3px"
              textDecoration="none"
              position="relative"
              pb={2}
              borderBottom={activeTab === "contacts" ? "1px solid #c4a484" : "none"}
              _hover={{ color: "#1a1a1a" }}
              transition="all 0.3s ease"
            >
              <Text>контакты</Text>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
