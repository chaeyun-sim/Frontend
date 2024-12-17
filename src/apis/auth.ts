import { authInstance, publicInstance } from '.';

export const login = async (snsType: string, authCode: string) => {
  const type = snsType.toUpperCase();

  const response = await publicInstance.post(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/members/login/${type}`,
    {
      authCode,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const getRefresh = async (refreshToken: string) => {
  const response = await authInstance.post('/members/reissue', {
    refreshToken,
  });

  return response.data;
};

export const postUser = async (snsType: TSns, formData: FormData) => {
  const response = await publicInstance.post(
    `/members/${snsType.toUpperCase()}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const getCheckNickname = async (nickname: string) => {
  const response = await publicInstance.get(`/members/check/${nickname}`);

  return response.data;
};

export const getServeNickname = async () => {
  const response = await publicInstance.get(`/members/nicknames`);

  return response.data;
};
