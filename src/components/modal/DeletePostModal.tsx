import { useDeleteSns } from '@/hooks/queries/sns';

import ConfirmModalLayout from './layout/ConfirmModalLayout';
import { ModalProps } from './modal.interface';

interface IProps extends ModalProps {
  postId: number;
}

const DeletePostModal = ({ postId, onClose }: IProps) => {
  const { mutate: deleteSns } = useDeleteSns({ onClose });

  const handleSubmit = () => {
    deleteSns(postId);
  };

  return (
    <ConfirmModalLayout
      title="게시물을 삭제하시겠습니까?"
      icon="warning"
      onClose={onClose}
      onConfirm={handleSubmit}
    />
  );
};

export default DeletePostModal;
