import { useParams } from 'next/navigation';
import { useState } from 'react';

import { usePostComment } from '@/hooks/queries/sns';

import { css } from '../../../styled-system/css';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Textarea from '../common/Textarea';

interface IProps {
  onClose: () => void;
  currentSnsId: number;
}

const CommentWriteModal = ({ onClose, currentSnsId }: IProps) => {
  const [content, setContent] = useState('');

  const { mutate: postComment } = usePostComment({ onClose });

  const handleSubmit = () => {
    if (!content) return;

    postComment({ postId: currentSnsId, content });
  };

  return (
    <Modal onClose={onClose} className={css({ width: 600 })}>
      <div className={styles.container}>
        <h2 className={styles.title}>댓글 작성</h2>
        <Textarea value={content} setValue={setContent} rows={9} />
        <div className={styles.button_container}>
          <Button text="취소" variant="outlined" onClick={onClose} />
          <Button text="완료" disabled={!content} onClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
};

export default CommentWriteModal;

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
