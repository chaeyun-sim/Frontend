import { useRouter } from 'next/router';

import Comments from '@/components/sns/Comments';
import MySns from '@/components/sns/MySns';
import Viewers from '@/components/sns/Viewers';
import { useGetMySnsDetail } from '@/hooks/queries/sns';

import { snsPageStyles } from '../normal';

const SnsMyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const snsId = Number(id);

  const { data: detail } = useGetMySnsDetail({ snsId });

  return (
    <div className={snsPageStyles.page_container}>
      <div className={snsPageStyles.width_620}>
        <MySns data={detail?.postInfo} />
      </div>
      <div className={snsPageStyles.aside_container}>
        <Viewers list={detail?.readStreamersInfoList} />
        <Comments list={detail?.commentInfoList} />
      </div>
    </div>
  );
};

export default SnsMyPage;
