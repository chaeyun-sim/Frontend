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
      className={styles.container}
      loop
      onSlideChange={(e) => onSetSwiperIndex(e.realIndex)}
      onSwiper={(e) => onSetSwiper(e)}
    >
      {data?.map((item) => (
        <SwiperSlide key={item.url} style={{ backgroundColor: item.bgColor }}>
          <div className={styles.inner_slide}>
            <Image
              src={item.url}
              alt="banner"
              width={940}
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
  container: css({
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  }),
  inner_slide: css({
    width: '940px',
    margin: '0 auto',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  banner_img: css({
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
