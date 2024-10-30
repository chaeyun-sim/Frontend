import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
  return (
    <Swiper className="mySwiper" style={{ width: '100%', height: '100%' }}>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
    </Swiper>
  );
};

export default Banner;
