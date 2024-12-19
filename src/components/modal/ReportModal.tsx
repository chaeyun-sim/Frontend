import { useState } from 'react';

import { usePostReportPost } from '@/hooks/queries/sns';

import { ModalProps } from './modal.interface';
import { css } from '../../../styled-system/css';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Textarea from '../common/Textarea';

interface IProps extends ModalProps {
  snsId: number;
}

const ReportPostModal = ({ onClose, snsId }: IProps) => {
  const [reason, setReason] = useState('');

  const { mutate: postReportPost } = usePostReportPost({ onClose });

  const handleSubmit = () => {
    postReportPost({ postId: snsId, reason });
  };

  return (
    <Modal onClose={onClose} className={css({ width: 600 })}>
      <div className={styles.container}>
        <h2 className={styles.title}>신고하기</h2>
        <Textarea value={reason} setValue={setReason} rows={9} />
        <div className={styles.button_container}>
          <Button text="취소" variant="outlined" onClick={onClose} />
          <Button text="완료" disabled={!reason} onClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
};

export default ReportPostModal;

const styles = {
  container: css({
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  }),
  title: css({
    textStyle: 'body3',
  }),
  button_container: css({
    display: 'flex',
    gap: 8,
    '& > button': {
      width: '100%',
    },
  }),
};
