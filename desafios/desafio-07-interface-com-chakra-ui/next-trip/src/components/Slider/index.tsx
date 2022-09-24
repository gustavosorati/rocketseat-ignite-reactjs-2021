import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

type SliderContinentData = {
  continents: {
    id: string;
    title: string;
    banner: string;
    minDescription?: string;
  }[]
}

export default function({continents}: SliderContinentData){
  console.log(continents)

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
        
        {continents.map(continent => (
          <SwiperSlide key={continent.id}>
            <Flex
              w="100%"
              h="100%"
              align="center"
              justify="center"
              direction="column"
              bgImage={`url(${continent.banner})`}
              bgRepeat="no-repeat"
              bgSize="cover"
              bgPosition={["100% 50%"]}
              textAlign="center"
            >
              <Link href={`/continent/${continent.id}`}>
                <a>
                  <Heading fontSize={["3xl", "4xl", "5xl"]} fontWeight="bold" color="gray.100">{continent.title}</Heading>
                  <Text fontSize={["0.8rem", "xl", "2xl"]} fontWeight="bold" color="gray.100" mt={["2", "4"]}>{continent.minDescription}</Text>
                </a>
              </Link>
            </Flex>
          </SwiperSlide>



        ))}
      </Swiper>
    </Flex>
  )
}