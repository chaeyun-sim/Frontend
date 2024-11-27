import { useParams } from 'next/navigation';
import { useState } from 'react';

import PostingFollowings from '@/components/sns/PostingFollowings';
import Sns from '@/components/sns/Sns';
import SnsList from '@/components/sns/SnsList';
import {
  useGetPostingFollowings,
  useGetSnsDetail,
  useGetSnsList,
} from '@/hooks/queries/sns';

import { css, cx } from '../../../../styled-system/css';

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
    <div
      className={cx(snsStyles.page_container, snsStyles.normal_page_container)}
    >
      <div className={snsStyles.width_620}>
        <PostingFollowings followings={postingFollwings} />
      </div>
      <div className={snsStyles.main_container}>
        <div className={snsStyles.width_620}>
          <Sns
            data={snsDetail}
            prevSnsId={prevSnsId}
            nextSnsId={nextSnsId}
            currentSnsId={snsId}
          />
        </div>
        <div className={snsStyles.aside_container}>
          <SnsList list={snsList} currentSnsId={snsId} />
        </div>
      </div>
    </div>
  );
};

export default SnsNormalPage;

export const snsStyles = {
  page_container: css({
    padding: '40px 0',
    display: 'flex',
    gap: '20px',
  }),
  normal_page_container: css({ flexDirection: 'column' }),
  main_container: css({
    display: 'flex',
    alignItems: 'start',
    gap: '20px',
  }),
  aside_container: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }),
  width_620: css({
    minWidth: 620,
    maxWidth: 620,
  }),
};

// TODO server-side redirect
