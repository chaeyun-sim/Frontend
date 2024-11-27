import React from 'react';

import { ModalProps } from './modal.interface';
import { css } from '../../../styled-system/css';
import Button from '../common/Button';
import Modal from '../common/Modal';
import PersonBox from '../PersonBox';

interface IProps extends ModalProps {
  type: 'follower' | 'following' | null;
}

const ShowFollowersModal = ({ onClose, type }: IProps) => {
  return (
    <Modal
      onClose={onClose}
      className={css({ width: '360px', height: '524px' })}
    >
      <div style={{ position: 'relative' }}>
        <div className={styles.modal_title}>
          {type === 'follower' ? '팔로워' : '팔로잉'}
        </div>
        <div className={styles.modal_content}>
          <div className={styles.inner_content}>
            {['이민정', '김민정', '최민정', '연민정'].map((name) => (
              <PersonBox key={name} data={name} keyword="" onClick={() => {}} />
            ))}
          </div>
        </div>
        <Button
          text="확인"
          className={css({
            width: 'calc(100% - 40px)',
            margin: '20px',
          })}
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};

export default ShowFollowersModal;

const styles = {
  modal_title: css({
    padding: '20px',
    width: '100%',
    textStyle: 'body3',
    color: 'gray.900',
  }),
  modal_content: css({
    padding: '20px',
    height: '380px',
  }),
  inner_content: css({
    borderRadius: '4px',
    borderColor: 'gray.100',
    borderWidth: '1px',
    maxHeight: '340px',
    overflowY: 'auto',
    overflowX: 'hidden',
  }),
};
