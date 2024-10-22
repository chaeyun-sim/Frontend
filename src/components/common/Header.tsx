import Link from 'next/link';
import React from 'react';

import Icon from './Icon';
import { css } from '../../../styled-system/css';

const Header = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles.inner}>
        <Link href="/">
          <Icon name="logo" />
        </Link>
        <div className={styles.menu}>
          <Link href={'/'}>SNS 이동</Link>
          <Link href={'/'}>로그인</Link>
        </div>
      </div>
    </div>
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
