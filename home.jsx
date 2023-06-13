import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { chakra, Box, Stack, Flex, Button } from "@chakra-ui/react";

export default function Home() {
  return (
   
    
      <Flex
        bg="#edf3f8"
        _dark={{ bgImage: "https://wallpaperset.com/w/full/6/4/9/184324.jpg" , Object:'cover'  }  }
        
        p={50}
        h={"100vh"}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          justify="flex-end"
          bg="white"
          _dark={{ bg: "#24242400" }}
          w="full"
          alignItems={"center"}
        >
          <Box
            w={{ base: "full", md: "75%", lg: "50%" }}
            px={4}
            py={20}
            textAlign={{ base: "left", md: "center" }}
          >
            <chakra.span
              fontSize={{ base: "3xl", sm: "4xl" }}
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="shorter"
              color="gray.900"
              _dark={{ color: "gray.100" }}
              mb={6}
            >
              <chakra.span display="block">Ready to Play Basket Ball ?</chakra.span>
              <chakra.span
                display="block"
                color="brand.600"
                _dark={{ color: "gray.500" }}
              >
                Reserve your Court today.
              </chakra.span>
            </chakra.span>
            <Stack
              justifyContent={{ base: "left", md: "center" }}
              direction={{ base: "column", sm: "row" }}
              spacing={2}
              mt={2}
            >
              <Box display="inline-flex" rounded="md" shadow="md">
                <Link to="/start">
                  <Button
                    w="full"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    px={5}
                    py={3}
                    border="solid transparent"
                    fontWeight="bold"
                    rounded="md"
                    _light={{
                      color: "white",
                    }}
                    bg="brand.600"
                    _dark={{ bg: "teal" }}
                    _hover={{
                      bg: "brand.700",
                      _dark: { bg: "brand.600" },
                    }}
                  >
                    Get started
                  </Button>
                </Link>
              </Box>
              <Box ml={3} display="inline-flex" rounded="md" shadow="md">
                <Button
                  w="full"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  px={5}
                  py={3}
                  border="solid transparent"
                  fontWeight="bold"
                  rounded="md"
                  color="black"
                  bg="white"
                  _hover={{
                    bg: "brand.50",
                  }}
                >
                  Learn more
                </Button>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Flex>
  
  );
}
