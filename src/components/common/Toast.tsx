import { useEffect } from 'react';

import { css, cx } from '../../../styled-system/css';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  isError?: boolean;
  duration?: number;
}

const Toast = ({ isOpen, onClose, text, isError, duration = 3000 }: IProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  return (
    <div
      className={cx(
        styles.container,
        isOpen ? styles.open : styles.close,
        isError ? styles.error : styles.default
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
