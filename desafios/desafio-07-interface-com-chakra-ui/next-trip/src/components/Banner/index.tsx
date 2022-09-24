import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";

export default function Banner() {
  return (
    <Flex
      w="100%"
      h={["163px", "250px", "335px"]}
      bgImage={"/bg-heading.jpg"}
      bgPosition={["100% 10%", "100% 20%", "100% 30%"]}
      bgSize={"cover"}
    >

      <Flex
        justify={["center", "space-between"]}
        align="center"
        w="100%"
        mx="auto"
        px={["4", "10", "15", "20", "36"]}
      >
        <Box>
          <Heading color="gray.100" fontSize={["xl", "2xl"]} fontWeight="500" mb="5">
            5 Continentes, <br /> infinitas possibilidades.
          </Heading>
          <Text color={"white"} fontSize={[".8rem", "xl"]} maxW={["100%", "100%", "550px"]}>
            Chegou a hora de tirar do papel a viagem que você sempre sonhou. 
          </Text>
        </Box>

        <Image 
          src="/airplane.png"
          w={["300px", "300px", "300px", "430px"]}
          visibility={["hidden", "hidden", "visible"]}
          transform="translateY(48px)"
          ml="8"
          display={["none", "none", "block"]}
          alt="Avião amarelo voando com algumas nuvens ao redor"
        />
      </Flex>
  </Flex>
  )
}