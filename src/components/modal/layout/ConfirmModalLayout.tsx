import Modal from '@/components/common/Modal';

import { css } from '../../../../styled-system/css';
import Button from '../../common/Button';
import Icon from '../../common/Icon';

interface IProps {
  title: string;
  icon: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModalLayout = ({ title, icon, onClose, onConfirm }: IProps) => {
  return (
    <Modal onClose={onClose} className={css({ width: 300 })}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <Icon name={icon} />
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.button_container}>
          <Button text="취소" variant="outlined" onClick={onClose} />
          <Button text="확인" onClick={onConfirm} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModalLayout;

const styles = {
  container: css({
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  }),
  title_container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  }),
  title: css({ textStyle: 'body3' }),
  button_container: css({
    display: 'flex',
    gap: 8,
    '& > button': {
      width: '100%',
    },
  }),
};
