import { useEffect } from 'react';

import { css, cx } from '../../../styled-system/css';

interface IProps {
  open: boolean;
  onClose: () => void;
  text: string;
  error?: boolean;
  duration?: number;
}

const Toast = ({ open, onClose, text, error, duration = 3000 }: IProps) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open]);

  return (
    <div
      className={cx(
        styles.container,
        open ? styles.open : styles.close,
        error ? styles.error : styles.default
      )}
    >
      {text}
    </div>
  );
};

export default Toast;

const styles = {
  container: css({
    position: 'fixed',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '460px',
    padding: '12px 20px',
    borderRadius: '4px',
    color: 'white',
    textStyle: 'button1',
    transition: '0.2s ease',
  }),
  open: css({
    visibility: 'visible',
    opacity: 1,
  }),
  close: css({
    visibility: 'hidden',
    opacity: 0,
  }),
  default: css({
    backgroundColor: 'gray.900',
  }),
  error: css({
    backgroundColor: 'red',
  }),
};
