import React from 'react';

import { css } from '../../../styled-system/css';
import Button from '../common/Button';
import PersonBox from '../PersonBox';

interface IProps {
  onCloseModal: () => void;
  type: 'follower' | 'following' | null;
}

const ShowFollowersModal = ({ onCloseModal, type }: IProps) => {
  return (
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
        onClick={onCloseModal}
      />
    </div>
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
    overflow: 'scroll',
  }),
};
