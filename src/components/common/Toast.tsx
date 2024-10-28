import { useEffect, useState } from 'react';

import { css, cx } from '../../../styled-system/css';

interface IProps {
  text: string;
  error?: boolean;
  duration?: number;
}

const Toast = ({ text, error, duration = 3000 }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={cx(
        styles.container,
        isOpen ? styles.open : styles.close,
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
    left: 'calc(50% - 230px)',
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
