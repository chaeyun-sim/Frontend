import React, { useState } from 'react';

import Button from '@/components/common/Button';
import AddPlatform from '@/components/mypage/AddPlatform';
import Platform from '@/components/Platform';
import { Platform as IPlatform } from '@/hooks/queries/members';
import { useModal } from '@/hooks/useModal';
import { useMyPage } from '@/hooks/useMyPage';
import { useEditMyPage } from '@/stores/useEditMyPage';

import StatBox from './StatBox';
import { css } from '../../../styled-system/css';
import { center, flex } from '../../../styled-system/patterns';
import AddPlatformModal from '../modal/AddPlatformModal';

interface IProps {
  onSetFollowerModalType: (value: 'following' | 'follower' | null) => void;
  openFollowersModal: () => void;
  openAccountUpdate: () => void;
  memberId: string;
}

const ActivityBox = ({
  onSetFollowerModalType,
  openFollowersModal,
  openAccountUpdate,
  memberId,
}: IProps) => {
  const platformList: IPlatform[] = [];
  const { isMyPage, profileSummary } = useMyPage({ memberId });
  const { isEditing } = useEditMyPage();
  const { isOpen, openModal, closeModal } = useModal();

  const [publicPlatformList, setPublicPlatformList] = useState<IPlatform[]>([]);

  const handleModalType = (type: 'following' | 'follower' | null) => {
    onSetFollowerModalType(type);
    openFollowersModal();
  };

  return (
    <div className={styles.activity_box}>
      <div className={styles.activity_top}>
        <StatBox
          amount={profileSummary?.followerCount as number}
          label={'팔로워'}
          onClick={() =>
            profileSummary?.isStreamer ? handleModalType('follower') : null
          }
        />
        {profileSummary?.isStreamer && (
          <StatBox
            amount={profileSummary?.followingCount as number}
            label={'팔로잉'}
            onClick={() => handleModalType('following')}
          />
        )}
        <StatBox
          amount={profileSummary?.postCount as number}
          label={'게시글'}
        />
      </div>
      <div className={styles.activity_bottom}>
        {isMyPage ? (
          isEditing ? (
            <>
              <span>플랫폼</span>
              <div className={flex({ gap: '2px' })}>
                {profileSummary?.platforms
                  ?.slice(0, 5)
                  .map((platform, index) => (
                    <Platform key={platform.platform + index} {...platform} />
                  ))}
                {(profileSummary?.platforms?.length ?? 0) > 5 ? (
                  <div className={styles.platform_box}>
                    + {platformList.length - 5}
                  </div>
                ) : (
                  <AddPlatform onClick={() => openModal('')} />
                )}
                {isOpen && (
                  <AddPlatformModal
                    onClose={closeModal}
                    publicPlatformList={publicPlatformList}
                    onSetPublicPlatformList={setPublicPlatformList}
                  />
                )}
              </div>
            </>
          ) : (
            <Button
              text={
                profileSummary?.isSubmittedToStreamer
                  ? '신청중'
                  : '방송 계정 전환'
              }
              onClick={() =>
                profileSummary?.isSubmittedToStreamer
                  ? null
                  : openAccountUpdate()
              }
              size="small"
              className={css({ width: '100%', marginTop: '7px' })}
            />
          )
        ) : (
          <>
            <span>플랫폼</span>
            <div>
              {platformList
                ?.slice(0, 5)
                .map((platform) => (
                  <Platform key={platform.platform} {...platform} />
                ))}
              {platformList?.length > 5 && (
                <div className={styles.platform_box}>
                  + {platformList.length - 5}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityBox;

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
  activity_box: flex({
    flexDir: 'column',
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
