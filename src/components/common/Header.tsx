import Link from 'next/link';
import React, { useState } from 'react';

import { useAuth } from '@/stores/useAuth';

import Icon from './Icon';
import Modal from './Modal';
import { css } from '../../../styled-system/css';
import LoginModal from '../modal/LoginModal';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
            <Link href={'/sns/normal'}>SNS 이동</Link>
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
    width: '138px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textStyle: 'button1',
  }),
};
