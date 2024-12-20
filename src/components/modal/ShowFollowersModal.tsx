import { useRouter } from 'next/navigation';
import React from 'react';

import { Follower } from '@/hooks/queries/members';
import { useMyPage } from '@/hooks/useMyPage';
import { useAuth } from '@/stores/useAuth';

import { ModalProps } from './modal.interface';
import { css } from '../../../styled-system/css';
import Button from '../common/Button';
import Modal from '../common/Modal';
import PersonBox from '../PersonBox';

interface IProps extends ModalProps {
  type: 'follower' | 'following' | null;
}

const ShowFollowersModal = ({ onClose, type }: IProps) => {
  const router = useRouter();
  const { memberId } = useAuth();
  const { followers, follows } = useMyPage({ memberId: String(memberId) });

  const data = type === 'follower' ? followers : follows;

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
            {data?.map((item: Follower) => (
              <PersonBox
                key={item.memberId}
                data={{
                  ...item,
                  memberId: String(item.memberId),
                }}
                keyword=""
                onClickNavigate={() => router.push(`/mypage/${item.memberId}`)}
              />
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
