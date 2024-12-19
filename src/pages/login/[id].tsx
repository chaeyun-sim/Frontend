import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSocialLogin } from '@/hooks/queries/auth';
import { useAuth } from '@/stores/useAuth';
import { useUserStore } from '@/stores/useUserStore';
import { setItem } from '@/utils/localStorage';

import { css } from '../../../styled-system/css';
import { center } from '../../../styled-system/patterns';

const Login = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { code, id } = router.query;

  const { setAuth } = useAuth();
  const { setUserRole } = useUserStore();

  const { mutate, isError, error } = useSocialLogin({
    successCallback: (data) => {
      if (data?.code === 'OK') {
        setItem('@token', data.data.accessToken);
        setItem('@refresh', data.data.refreshToken);
        setAuth({
          // token: data.data.accessToken,
          ...data.data,
        });
        setUserRole(data.data.role as TRole);
        navigation.push('/');
      }
    },
  });

  useEffect(() => {
    if (code && id && ['kakao', 'google', 'naver'].includes(String(id))) {
      mutate({ authCode: code as string, snsType: String(id) });
    }
  }, [code, id]);

  if (
    !['kakao', 'google', 'naver'].includes(String(id)) ||
    code === undefined
  ) {
    return (
      <div className={styles.container}>
        <span className={css({ textStyle: 'body1' })}>
          에러가 발생했습니다.
        </span>
        <br />
      </div>
    );
  }

  if (isError) {
    if (error instanceof Error && (error as any).status === 401) {
      return (
        <div className={styles.container}>
          <span>회원가입 페이지로 이동 중...</span>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <span className={css({ textStyle: 'body1' })}>
          에러가 발생했습니다.
        </span>
        <br />
      </div>
    );
  }

  return <div>로그인 중...</div>;
};

export default Login;

const styles = {
  container: center({
    width: '100%',
    height: 'calc(100dvh - 200px)',
  }),
};
