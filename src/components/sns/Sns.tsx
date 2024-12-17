import { useToggle } from '@/hooks/useToggle';

import { css } from '../../../styled-system/css';
import CommentWriteModal from '../modal/CommentWriteModal';
import SnsController from './sns/SnsController';
import SnsHeader from './sns/SnsHeader';
import SnsMain from './sns/SnsMain';

interface IProps {
  data?: ISnsDetail | null;
  prevSnsId: number;
  nextSnsId: number;
  currentSnsId: number;
  refetchGetSnsDetail: () => void;
}

const Sns = ({
  data,
  prevSnsId,
  nextSnsId,
  currentSnsId,
  refetchGetSnsDetail,
}: IProps) => {
  const { isOpen: isOpenCommentModal, handleToggle: handleToggleCommentModal } =
    useToggle(false);

  return (
    <div className={snsStyles.container}>
      {isOpenCommentModal && (
        <CommentWriteModal
          onClose={handleToggleCommentModal}
          currentSnsId={currentSnsId}
        />
      )}
      <SnsHeader
        profileUrl={data?.profileUrl || ''}
        nickname={data?.nickname || ''}
        memberId={data?.writerId || 0}
        isFollow={data?.isFollowed || false}
        handleOpenCommentModal={handleToggleCommentModal}
        refetchGetSnsDetail={refetchGetSnsDetail}
      />
      <SnsMain title={data?.title || ''} content={data?.content || ''} />
      <SnsController prevSnsId={prevSnsId} nextSnsId={nextSnsId} />
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
