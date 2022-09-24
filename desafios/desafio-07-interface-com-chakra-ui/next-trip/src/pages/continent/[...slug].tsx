import { GetStaticPaths, GetStaticProps } from "next";
import { ContinentData } from "../../types/continent";
import { api } from "../../api/api";
import { Flex, Heading } from "@chakra-ui/react";
import Banner from "../../components/ContinentPost/Banner";
import Header from "../../components/Header";
import { Descricao } from "../../components/ContinentPost/Descricao";
import Cities from "../../components/ContinentPost/Cities";
import { ParsedUrlQuery } from 'querystring';

interface Params extends ParsedUrlQuery {
  id: string,
}

export default function(continent: ContinentData){
  return (
    <Flex direction={"column"} >
      <Header />
      <Banner title={continent.title} banner={continent.banner} />

      <Flex direction={"column"} maxW="1280px" m="auto">
        
        <Descricao description={continent.description} info={continent.info} />
        
        <Heading fontSize={["3xl", "3xl", "4xl", "4xl"]} mb={["8", "8", "16"]} px="1rem" fontWeight="500">Cidades + 100</Heading>     

        <Cities cities={continent.cities}/> 
      </Flex>

    </Flex>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params! as Params;

  const response = await api.get<ContinentData>(String(slug));
  
  return {
    props: {
      ...response.data
    }
  }
}
