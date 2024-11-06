import PostingFollowings from '@/components/sns/PostingFollowings';
import Sns from '@/components/sns/Sns';
import SnsList from '@/components/sns/SnsList';
import TodayWordsInput from '@/components/sns/TodaywordsInput';
import {
  POSTING_FOLLOWINGS_SAMPLE_DATA,
  SNS_LIST_SAMPLE_DATE,
  SNS_SAMPLE_DATA,
} from '@/constants/sampleData';

import { css } from '../../../styled-system/css';

const SnsNormalPage = () => {
  // TODO. GET 포스팅한 팔로잉 리스트
  // TODO. GET SNS
  // TODO. GET SNS 리스트

  return (
    <div className={styles.page_container}>
      <PostingFollowings followings={POSTING_FOLLOWINGS_SAMPLE_DATA} />
      <div className={styles.main_container}>
        <Sns data={SNS_SAMPLE_DATA} />
        <div className={styles.aside_container}>
          <TodayWordsInput />
          <SnsList list={SNS_LIST_SAMPLE_DATE} />
        </div>
      </div>
    </div>
  );
};

export default SnsNormalPage;

const styles = {
  page_container: css({
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }),
  main_container: css({
    display: 'flex',
    gap: '20px',
  }),
  aside_container: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }),
};
