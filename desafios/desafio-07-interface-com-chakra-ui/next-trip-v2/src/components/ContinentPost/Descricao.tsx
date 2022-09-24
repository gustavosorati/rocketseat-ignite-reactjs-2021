import { SimpleGrid, Container, Box, Heading, Flex, Tooltip, Icon, Text } from "@chakra-ui/react";
import { FiInfo } from 'react-icons/fi';

type DescricaoProps = {
  description: string;
  info: {
    amountCountries: string;
    amountLanguages: string;
    amountCities: string;
  }
}

export function Descricao({description, info}: DescricaoProps) {
  return (
    <SimpleGrid columns={[1, 1, 2]} py="16" spacing={["4", "4", "8"]} px="1rem">
      
      <Container
        m="0"
        p="0"
        fontSize={["sm", "lg", "2xl"]}
        lineHeight={["2rem"]}
        textAlign="justify"
      >
        {description}
      </Container>
          
      <SimpleGrid columns={3} spacing="4">
        <Flex direction="column" align={["flex-start", "flex-start", "center"]} justify="center">
          <Heading color="yellow.400" fontSize={["2.5rem", "2.5rem", "2.5rem", "3.5rem"]}>{info.amountCountries}</Heading>
          <Text as="span" fontSize={["1.2rem", "1.2rem", "1.5rem"]} fontWeight="500">países</Text>
        </Flex>

        <Flex direction="column" align={["flex-start", "flex-start", "center"]} justify="center">
          <Heading color="yellow.400" fontSize={["2.5rem", "2.5rem", "2.5rem", "3.5rem"]}>{info.amountLanguages}</Heading>
          <Text as="span" fontSize={["1.2rem", "1.2rem", "1.5rem"]} fontWeight="500">línguas</Text>
        </Flex>

        <Flex direction="column" align={["flex-start", "flex-start", "center"]} justify="center">
          <Heading color="yellow.400" fontSize={["2.5rem", "2.5rem", "2.5rem", "3.5rem"]}>{info.amountCities}</Heading>
                
          <Flex align="center" gap="2">
            <Text fontSize={["1rem", "1rem", "1.5rem"]} textAlign="center" fontWeight="500">
              cidades +100 
            </Text>

            <Tooltip hasArrow label='Search places' bg='gray.200' color='black'>
                <Box display="inline-block">
                  <Icon as={FiInfo} cursor="pointer" color="dark.info.100" fontSize="1rem"/>
                </Box>
            </Tooltip>
          </Flex>    
        </Flex>
      </SimpleGrid>
    </SimpleGrid>
  )
}