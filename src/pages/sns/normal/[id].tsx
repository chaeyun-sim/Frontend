import { useRouter } from 'next/router';
import { useState } from 'react';

import LatestSnsList from '@/components/sns/LatestSnsList';
import Sns from '@/components/sns/Sns';
import SnsList from '@/components/sns/SnsList';
import {
  useGetLatestSnsList,
  useGetSnsDetail,
  useGetSnsList,
} from '@/hooks/queries/sns';

import { css, cx } from '../../../../styled-system/css';

const SnsNormalPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const snsId = Number(id);

  const [prevSnsId, setPrevSnsId] = useState(0);
  const [nextSnsId, setNextSnsId] = useState(0);

  const { data: lastestSnsList } = useGetLatestSnsList();
  const { data: snsList } = useGetSnsList();
  const { data: snsDetail } = useGetSnsDetail({
    snsId: snsId || snsList?.[0]?.postId,
    snsList,
    setPrevSnsId,
    setNextSnsId,
  });

  return (
    <div
      className={cx(
        snsPageStyles.page_container,
        snsPageStyles.normal_page_container
      )}
    >
      <div className={snsPageStyles.width_620}>
        <LatestSnsList list={lastestSnsList} />
      </div>
      <div className={snsPageStyles.main_container}>
        <div className={snsPageStyles.width_620}>
          <Sns
            data={snsDetail}
            prevSnsId={prevSnsId}
            nextSnsId={nextSnsId}
            currentSnsId={snsId}
          />
        </div>
        <div className={snsPageStyles.aside_container}>
          <SnsList list={snsList} currentSnsId={snsId} />
        </div>
      </div>
    </div>
  );
};

export default SnsNormalPage;

export const snsPageStyles = {
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
