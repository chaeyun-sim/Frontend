import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { useToggle } from '@/hooks/useToggle';
import { useAuth } from '@/stores/useAuth';
import { useUserStore } from '@/stores/useUserStore';

import ProfileMenu from './HeaderProfileMenu';
import Icon from './Icon';
import Modal from './Modal';
import { css } from '../../../styled-system/css';
import LoginModal from '../modal/LoginModal';

const Header = () => {
  const { isLoggedIn, profileImage } = useAuth();
  const { role } = useUserStore();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isOpen: isOpenProfileMenu, handleToggle: handleToggleProfileMenu } =
    useToggle(false);

  const openModal = () => setIsLoginModalOpen(true);
  const closeModal = () => setIsLoginModalOpen(false);

  return (
    <>
      {isLoginModalOpen && (
        <Modal
          onClose={closeModal}
          className={css({ width: 380, height: 240 })}
        >
          <LoginModal />
        </Modal>
      )}
      <div className={styles.header_container}>
        <div className={styles.inner}>
          <Link href="/">
            <Icon name="logo" />
          </Link>
          <div className={styles.menu}>
            <Link href={`/sns/${role === 'MEMBER' ? 'normal' : 'broadcast'}`}>
              SNS 이동
            </Link>
            {isLoggedIn ? (
              <div className={styles.profile_container}>
                <Image
                  src={profileImage}
                  alt="프로필"
                  width={36}
                  height={36}
                  onClick={handleToggleProfileMenu}
                  className={css({ cursor: 'pointer' })}
                />
                {isOpenProfileMenu && (
                  <div className={styles.profile_menu_container}>
                    <ProfileMenu handleToggle={handleToggleProfileMenu} />
                  </div>
                )}
              </div>
            ) : (
              <button onClick={openModal}>로그인</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

const styles = {
  header_container: css({
    height: '70px',
  }),
  inner: css({
    width: '940px',
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
  }),
  menu: css({
    // width: '138px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 36,
    alignItems: 'center',
    textStyle: 'button1',
  }),
  profile_container: css({
    position: 'relative',
  }),
  profile_menu_container: css({
    position: 'absolute',
    top: 'calc(100% + 10px)',
    right: 0,
    zIndex: 2,
  }),
};
