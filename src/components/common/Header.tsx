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
    minWidth: '1920px',
    height: '70px',
  }),
  inner: css({
    width: '940px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  menu: css({
    width: '138px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textStyle: 'button1',
  }),
};
