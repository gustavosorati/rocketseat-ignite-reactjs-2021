import { Grid, GridItem } from "@chakra-ui/react"
import { Caracteristica } from "./Caracteristica"

type CaracteristicaProps = {
  icon: string;
  alt: string;
  text: string;
}

export function Caracteristicas() {

  return (
    <Grid
      templateColumns={["1fr 1fr", "1fr 1fr", "repeat(5, 1fr)"]}
      alignItems="center"
      justifyContent="center"
      mt={["10", "32"]}
      mx="auto"
      width="100%"
      maxW="1160px"
      gap={[1, 5]}
    >
      <GridItem>
        <Caracteristica icon="cocktail" alt="vida noturna" text="vida noturna"/>
      </GridItem>
      <GridItem>
        <Caracteristica icon="surf" alt="praia" text="praia"/>
      </GridItem>
      <GridItem>
        <Caracteristica icon="building" alt="moderno" text="moderno"/>
      </GridItem>
      <GridItem>
        <Caracteristica icon="museum" alt="clássico" text="clássico"/>
      </GridItem>
      <GridItem colSpan={[2, 2, 2, 1]}>
        <Caracteristica icon="earth" alt="e mais..." text="e mais..."/>
      </GridItem>
    </Grid>
  )
}