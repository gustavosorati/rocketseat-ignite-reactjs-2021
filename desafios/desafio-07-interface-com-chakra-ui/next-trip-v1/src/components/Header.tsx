import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Flex, Icon, Image, Link as ChrakraLink, Wrap } from "@chakra-ui/react";
import {IoChevronBackOutline} from 'react-icons/io5'

export function Header() {
  const router = useRouter();

  return (
    <Box as="header" bg={"white"}>
      <Flex
        align={"center"}
        justify={"center"}
        maxW="1400px"
        h="100px"
        m="0 auto"
      > 
        {/* Defini se o botão de voltar deve estar vísivel ou não */}
        {router.asPath !== "/" && (
          <Link href="/" passHref>
            <ChrakraLink mt="5px">
              <Icon as={IoChevronBackOutline} fontSize={"3xl"} />
            </ChrakraLink>
          </Link>
        )}

        <Link href="/" passHref>
          <ChrakraLink m="auto">
            <Image src="/logo.svg" alt="Next Trip" height={"12"} />
          </ChrakraLink>
        </Link>
      </Flex>
    </Box>
  )
}