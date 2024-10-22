import React, { PropsWithChildren } from 'react';

import { css, cx } from '../../../styled-system/css';

interface IProps {
  onClose: () => void;
  width?: number;
  height?: number;
}

const Modal = ({
  onClose,
  width,
  height,
  children,
}: PropsWithChildren<IProps>) => {
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_blur} onClick={onClose} />
      <div
        className={cx(
          styles.modal_content,
          css({ width: width || 380, height: height || 240, margin: 'auto' })
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

const styles = {
  modal_container: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  }),
  modal_content: css({
    backgroundColor: 'white',
    zIndex: 100,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    shadow: 'shadow1',
    borderRadius: '8px',
  }),
  modal_blur: css({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 10,
  }),
};
