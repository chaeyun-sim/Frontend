import { usePostComment } from '@/hooks/queries/sns';

import InputModalLayout from './InputModalLayout';
import { ModalProps } from './modal.interface';

interface IProps extends ModalProps {
  snsId: number;
}

const CommentWriteModal = ({ onClose, snsId }: IProps) => {
  const { mutate: postComment } = usePostComment({ onClose });

  const handleSubmit = (content: string) => {
    postComment({ postId: snsId, content });
  };

  return (
    <InputModalLayout
      title="댓글 작성"
      onClose={onClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default CommentWriteModal;
