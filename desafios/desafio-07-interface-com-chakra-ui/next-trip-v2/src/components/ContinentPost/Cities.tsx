import { Box, Heading, Image, Text, Flex } from "@chakra-ui/react"

type CitiesProps = {
  cities: {
    city: string;
    country: string;
    flag: string;
    picture: string;
  }[];
}

export default function Cities({cities}: CitiesProps){

  
  return (
    <Flex direction="row" wrap="wrap" gap={6} px="1rem" align="stretch" justify={["center", "center", "space-between"]}>
      {cities.map((citie, index) => (
        
      <Box key={index} display="flex" flexDirection="column" width={["260px"]} borderRadius="8">
        <Image src={citie.picture} borderRadius="8px 8px 0 0" border="0" width="100%" h="173px" objectFit={"cover"} objectPosition={"center"}/>
        
        <Flex
          align="center"
          gap={"1rem"}
          borderX="1px"
          borderBottom="1px"
          borderColor="yellow.600"
          p="8"
          borderRadius="0 0 8px 8px"
          alignItems="center"
          h="100%"
        >
          <Box>
            <Heading color="#47585B" fontSize="20px" mb="2">{citie.city}</Heading>
            <Text fontWeight="500" fontSize="1rem" color="gray.400">{citie.country}</Text>
          </Box>
          
          <Flex justify="flex-end" align="center" w="100%" h="100%">
            <Image src={citie.flag} borderRadius='full' w="30px" h="30px" alt={citie.country} />
          </Flex>
        </Flex>
      </Box>

      ))}
    </Flex>
  )
}