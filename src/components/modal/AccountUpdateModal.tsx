import React from 'react';

import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import Button from '../common/Button';

interface IProps {
  onClose: () => void;
}

const AccountUpdateModal = ({ onClose }: IProps) => {
  return (
    <div>
      <div className={styles.modal_title}>방송인 계정 등업</div>
      <span
        className={css({
          padding: '0 20px',
          textStyle: 'body4',
          color: 'gray.900',
        })}
      >
        방송인 계정으로 등업하시겠습니까?
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
          <p>1. 안내사항 </p>
          <p>2. 안내사항</p>
          <p>3. 안내사항</p>
        </div>
      </div>
      <div className={css({ padding: '20px' })}>
        <div
          className={css({
            padding: '8px',
            borderRadius: '4px',
            borderColor: 'gray.300',
            borderWidth: '1px',
            textStyle: 'button2',
            color: 'gray.700',
            wordBreak: 'break-all',
          })}
        >
          https://www.figma.com/design/OrshYtN8dGIWucxseBLY1X/ProjectBBB?node-id=685-6588&t=B8blJBA3lCu1xlzt-1
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
          text="확인"
          className={css({ width: '216px' })}
        />
      </div>
    </div>
  );
};

export default AccountUpdateModal;

const styles = {
  modal_title: css({
    padding: '20px',
    width: '100%',
    textStyle: 'body3',
    color: 'gray.900',
  }),
};
