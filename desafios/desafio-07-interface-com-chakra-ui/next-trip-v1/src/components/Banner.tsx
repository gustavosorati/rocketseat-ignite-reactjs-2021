import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";

export function Banner() {
  return (
    <Flex
    display={"flex"}
    alignItems={"center"}
    backgroundImage={"/bg-heading.png"}
    backgroundRepeat={"no-repeat"}
    backgroundSize={"cover"}
    h="335px"
    maxHeight={"335px"}
  >
    <Box maxW={"1920px"} w="100%" m="0 auto" position={"relative"}>
      <Box maxWidth="520px">
        <Heading color={"white"} fontWeight={"normal"} mb="8">
          5 Continentes, <br /> infinitas possibilidades.
        </Heading>
        <Text color={"white"} fontSize={"1.25rem"}>Chegou a hora de tirar do papel a viagem que você sempre sonhou. </Text>
      </Box>

      <Image src="/airplane.png" position={"absolute"} bottom="-120px" right={"0"}/>
    </Box>
  </Flex>
  )
}