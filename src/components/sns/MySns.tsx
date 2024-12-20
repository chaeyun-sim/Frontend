import { useToggle } from '@/hooks/useToggle';

import SnsHeader from './mysns/SnsHeader';
import SnsMain from './mysns/SnsMain';
import { snsStyles } from './Sns';
import DeletePostModal from '../modal/DeletePostModal';

interface IProps {
  data?: ISnsDetail | null;
}

const MySns = ({ data }: IProps) => {
  const { value: isOpenDeleteModal, handleToggle: handleToggleDeleteModal } =
    useToggle(false);

  return (
    <div className={snsStyles.container}>
      {isOpenDeleteModal && (
        <DeletePostModal
          onClose={handleToggleDeleteModal}
          postId={data?.postId || 0}
        />
      )}
      <SnsHeader
        profileUrl={data?.profileUrl || ''}
        nickname={data?.nickname || ''}
        handleOpenDeleteModal={handleToggleDeleteModal}
      />
      <SnsMain title={data?.title || ''} content={data?.content || ''} />
    </div>
  );
};

export default MySns;
