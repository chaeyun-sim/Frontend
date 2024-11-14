import Image from 'next/image';
import React, { useState } from 'react';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';
import AccountUpdateModal from '@/components/modal/AccountUpdateModal';
import ShowFollowersModal from '@/components/modal/ShowFollowersModal';
import Content from '@/components/mypage/Content';
import Platform from '@/components/Platform';

import { css, cx } from '../../styled-system/css';
import { center, flex, vstack } from '../../styled-system/patterns';

export type ArticleType = 'image' | 'video' | 'mixed' | undefined;

interface PlatformData {
  platform: string;
  imageUrl: string;
  profileUrl: string;
}

interface Article {
  title: string;
  date: string;
  type?: ArticleType;
  pinned?: boolean;
}

const articles: Article[] = [
  {
    title: '게시물 제목 최대 2줄 게시물 제목 최대 2줄 게시물 제목 최대 2',
    date: '2024.11.01',
    type: 'image',
    pinned: true,
  },
];

const MyPage = () => {
  const [isMyPage, setIsMyPage] = useState(false);
  const platformList: PlatformData[] = [];
  const [follow, setFollow] = useState(false);
  const [requestChangeAccountType, setRequestChangeAccountType] =
    useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState<
    'follower' | 'following' | null
  >(null);
  const [openAccountUpdate, setOpenAccountUpdate] = useState(false);

  const toggleFollow = () => setFollow((prev) => !prev);

  const handleCloseFollowersModal = () => setOpenFollowersModal(null);
  const handleCloseAccountUpdate = () => setOpenAccountUpdate(false);

  return (
    <>
      {openFollowersModal && (
        <Modal
          onClose={handleCloseFollowersModal}
          className={css({ width: '360px', height: '524px' })}
        >
          <ShowFollowersModal
            onCloseModal={handleCloseFollowersModal}
            type={openFollowersModal}
          />
        </Modal>
      )}
      {openAccountUpdate && (
        <Modal
          className={css({ width: '480px' })}
          onClose={handleCloseAccountUpdate}
        >
          <AccountUpdateModal onClose={handleCloseAccountUpdate} />
        </Modal>
      )}
      <div className={styles.container}>
        <div className={styles.banner}>
          <Image
            src={
              'https://images.unsplash.com/photo-1660056252469-a1996f1f5080?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt=""
            width={1920}
            height={320}
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.info_box}>
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
            <div className={styles.info_wrap}>
              <div className={styles.name_box}>
                <span>김철수</span>
                {!isMyPage && (
                  <Button
                    className={styles.follow_btn}
                    variant={follow ? 'contained' : 'outlined'}
                    text={follow ? '팔로우' : '팔로우 취소'}
                    onClick={toggleFollow}
                  />
                )}
              </div>
              <span className={styles.description}>
                안녕하세요 전세계를 돌아다니며 맛집을 찾아다니는 BJ
                김철수입니다~~안녕하세요 전세계를 돌아다니며 맛집을 찾아다니는
                BJ 김철수입니다~~
              </span>
              <div className={styles.tags}>
                {['뉴욕맛집', '미국여행', '자동차', '디저트'].map((tag) => (
                  <button className={styles.tag} key={tag}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            {isMyPage && (
              <div className={styles.edit_wrap}>
                <Icon name="edit" />
              </div>
            )}
          </div>
          <div className={styles.activity_box}>
            <div className={styles.activity_top}>
              <div
                className={styles.follow_box}
                onClick={() =>
                  isMyPage ? setOpenFollowersModal('follower') : null
                }
                style={{ cursor: isMyPage ? 'pointer' : 'default' }}
              >
                <span className={styles.amount}>322</span>
                <span className={styles.amount_label}>팔로워</span>
              </div>
              {isMyPage && (
                <button
                  className={styles.follow_box}
                  onClick={() => setOpenFollowersModal('following')}
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
                <Button
                  disabled={requestChangeAccountType}
                  text={requestChangeAccountType ? '신청중' : '방송 계정 전환'}
                  onClick={() =>
                    requestChangeAccountType ? null : setOpenAccountUpdate(true)
                  }
                  size="small"
                  className={css({ width: '100%', marginTop: '7px' })}
                />
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
        <Content />
        <Button
          size="large"
          onClick={() => setIsMyPage(!isMyPage)}
          text={isMyPage ? '내가 본다' : '남이 본다'}
        />
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
    maxWidth: '1920px',
    height: '320px',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
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
    width: 'max-content',
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
    marginTop: '12px',
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
    '&::hover': {
      '& > img': {
        backgroundColor: 'black',
      },
    },
  }),
};
