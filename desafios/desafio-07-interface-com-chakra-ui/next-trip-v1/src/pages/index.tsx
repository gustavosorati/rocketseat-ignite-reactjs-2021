import { Box, Center, Divider, Flex, Grid, Heading, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import type { NextPage } from 'next'
import 'swiper/css';

import { Header } from '../components/Header'
import { Slider } from '../components/Carousel/Slider';
import { Banner } from '../components/Banner';

const Home: NextPage = () => {
  return (
    <>

      <Header />
      
      {/* Banner */}
      <Banner />

      <Flex as="section" direction="column" w="100%" maxW={"1920px"} m="10rem auto">      

        <UnorderedList
            display={"grid"}
            gridTemplateColumns={"repeat(5, 1fr)"}
            gap="5rem"
            justifyItems="center"
            listStyleType={"none"}>
            <ListItem><Image src="/nightlife.svg" alt='nightlife'/></ListItem>
            <ListItem><Image src="/beach.svg" alt='nightlife'/></ListItem>
            <ListItem><Image src="/modern.svg" alt='nightlife'/></ListItem>
            <ListItem><Image src="/classic.svg" alt='nightlife'/></ListItem>
            <ListItem><Image src="/more.svg" alt='nightlife'/></ListItem>  
          </UnorderedList>

          <Center mt="8">
            <Divider w={24} mt="16" mb="16" bg={"#47585B"} h="1px" />
          </Center>
          
          <Center mb="8">
            <Text textAlign={"center"} fontSize="3xl" fontWeight={"semibold"} color={"gray.800"}>Vamos nessa
            <br />
            Escolha seu continente</Text>
          </Center>

          <Slider imgs={["/asia.jpg", "/oceania.jpg", "/southamerica.jpg"]}/>
      </Flex>
    </>
  )
}

export default Home
