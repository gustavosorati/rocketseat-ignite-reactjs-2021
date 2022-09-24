import { Flex, Grid, Icon, Link as ChrakraLink, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {IoChevronBackOutline} from "react-icons/io5";


export default function Header() {
  const router = useRouter();

  return (
    <Flex as="header" bg="white" w="100%" mx="auto" px="1rem" h={["50px", "100px"]} align="center" justify="center">
      <Grid
        h="100%"
        m="auto"
        w="100%"
        maxWidth="1280px"
        templateColumns={"repeat(3, 1fr)"}
        alignItems="center"
        justifyContent="center"
        >
          {router.asPath !== "/" && (
          <Link href="/" passHref>
            <ChrakraLink mt="5px">
              <Icon as={IoChevronBackOutline} fontSize={"xl"} />
            </ChrakraLink>
          </Link>
          )}

          <Link href="/" passHref>
            <ChrakraLink m="auto" gridColumn={["2"]}>
              <Image src="/logo.svg" alt="Next Trip" w={["81px", '184px']} />
            </ChrakraLink>
          </Link>
          
      </Grid>
    </Flex>
  )
}