import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function(){
  return (
    <Flex w="100%" maxW="1240px" mx="auto" mb={["5", "10"]} h={["250px", "450px"]}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 5000,

        }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <Flex
            w="100%"
            h="100%"
            align="center"
            justify="center"
            direction="column"
            bgImage={"/asia.jpg"}
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="cover"
            textAlign="center"
          >
            <Link href="/continent/asia">
              <a>
                <Heading fontSize={["3xl", "4xl", "5xl"]} fontWeight="bold" color="gray.100">Asia</Heading>
                <Text fontSize={["0.8rem", "xl", "2xl"]} fontWeight="bold" color="gray.300" mt={["2", "4"]}>O continente do outro lado do mundo.</Text>
              </a>
            </Link>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>
    </Flex>
  )
}