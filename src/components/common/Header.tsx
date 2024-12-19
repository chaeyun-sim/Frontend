import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useToggle } from '@/hooks/useToggle';
import { useAuth } from '@/stores/useAuth';
import { useUserStore } from '@/stores/useUserStore';

import Icon from './Icon';
import Modal from './Modal';
import Switch from './Switch';
import { css } from '../../../styled-system/css';
import LoginModal from '../modal/LoginModal';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const { role, setUserRole } = useUserStore();
  const { isOpen: isOnRoleSwitch, handleToggle: handleToggleRoleSwitch } =
    useToggle(role === 'STREAMER');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openModal = () => setIsLoginModalOpen(true);
  const closeModal = () => setIsLoginModalOpen(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    if (isOnRoleSwitch) {
      setUserRole('STREAMER');
    } else {
      setUserRole('MEMBER');
    }
  }, [isOnRoleSwitch]);

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
            <Link href={`/sns/${role === 'STREAMER' ? 'broadcast' : 'normal'}`}>
              SNS 이동
            </Link>
            {isLoggedIn && (
              <Switch
                label="방송모드"
                on={isOnRoleSwitch}
                handleToggle={handleToggleRoleSwitch}
              />
            )}
            <button onClick={isLoggedIn ? logout : openModal}>
              {isLoggedIn ? '로그아웃' : '로그인'}
            </button>
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
};
