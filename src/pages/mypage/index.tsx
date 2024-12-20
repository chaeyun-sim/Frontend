import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import AccountUpdateModal from '@/components/modal/AccountUpdateModal';
import ShowFollowersModal from '@/components/modal/ShowFollowersModal';
import WithdrawalModal from '@/components/modal/WithdrawalModal';
import ActivityBox from '@/components/mypage/ActivityBox';
import Content from '@/components/mypage/Content';
import InfoBox from '@/components/mypage/InfoBox';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/stores/useAuth';
import { useCheckMyPage } from '@/stores/useCheckMyPage';

import { css } from '../../../styled-system/css';
import { center, flex, vstack } from '../../../styled-system/patterns';

export type ArticleType = 'image' | 'video' | 'mixed' | undefined;

type FollowerModalType = 'following' | 'follower' | null;
type ModalTypes = 'followers' | 'accountUpdate' | 'withdrawal';

const MyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isMyPage, setIsMyPage, setMemberId } = useCheckMyPage();

  const { activeModal, openModal, closeModal } = useModal<ModalTypes>();
  const [followerModalType, setFollowerModalType] =
    useState<FollowerModalType>(null);

  useEffect(() => {
    if (id) {
      setIsMyPage(false);
      setMemberId(String(id));
    } else {
      setIsMyPage(true);
      setMemberId(String(useAuth.getState().memberId));
    }
  }, [id]);

  return (
    <>
      {activeModal === 'followers' && (
        <ShowFollowersModal onClose={closeModal} type={followerModalType} />
      )}
      {activeModal === 'accountUpdate' && (
        <AccountUpdateModal onClose={closeModal} />
      )}
      {activeModal === 'withdrawal' && <WithdrawalModal onClose={closeModal} />}
      <div className={styles.container}>
        <div className={styles.banner}>
          <img
            src={''}
            alt=""
            style={{ width: 'inherit', height: 'inherit', objectFit: 'cover' }}
          />
        </div>

        <div className={styles.info}>
          <InfoBox />
          <ActivityBox
            onSetFollowerModalType={setFollowerModalType}
            openFollowersModal={() => openModal('followers')}
            openAccountUpdate={() => openModal('accountUpdate')}
          />
        </div>
        <Content />
        {isMyPage && (
          <div className={styles.withdrawal}>
            <button onClick={() => openModal('withdrawal')}>회원 탈퇴</button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPage;

const styles = {
  container: css({
    paddingTop: '320px',
    height: '100%',
    marginBottom: '30px',
  }),
  banner: css({
    width: '100%',
    height: '320px',
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: '70px',
    zIndex: -1,
  }),
  info: flex({
    position: 'absoltue',
    marginTop: '-80px',
    zIndex: 2,
    justifyContent: 'space-between',
  }),
  activity_box: vstack({
    width: '180px',
    height: '160px',
    padding: '20px 12px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: 'shadow1',
    justifyContent: 'space-between',
  }),
  tag: center({
    padding: '8px',
    borderRadius: '20px',
    backgroundColor: 'main.light2',
    color: 'main.base',
    height: '22px',
    textStyle: 'caption3',
  }),
  activity_top: flex({
    width: '100%',
    justifyContent: 'space-between',
  }),
  follow_box: vstack({
    width: '34px',
    height: '41px',
  }),
  amount: css({
    color: 'main.base',
    textStyle: 'body1',
  }),
  amount_label: css({
    color: 'gray.900',
    textStyle: 'caption1',
    fontWeight: '400',
    marginTop: '-8px',
  }),
  activity_bottom: css({
    width: '100%',
    height: '44px',

    '& > span': {
      textStyle: 'caption3',
      color: 'gray.900',
    },
  }),
  platform_box: center({
    width: '24px',
    height: '24px',
    textStyle: 'caption2',
    color: 'gray.900',
  }),
  withdrawal: css({
    marginTop: '180px',
    textAlign: 'center',
    textStyle: 'button2',
    color: 'gray.300',
  }),
};
