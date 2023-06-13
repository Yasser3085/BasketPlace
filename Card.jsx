import React, { useState } from "react";
import { Box, Flex, Image, chakra, Button } from "@chakra-ui/react";

export default function Card(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <Flex
      _dark={{ bg: "#1A202C" }}
      p={40}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        rounded="lg"
        shadow="md"
        bg="white"
        _dark={{ bg: "gray.700", border: "0.5px solid black" }}
        maxW="2xl"
      >
        <Box
          onClick={toggleExpansion}
          roundedTop="lg"
          w="full"
          h={64}
          position="relative"
          cursor="pointer"
        >
          <Image
            roundedTop="lg"
            w="full"
            h="full"
            fit="cover"
            src={props.Src}
            alt="Article"
          />
        </Box>

        <Box p={6}>
          <Box>
            <chakra.h1
              display="block"
              color="gray.800"
              _dark={{ color: "white" }}
              fontWeight="bold"
              fontSize="2xl"
              mt={2}
            >
              {props.name}
            </chakra.h1>
            <chakra.p
              mt={2}
              fontSize="sm"
              color="gray.600"
              _dark={{ color: "gray.200" }}
            >
              {props.title}
            </chakra.p>
          </Box>

          {expanded && (
            <Box mt={4}>
              <chakra.p fontSize="sm" color="gray.200">
                {props.description}
              </chakra.p>
            </Box>
          )}

          <Box mt={4}>
            <Flex alignItems="center" justifyContent="space-between">
              <Button size="sm" colorScheme="black" variant="outline">
                <p>Reserve for:</p> {props.price}
              </Button>
              {!expanded ? (
                <Button colorScheme="teal" variant="outline" onClick={toggleExpansion}>
                  Discover More
                </Button>
              ) : (
                <Button colorScheme="teal" variant="outline" onClick={toggleExpansion}>
                  Show Less
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
