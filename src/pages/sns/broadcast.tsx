import { useState } from 'react';

import DailyMessageInput from '@/components/sns/DailyMessageInput';
import Sns from '@/components/sns/Sns';
import SnsList from '@/components/sns/SnsList';
import { useGetSnsDetail } from '@/hooks/queries/sns';
import { useGetStreamerSnsList } from '@/hooks/queries/streamer';

import { snsPageStyles } from './normal';

const SnsBroadcastPage = () => {
  const [prevSnsId, setPrevSnsId] = useState(0);
  const [nextSnsId, setNextSnsId] = useState(0);

  const { data: snsList } = useGetStreamerSnsList();

  const snsId = snsList?.[0]?.postId || 0;
  const { data: snsDetail, refetch: refetchGetSnsDetail } = useGetSnsDetail({
    snsId,
    snsList,
    setPrevSnsId,
    setNextSnsId,
  });

  return (
    <div className={snsPageStyles.page_container}>
      <div className={snsPageStyles.width_620}>
        <Sns
          data={snsDetail}
          prevSnsId={prevSnsId}
          nextSnsId={nextSnsId}
          currentSnsId={snsId}
          refetchGetSnsDetail={refetchGetSnsDetail}
        />
      </div>
      <div className={snsPageStyles.aside_container}>
        <DailyMessageInput />
        <SnsList list={snsList} currentSnsId={snsId} />
      </div>
    </div>
  );
};

export default SnsBroadcastPage;
