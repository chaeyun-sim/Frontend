import { usePostReportPost } from '@/hooks/queries/sns';

import InputModalLayout from './layout/InputModalLayout';
import { ModalProps } from './modal.interface';

interface IProps extends ModalProps {
  snsId: number;
}

const ReportPostModal = ({ onClose, snsId }: IProps) => {
  const { mutate: postReportPost } = usePostReportPost({ onClose });

  const handleSubmit = (reason: string) => {
    postReportPost({ postId: snsId, reason });
  };

  return (
    <InputModalLayout
      title="신고하기"
      onClose={onClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default ReportPostModal;
