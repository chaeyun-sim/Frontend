import { useState } from 'react';
import { SwiperClass } from 'swiper/react';

import Banner from '@/components/Banner';
import Icon from '@/components/common/Icon';
import StreamerCard from '@/components/MainPage/StreamerCard';
import {
  useGetPromotionBannerData,
  usePromotionStreamersList,
} from '@/hooks/queries/promotion';

import { css } from '../../styled-system/css';
import { flex, hstack } from '../../styled-system/patterns';

import 'swiper/css';

export default function Home() {
  const { data: streamerList, refetch } = usePromotionStreamersList();
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  const handlePrevious = () => swiper?.slidePrev();
  const handleNext = () => swiper?.slideNext();

  const { data: bannerList } = useGetPromotionBannerData();

  return (
    <div>
      <div className={styles.banner}>
        <Banner
          onSetSwiperIndex={setSwiperIndex}
          onSetSwiper={setSwiper}
          data={bannerList!}
        />
      </div>
      <div className={css({ position: 'relative' })}>
        <div className={styles.navigation}>
          <button onClick={handlePrevious}>
            <Icon name="left" />
          </button>
          <span className={styles.current_slide}>
            <span className={css({ textStyle: 'body3', color: 'main.base' })}>
              {swiperIndex + 1}{' '}
            </span>
            / {bannerList?.length}
          </span>
          <button onClick={handleNext}>
            <Icon name="right" />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.content_head}>
            <strong>추천 방송인 목록</strong>
            <button
              className={styles.refresh_wrapper}
              onClick={() => refetch()}
            >
              <Icon name="reverse" />
              새로 고침
            </button>
          </div>
          <div className={styles.cards_wrapper}>
            {streamerList?.map((streamer) => (
              <StreamerCard key={streamer.name} {...streamer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  banner: css({
    width: '100vw',
    height: '400px',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    background: '#FFD37D',
  }),
  content: css({
    paddingTop: '121px',
  }),
  content_head: flex({
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > strong': {
      textStyle: 'body1',
      color: 'gray.900',
    },
  }),
  refresh_wrapper: flex({
    borderRadius: '20px',
    borderColor: 'gray.100',
    borderWidth: '1px',
    padding: '6px 12px',
    textStyle: 'button2',
    gap: '4px',
  }),
  cards_wrapper: flex({
    marginTop: '28px',
    gap: '20px',
  }),
  navigation: hstack({
    position: 'absolute',
    top: '20px',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  current_slide: css({
    textStyle: 'body4',
    color: 'gray.300',
    width: '40px',
    textAlign: 'right',
  }),
};
