import { useToggle } from '@/hooks/useToggle';

import { css } from '../../../styled-system/css';
import CommentWriteModal from '../modal/CommentWriteModal';
import SnsController from './sns/SnsController';
import SnsHeader from './sns/SnsHeader';
import SnsMain from './sns/SnsMain';

interface IProps {
  data?: ISnsDetail | null;
  snsId: number;
  setSnsId: (value: number) => void;
  prevSnsId: number;
  nextSnsId: number;
  getSnsDetail: () => void;
}

const Sns = ({
  data,
  prevSnsId,
  nextSnsId,
  snsId,
  setSnsId,
  getSnsDetail,
}: IProps) => {
  const { value: isOpenCommentModal, handleToggle: handleToggleCommentModal } =
    useToggle(false);

  return (
    <div className={snsStyles.container}>
      {isOpenCommentModal && (
        <CommentWriteModal onClose={handleToggleCommentModal} snsId={snsId} />
      )}
      <SnsHeader
        profileUrl={data?.profileUrl || ''}
        nickname={data?.nickname || ''}
        memberId={data?.writerId || 0}
        isFollow={data?.isFollowed || false}
        handleOpenCommentModal={handleToggleCommentModal}
        getSnsDetail={getSnsDetail}
      />
      <SnsMain title={data?.title || ''} content={data?.content || ''} />
      <SnsController
        prevSnsId={prevSnsId}
        nextSnsId={nextSnsId}
        setSnsId={setSnsId}
      />
    </div>
  );
};

export default Sns;

export const snsStyles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
  }),
};
