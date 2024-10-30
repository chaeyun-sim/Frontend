import Banner from '@/components/Banner';
import Icon from '@/components/common/Icon';
import StreamerCard from '@/components/MainPage/StreamerCard';
import { usePromotionStreamersList } from '@/hooks/queries/promotion';

import { css } from '../../styled-system/css';
import { flex, hstack } from '../../styled-system/patterns';

export default function Home() {
  const { data: streamerList, refetch } = usePromotionStreamersList();

  return (
    <div>
      <div className={styles.banner}>
        <Banner />
      </div>
      <div className={css({ position: 'relative' })}>
        <div className={styles.navigation}>
          <button>
            <Icon name="left" />
          </button>
          <span className={css({ textStyle: 'body4', color: 'gray.300' })}>
            <span className={css({ textStyle: 'body3', color: 'main.base' })}>
              1{' '}
            </span>
            / 10
          </span>
          <button>
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
};
