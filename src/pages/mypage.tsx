import Image from 'next/image';
import React, { useState } from 'react';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';
import ProfileImage from '@/components/common/ProfileImage';
import AccountUpdateModal from '@/components/modal/AccountUpdateModal';
import ShowFollowersModal from '@/components/modal/ShowFollowersModal';
import WithdrawalModal from '@/components/modal/WithdrawalModal';
import AddPlatform from '@/components/mypage/AddPlatform';
import Content from '@/components/mypage/Content';
import Platform from '@/components/Platform';
import { useModal } from '@/hooks/useModal';
import { useMyPage } from '@/hooks/useMyPage';
import { useToggle } from '@/hooks/useToggle';

import { css, cx } from '../../styled-system/css';
import { center, flex, vstack } from '../../styled-system/patterns';

export type ArticleType = 'image' | 'video' | 'mixed' | undefined;

interface FormData {
  image: File;
  name: string;
  description: string;
  tags: string[];
}

interface PlatformData {
  platform: string;
  imageUrl: string;
  profileUrl: string;
}

const MyPage = () => {
  const followersModal = useModal();
  const accountUpdateModal = useModal();
  const withdrawalModal = useModal();
  const { boolValue: follow, toggle: toggleFollow } = useToggle();
  const { isMyPage, profileSummary, posts, comments, followers } = useMyPage({
    memberId: '1',
  });

  const [requestChangeAccountType, setRequestChangeAccountType] =
    useState(false);
  const [followerModalType, setFollowerModalType] = useState<
    'following' | 'follower' | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputs, setInputs] = useState<FormData>({
    image: null as unknown as File,
    name: '',
    description: '',
    tags: [],
  });
  const platformList: PlatformData[] = [];

  const handleModalType = (type: 'following' | 'follower' | null) => {
    setFollowerModalType(type);
    followersModal.open();
  };

  const handleUpdateProfile = () => setIsEditing(false);

  return (
    <>
      {/* 팔로워/팔로잉 모달 */}
      {followersModal.isOpen && (
        <ShowFollowersModal
          onClose={followersModal.close}
          type={followerModalType}
        />
      )}
      {/* 등업 모달 */}
      {accountUpdateModal.isOpen && (
        <AccountUpdateModal onClose={accountUpdateModal.close} />
      )}
      {withdrawalModal.isOpen && (
        <WithdrawalModal onClose={withdrawalModal.close} />
      )}
      <div className={styles.container}>
        <div className={styles.banner}>
          <img
            src={
              'https://images.unsplash.com/photo-1660056252469-a1996f1f5080?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt=""
            style={{ width: 'inherit', height: 'inherit', objectFit: 'cover' }}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.info_box}>
            {isEditing ? (
              <ProfileImage
                setFile={(file) => setInputs({ ...inputs, image: file })}
              />
            ) : (
              <div className={styles.profile_wrap}>
                <Image
                  src={
                    'https://plus.unsplash.com/premium_photo-1700520223771-bb3a599755d1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  }
                  alt="my profile image"
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover', height: '100%' }}
                />
              </div>
            )}

            <div className={styles.info_wrap}>
              <div className={styles.name_box}>
                {isEditing ? (
                  <div style={{ height: '37px', marginBottom: '8px' }}>
                    <Input
                      value={inputs.name}
                      onSetValue={(name) => {
                        setInputs({ ...inputs, name: name });
                      }}
                      className={styles.name_input}
                    />
                  </div>
                ) : (
                  <span>김철수</span>
                )}
                {!isMyPage && (
                  <Button
                    className={styles.follow_btn}
                    variant={follow ? 'contained' : 'outlined'}
                    text={follow ? '팔로우' : '팔로우 취소'}
                    onClick={toggleFollow}
                  />
                )}
              </div>
              {isEditing ? (
                <textarea className={cx(styles.description, styles.textarea)} />
              ) : (
                <span className={styles.description}>
                  안녕하세요 전세계를 돌아다니며 맛집을 찾아다니는 BJ
                  김철수입니다~~안녕하세요 전세계를 돌아다니며 맛집을 찾아다니는
                  BJ 김철수입니다~~
                </span>
              )}
              <div
                className={cx(
                  styles.tags,
                  css({ marginTop: isEditing ? '0.5px' : '12px' })
                )}
              >
                {['뉴욕맛집', '미국여행', '자동차', '디저트'].map((tag) => (
                  <button className={styles.tag} key={tag}>
                    {tag}
                  </button>
                ))}
              </div>
              {isMyPage && isEditing && (
                <div
                  className={flex({
                    gap: '8px',
                    position: 'absolute',
                    right: 0,
                    top: '-5px',
                  })}
                >
                  <Button
                    text="취소"
                    size="small"
                    variant="outlined"
                    className={css({ height: '35px' })}
                    onClick={() => setIsEditing(false)}
                  />
                  <Button
                    text="저장"
                    size="small"
                    className={css({ height: '35px' })}
                    onClick={handleUpdateProfile}
                  />
                </div>
              )}
            </div>
            {isMyPage && !isEditing && (
              <button
                className={styles.edit_wrap}
                onClick={() => setIsEditing(true)}
              >
                <Icon name="edit" />
              </button>
            )}
          </div>
          <div className={styles.activity_box}>
            <div className={styles.activity_top}>
              <div
                className={styles.follow_box}
                onClick={() => (isMyPage ? handleModalType('follower') : null)}
                style={{ cursor: isMyPage ? 'pointer' : 'default' }}
              >
                <span className={styles.amount}>322</span>
                <span className={styles.amount_label}>팔로워</span>
              </div>
              {isMyPage && (
                <button
                  className={styles.follow_box}
                  onClick={() => handleModalType('following')}
                >
                  <span className={styles.amount}>123</span>
                  <span className={styles.amount_label}>팔로잉</span>
                </button>
              )}
              <div className={styles.follow_box}>
                <span className={styles.amount}>16</span>
                <span className={styles.amount_label}>게시글</span>
              </div>
            </div>
            <div className={styles.activity_bottom}>
              {isMyPage ? (
                isEditing ? (
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
                      <AddPlatform />
                    </div>
                  </>
                ) : (
                  <Button
                    text={
                      requestChangeAccountType ? '신청중' : '방송 계정 전환'
                    }
                    onClick={() =>
                      requestChangeAccountType
                        ? setRequestChangeAccountType(true)
                        : accountUpdateModal.open()
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
        </div>
        <Content isFromMe={isMyPage} />
        <div className={styles.withdrawal}>
          <button onClick={withdrawalModal.open}>회원 탈퇴</button>
        </div>
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
  info_box: flex({
    width: '740px',
    height: '160px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: 'shadow1',
    padding: '20px',
    position: 'relative',
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
  profile_wrap: css({
    width: '120px',
    height: '120px',
    borderRadius: '120px',
    borderColor: 'main.base',
    borderWidth: '1px',
    overflow: 'hidden',
  }),
  info_wrap: css({
    marginLeft: '20px',
    flex: 1,
    position: 'relative',
  }),
  name_box: flex({
    textStyle: 'title1',
    color: 'gray.900',
    height: '35px',
    alignItems: 'center',
    marginBottom: '9px',
  }),
  follow_btn: center({
    marginLeft: '12px',
    width: '97px !important',
    height: '100%',
    borderRadius: '4px',
    padding: '12px 8px',
    backgroundColor: 'main.base',
    color: 'white',
    textStyle: 'button2',
  }),
  description: css({
    textStyle: 'body4',
    color: 'gray.900',
  }),
  tags: flex({
    alignItems: 'center',
    gap: '12px',
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
  article_title: css({
    textStyle: 'body1',
    color: 'gray.900',
  }),
  edit_wrap: css({
    position: 'absolute',
    right: '20px',
    cursor: 'pointer',
  }),
  textarea: css({
    height: '56px',
    resize: 'none',
    width: '100%',
    borderColor: 'main.base',
    borderWidth: '1px',
    outline: 'none',
    wordBreak: 'break-all',
    overflow: 'hidden',
    borderRadius: '4px',
    padding: '8px',
    marginTop: '-8px',
  }),
  name_input: css({
    textStyle: 'body3',
    color: 'gray.900',
    outline: 'none',
    fontWeight: 'bold',
    padding: '0 12px',
  }),
  withdrawal: css({
    marginTop: '180px',
    textAlign: 'center',
    textStyle: 'button2',
    color: 'gray.300',
  }),
};
