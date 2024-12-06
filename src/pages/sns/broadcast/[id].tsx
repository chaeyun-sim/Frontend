import { useParams } from 'next/navigation';
import { useState } from 'react';

import DailyMessageInput from '@/components/sns/DailyMessageInput';
import Sns from '@/components/sns/Sns';
import SnsList from '@/components/sns/SnsList';
import { useGetSnsDetail, useGetSnsList } from '@/hooks/queries/sns';

import { snsPageStyles } from '../normal/[id]';

const SnsBroadcastPage = () => {
  const snsId = Number(useParams()?.id);

  const [prevSnsId, setPrevSnsId] = useState(0);
  const [nextSnsId, setNextSnsId] = useState(0);

  const { data: snsList } = useGetSnsList();
  const { data: snsDetail } = useGetSnsDetail({
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

// TODO server-side redirect
