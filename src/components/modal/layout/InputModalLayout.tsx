import { useState } from 'react';

import { css } from '../../../../styled-system/css';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import Textarea from '../../common/Textarea';
import { ModalProps } from '../modal.interface';

interface IProps extends ModalProps {
  title: string;
  handleSubmit: (content: string) => void;
}

const InputModalLayout = ({ title, onClose, handleSubmit }: IProps) => {
  const [content, setContent] = useState('');

  return (
    <Modal onClose={onClose} className={css({ width: 600 })}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <Textarea value={content} setValue={setContent} rows={9} />
        <div className={styles.button_container}>
          <Button text="취소" variant="outlined" onClick={onClose} />
          <Button
            text="완료"
            disabled={!content}
            onClick={() => handleSubmit(content)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default InputModalLayout;

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
