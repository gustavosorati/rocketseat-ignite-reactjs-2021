import { Swiper } from 'swiper/react';
import { SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ImageSlide } from './Slide';

type SlideDataProps  = {
  imgs?: string[];
}


export function Slider({imgs}: SlideDataProps) {

  SwiperCore.use([Navigation, Pagination]);
  return (
    <Swiper
      navigation={true}
      className="mySwiper"
      spaceBetween={30}
      pagination={{
        clickable: true
      }}
      style={{
        width:'100%',
        maxHeight: '480px'
      }}
    >

      {imgs && imgs.map((image, index) => (
        <SwiperSlide key={index}>
          <ImageSlide img={image}  />
        </SwiperSlide>
      ))}
      
    </Swiper>
  );
};