import { Grid, GridItem } from "@chakra-ui/react";
import dynamic from "next/dynamic";
// import Caracteristica from "./Caracteristica";

const Caracteristica = dynamic(() => import("./Caracteristica"));

export default function Caracteristicas() {
  return (
    <Grid
      templateColumns={["1fr 1fr","1fr 1fr","1fr 1fr","repeat(5, 1fr)"]}
      w="100%"
      justifyContent="space-between"
      alignContent="center"
      mt={["10","32"]}
      mx="auto"
      maxW="1160px"
      flexWrap="wrap"
      gap={[1,5]}
    >
    
      {typeof window !== 'undefined' && (
        <>
          <GridItem>
            <Caracteristica icon="cocktail" text="vida noturna" />
          </GridItem>
          <GridItem>
            <Caracteristica icon="surf" text="praia" />
          </GridItem>
          <GridItem>
            <Caracteristica icon="building" text="moderno" />
          </GridItem>
          <GridItem>
            <Caracteristica icon="museum" text="clássico" />
          </GridItem>
          <GridItem colSpan={[2, 2, 2, 1]}>
            <Caracteristica icon="earth" text="e mais..." />
          </GridItem>
        </>
      )}
    </Grid>

  )
}