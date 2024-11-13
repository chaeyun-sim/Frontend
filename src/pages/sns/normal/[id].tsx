import { useParams } from 'next/navigation';
import { useState } from 'react';

import DailyMessageInput from '@/components/sns/DailyMessageInput';
import PostingFollowings from '@/components/sns/PostingFollowings';
import Sns from '@/components/sns/Sns';
import SnsList from '@/components/sns/SnsList';
import {
  useGetPostingFollowings,
  useGetSnsDetail,
  useGetSnsList,
} from '@/hooks/queries/sns';

import { css } from '../../../../styled-system/css';

const SnsNormalPage = () => {
  const snsId = Number(useParams()?.id);

  const [prevSnsId, setPrevSnsId] = useState(0);
  const [nextSnsId, setNextSnsId] = useState(0);

  const { data: postingFollwings } = useGetPostingFollowings();
  const { data: snsList } = useGetSnsList();
  const { data: snsDetail } = useGetSnsDetail({
    snsId,
    snsList,
    setPrevSnsId,
    setNextSnsId,
  });

  return (
    <div className={styles.page_container}>
      <PostingFollowings followings={postingFollwings} />
      <div className={styles.main_container}>
        <Sns
          data={snsDetail}
          prevSnsId={prevSnsId}
          nextSnsId={nextSnsId}
          currentSnsId={snsId}
        />
        <div className={styles.aside_container}>
          <DailyMessageInput />
          <SnsList list={snsList} currentSnsId={snsId} />
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
