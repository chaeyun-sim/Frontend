import React, { PropsWithChildren } from 'react';

import { css } from '../../../styled-system/css';
import Header from '../common/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default RootLayout;

const styles = {
  container: css({
    width: '100dvw',
  }),
  content: css({
    width: '940px',
    minHeight: 'calc(100dvh - 70px)',
    margin: '0 auto',
  }),
};
