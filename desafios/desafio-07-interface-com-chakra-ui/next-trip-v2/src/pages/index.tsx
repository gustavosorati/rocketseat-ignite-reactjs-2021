import { Flex, Heading } from "@chakra-ui/react";
import Banner from "../components/Banner";
import { Caracteristicas } from "../components/Caracteristicas";
import Header from "../components/Header";
import Separador from "../components/Separador";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <Flex direction={"column"}>
      <Header />
      <Banner />
      <Caracteristicas />
      <Separador />

      <Heading
        fontSize={["lg", "3xl", "4xl"]}
        fontWeight="700"
        textAlign="center"
        color="gray.700"
        mb={["5", "14"]}
      >
        Vamos nessa <br /> Escolha seu continente
      </Heading>

      <Slider />
    </Flex>
  )
}
