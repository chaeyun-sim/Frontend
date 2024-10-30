import { authInstance, publicInstance } from '.';

export const login = async (snsType: string, authCode: string) => {
  const response = await publicInstance.post(
    `/members/login/${snsType.toUpperCase()}`,
    {
      authCode,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  switch (response.status) {
    case 200:
      return response.data;
    case 400:
      console.error(response.data.message);
      alert(response.data.authCode);
      window.location.href = '/';
      return;
    case 401:
      if (response.data.message === '가입되지 않은 회원입니다.') {
        window.location.href = '/join';
      }
      return;
    case 500:
      console.error(response.data.message);
      return;
    default:
      throw new Error('알 수 없는 문제가 발생했습니다.');
  }
};

export const getRefresh = async (refreshToken: string) => {
  const response = await authInstance.post('/members/reissue', {
    refreshToken,
  });

  return response.data;
};
