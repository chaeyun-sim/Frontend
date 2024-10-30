import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { css } from '../../styled-system/css';
import { vstack } from '../../styled-system/patterns';

interface IProps {
  onSetSwiperIndex: (value: number) => void;
  onSetSwiper: (value: SwiperClass) => void;
  data: { url: string; bgColor: string }[];
}

const Banner = ({ onSetSwiperIndex, onSetSwiper, data }: IProps) => {
  return (
    <Swiper
      className="mySwiper"
      style={{ width: '100%', height: '100%' }}
      loop
      onSlideChange={(e) => onSetSwiperIndex(e.realIndex)}
      onSwiper={(e) => onSetSwiper(e)}
    >
      {data?.map((item) => (
        <SwiperSlide key={item.url} style={{ backgroundColor: item.bgColor }}>
          <div className={styles.inner_slide}>
            <div className={styles.banner_text_box}>
              <h1>먹고 먹고 또 먹고</h1>
              <span>매주 금요일마다 찾아오는 먹방쇼</span>
            </div>
            <Image
              src={item.url}
              alt="banner"
              width={460}
              height={400}
              quality={100}
              priority
              className={styles.banner_img}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;

const styles = {
  inner_slide: css({
    maxWidth: '940px',
    height: '100%',
    margin: '0 auto',
    position: 'relative',
  }),
  banner_img: css({
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    objectFit: 'cover',
  }),
  banner_text_box: vstack({
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '& > h1': {
      fontWeight: 'semibold',
      fontSize: '52px',
      color: 'gray.900',
    },
    '& > span': {
      fontSize: '32px',
      fontWeight: 'regular',
      color: 'gray.500',
      marginTop: '10px',
    },
  }),
};
