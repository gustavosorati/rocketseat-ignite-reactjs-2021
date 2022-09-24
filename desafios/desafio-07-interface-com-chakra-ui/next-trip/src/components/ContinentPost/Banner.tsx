import { Flex, Text } from "@chakra-ui/react";

type BannerProps = {
  banner: string;
  title: string
}

export default function Banner({banner, title}: BannerProps) {
  return (
    <Flex
      align={["center", "center", "flex-end"]}
      justify={["center", "center", "flex-start"]}
      w="100%"
      h={["225px", "350px", "500px"]}
      bgImage={`url(${banner})`}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      bgPosition={["100% 50%"]}
      p={["0", "0", "20"]}
    >
      <Text
        fontSize={["md", "3xl", "5xl"]}
        fontWeight={"bold"}
        letterSpacing={"1px"}
        color={"white"}
      >
        {title}
      </Text>
    </Flex>
  )
}