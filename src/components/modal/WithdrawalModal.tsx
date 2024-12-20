import React from 'react';

import { ModalProps } from './modal.interface';
import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import Button from '../common/Button';
import Modal from '../common/Modal';

const WithdrawalModal = ({ onClose }: ModalProps) => {
  const handleWithdrawal = () => {
    // TODO: 탈퇴 만들기
  };

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
            <p>1. 서비스 이용 종료 </p>
            <span
              className={flex({
                textStyle: 'caption2',
                flexDir: 'column',
                gap: '4px',
                margin: '4px 0',
              })}
            >
              <span>
                (1) 회원 탈퇴 시 방방봐의 모든 서비스에 접근할 수 없습니다.
              </span>
              <span className={css({ textStyle: 'caption2' })}>
                (2) 회원 탈퇴 시 계정 복구는 불가능합니다.
              </span>
            </span>
            <p className={css({ marginTop: '14px' })}>2. 개인정보 보유 기간</p>
            <span
              className={flex({
                textStyle: 'caption2',
                flexDir: 'column',
                gap: '4px',
                margin: '6px 0 4px',
              })}
            >
              <span>
                (1) 탈퇴 시 개인정보는 즉시 삭제되지만, 법적 의무나 분쟁 해결을
                위해 일정 기간 보관될 수 있습니다.
              </span>
              <span>
                (2) 스트리머의 경우, 등록된 모든 정보가 즉시 삭제됩니다.
              </span>
            </span>
          </div>
        </div>
        <div
          className={flex({
            padding: '20px',
            justifyContent: 'space-between',
            gap: '8px',
          })}
        >
          <Button
            variant="outlined"
            text="취소"
            className={css({ flex: 1 })}
            onClick={onClose}
          />
          <Button
            variant="contained"
            text="탈퇴"
            className={css({ flex: 1 })}
            onClick={handleWithdrawal}
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
