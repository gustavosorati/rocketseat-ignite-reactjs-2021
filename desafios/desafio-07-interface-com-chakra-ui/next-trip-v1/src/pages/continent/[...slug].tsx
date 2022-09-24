import { Box, Container, Flex, Grid, Heading, Icon, Image, SimpleGrid, Stack, Text, Tooltip, useBreakpointValue, Wrap } from '@chakra-ui/react'
import { Header } from '../../components/Header'
import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from '../../api/api';
import { useRouter } from 'next/router';
import { FiInfo } from 'react-icons/fi';

type ContinentDataProps = {
  id: string;
  title: string;
  banner: string;
  description: string;
  info: {
  amountCountries: string;
  amountLanguages: string;
  amountCities: string;
  };
  cities: {
    city: string;
    country: string;
    flag: string;
    picture: string;
  }[]
}

export default function(props : ContinentDataProps) {
  const router = useRouter();

  console.log(router)
  return (
    <>
      <Header />

      {/* Banner */}
      <Box
        w="100%"
        h={["175px", "500px"]}
        backgroundImage={`url(${props.banner})`}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        mb={["6", "10"]}
      >
        <Flex
          h="100%"
          align={["center", null, null, "flex-end"]}
          justify={["center", null, null, "inherit"]}
          maxW={"1920px"}
          w="100%"
          m="0 auto"
          p="16"
        >
          <Text
            fontSize={["2xl", "5xl"]}
            fontWeight={"bold"}
            letterSpacing={"1px"}
            color={"white"}>{props.title}</Text>
        </Flex>
      </Box>

      <Box as="section" p="8" w="100%" maxWidth="1920px" m="0 auto">
        <Stack spacing="8">
          {/* Card Info */}
          <SimpleGrid columns={[1, null, 2]} p="8" spacing={"8"}>
            <Container
              m="0"
              p="0"
              fontSize={["1rem", "1.5rem"]}
              lineHeight={["2rem"]}
              textAlign="justify"
            >
              {props.description}
            </Container>
          
            <SimpleGrid columns={3}>
              <Box>
                <Heading color="yellow.500" fontSize={["4xl", null, "6xl","8xl"]}>{props.info.amountCountries}</Heading>
                <Text as="span" fontSize={["2xl", null, "3xl", "4xl"]} fontWeight="700">países</Text>
              </Box>

              <Box>
                <Heading color="yellow.500" fontSize={["4xl", null, "6xl", "8xl"]}>{props.info.amountLanguages}</Heading>
                <Text as="span" fontSize={["2xl", null, "3xl", "4xl"]} fontWeight="700">línguas</Text>
              </Box>

              <Box>
                <Heading color="yellow.500" fontSize={["4xl", null, "6xl", "8xl"]}>27</Heading>
                
                <Flex align="center" gap="2">
                  <Text fontSize={["2xl", null, "2xl", "4xl"]} fontWeight="bold">
                    cidades +100 
                  </Text>

                  <Tooltip hasArrow label='Conheça todas' bg='gray.100' color='black'>
                      <Box display="inline-block">
                        <Icon as={FiInfo} cursor="pointer" color="dark.info.100" fontSize="1rem"/>
                      </Box>
                  </Tooltip>
                </Flex>
                

                
              </Box>
            </SimpleGrid>
          </SimpleGrid>

          {/* Cards Cities */}
          <Heading fontSize={["3xl", null, "5xl"]} p="8" maxWidth="1920px" color="#47585B">
            Cidades + 100
          </Heading>

          <Flex wrap="wrap" gap={6} p="8">

            {props.cities.map((citie, index) => (

              <Box key={index} display="flex" flexDirection="column" width={"260px"} m="0 auto" borderRadius="8">
                <Image src={citie.picture} borderRadius="8px 8px 0 0" border="0" width="100%" h="173px" objectFit={"cover"} objectPosition={"center"}/>

                <SimpleGrid
                  flex="1"
                  columns={2}
                  borderX="1px"
                  borderBottom="1px"
                  borderColor="yellow.600"
                  p="8"
                  borderRadius="0 0 8px 8px"
                  alignItems="center"
                >
                  <Box>
                    <Heading color="#47585B" fontSize="20px" mb="2">{citie.city}</Heading>
                    <Text fontWeight="500" fontSize="1rem" color="gray.400">{citie.country}</Text>
                  </Box>
                  <Image src={citie.flag} borderRadius='full' w="30px" h="30px" alt={citie.country} justifySelf="end"/>
                </SimpleGrid>
              </Box>

            ))}
          </Flex>
        </Stack>    
      </Box>
    </>
  )
}


export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await api.get<ContinentDataProps>('1');

  return {
    props: {
      ...response.data
    }
  }
}