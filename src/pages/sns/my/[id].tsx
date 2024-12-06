import { useParams } from 'next/navigation';

import Comments from '@/components/sns/Comments';
import MySns from '@/components/sns/MySns';
import Viewers from '@/components/sns/Viewers';
import { useGetSnsDetail } from '@/hooks/queries/sns';

import { snsPageStyles } from '../normal/[id]';

const SnsMyPage = () => {
  const snsId = Number(useParams()?.id);

  const { data: snsDetail } = useGetSnsDetail({ snsId });

  return (
    <div className={snsPageStyles.page_container}>
      <div className={snsPageStyles.width_620}>
        <MySns data={snsDetail} />
      </div>
      <div className={snsPageStyles.aside_container}>
        <Viewers list={[]} />
        <Comments list={[]} />
      </div>
    </div>
  );
};

export default SnsMyPage;

// TODO server-side redirect
