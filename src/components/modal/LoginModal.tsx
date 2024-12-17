import Image from 'next/image';
import React from 'react';

import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

const LoginModal = () => {
  const loginProviders = {
    kakao: {
      url: 'https://kauth.kakao.com/oauth/authorize?',
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
    },
    google: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth?scope=openid email&',
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
    naver: {
      url: 'https://nid.naver.com/oauth2.0/authorize?',
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    },
  };

  const handleLogin = (provider: 'kakao' | 'google' | 'naver') => {
    const { url, clientId } = loginProviders[provider];
    const redirectUrl = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_REDIRECT_URL}/${provider}`
    );
    window.location.href = `${url}client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;
  };

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
          onClick={() => handleLogin('google')}
        >
          <Image
            src="/icons/login-logo/google.svg"
            alt="google login"
            width={28}
            height={28}
          />
        </button>
        <button
          className={cx(
            styles.login_btn,
            css({
              backgroundColor: '#03C75A',
            })
          )}
          onClick={() => handleLogin('naver')}
        >
          <Image
            src="/icons/login-logo/naver.svg"
            alt="naver login"
            width={22}
            height={22}
          />
        </button>
        <button
          className={cx(
            styles.login_btn,
            css({
              backgroundColor: '#FEE500',
            })
          )}
          onClick={() => handleLogin('kakao')}
        >
          <Image
            src="/icons/login-logo/kakao.svg"
            alt="kakao login"
            width={27}
            height={24}
          />
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
