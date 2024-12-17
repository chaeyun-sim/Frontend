import { ModalProps } from './modal.interface';
import { css } from '../../../styled-system/css';
import { center, flex } from '../../../styled-system/patterns';
import Button from '../common/Button';
import Icon from '../common/Icon';

const GoToStreamerModal = ({ onClose }: ModalProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.top_area}>
        <Icon name="warning" />
        <strong className={styles.title}>
          방송인 등업페이지로 이동하시겠습니까?
        </strong>
      </div>
      <div className={styles.buttons_area}>
        <Button
          text="취소"
          variant="outlined"
          className={styles.button}
          onClick={onClose}
        />
        <Button text="이동" variant="contained" className={styles.button} />
      </div>
    </div>
  );
};

export default GoToStreamerModal;

const styles = {
  container: flex({
    flexDirection: 'column',
    height: '100%',
  }),
  top_area: center({
    height: '113px',
    padding: '20px 0',
    flexDir: 'column',
  }),
  title: css({
    marginTop: '12px',
    color: 'gray.900',
    textStyle: 'body3',
  }),
  buttons_area: center({
    flex: 1,
    gap: '8px',
  }),
  button: css({
    width: '136px',
    height: '43px',
  }),
};
