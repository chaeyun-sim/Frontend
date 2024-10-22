import React from 'react';

import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

const LoginModal = () => {
  return (
    <div className={styles.modal}>
      <h3 className={styles.modal_title}>SNS로 로그인</h3>
      <div className={styles.button_grp}>
        <button
          className={cx(
            styles.login_btn,
            css({
              backgroundColor: 'white',
              borderColor: '#d4d4d4',
              borderWidth: '1px',
            })
          )}
        >
          <img src="/icons/login-logo/google.svg" />
        </button>
        <button
          className={cx(
            styles.login_btn,
            css({
              backgroundColor: '#03C75A',
            })
          )}
        >
          <img src="/icons/login-logo/naver.svg" />
        </button>
        <button
          className={cx(
            styles.login_btn,
            css({
              backgroundColor: '#FEE500',
            })
          )}
        >
          <img src="/icons/login-logo/kakao.svg" />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

const styles = {
  modal: flex({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }),
  modal_title: css({
    textStyle: 'body1',
    color: '#000',
    fontWeight: '600',
    marginBottom: '42px',
  }),
  button_grp: flex({
    gap: '40px',
  }),
  login_btn: flex({
    width: '60px',
    height: '60px',
    borderRadius: '40px',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};
