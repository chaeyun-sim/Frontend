import React from 'react';

import { ModalProps } from './modal.interface';
import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import Button from '../common/Button';
import Modal from '../common/Modal';

const WithdrawalModal = ({ onClose }: ModalProps) => {
  return (
    <Modal className={css({ width: '480px' })} onClose={onClose}>
      <div>
        <div className={styles.modal_title}>회원 탈퇴</div>
        <span
          className={css({
            padding: '0 20px',
            textStyle: 'body4',
            color: 'gray.900',
          })}
        >
          정말로 탈퇴하시겠습니까?
        </span>
        <div className={css({ padding: '8px 20px' })}>
          <div
            className={css({
              padding: '12px',
              backgroundColor: 'gray.50',
              borderRadius: '8px',
              textStyle: 'body4',
              color: 'gray.900',
            })}
          >
            <p>1. 정보 보관 약관 </p>
            <p>2. 기타 약관</p>
            <p>3. 기타 약관</p>
          </div>
        </div>
        <div
          className={flex({ padding: '20px', justifyContent: 'space-between' })}
        >
          <Button
            variant="outlined"
            text="취소"
            className={css({ width: '216px' })}
            onClick={onClose}
          />
          <Button
            variant="contained"
            text="탈퇴"
            className={css({ width: '216px' })}
          />
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawalModal;

const styles = {
  modal_title: css({
    padding: '20px',
    width: '100%',
    textStyle: 'body3',
    color: 'gray.900',
  }),
};
