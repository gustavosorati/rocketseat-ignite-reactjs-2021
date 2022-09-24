import { Image } from "@chakra-ui/react";
import { SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type ImageSlideDataProps = {
  img?: string;
}


export function ImageSlide({img}: ImageSlideDataProps) {
  SwiperCore.use([Navigation, Pagination]);

  return (
    <Image src={img} />
  )
}