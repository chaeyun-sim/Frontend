import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSocialLogin } from '@/hooks/queries/auth';
import { setItem } from '@/utils/localStorage';

const Login = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { code, id } = router.query;

  const { mutate, isError, error } = useSocialLogin({
    successCallback: (data) => {
      if (data.code === 'OK') {
        setItem('@token', data.data.accessToken);
        setItem('@refresh', data.data.refreshToken);
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
    return <div>잘못된 접근입니다.</div>;
  }

  if (isError) {
    return (
      <div>
        <span>에러가 발생했습니다</span>
        <br />
        <span>{(error as Error).message}</span>
      </div>
    );
  }

  return <div>로그인 중...</div>;
};

export default Login;
