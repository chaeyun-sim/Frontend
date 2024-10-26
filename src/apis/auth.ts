import axios from 'axios';

import { axiosInstance } from '.';

export const login = async (snsType: string, authCode: string) => {
  const response = await axios.post(`/members/login/${snsType}`, {
    authCode,
  });

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
  const response = await axiosInstance.post('/members/reissue', {
    refreshToken,
  });

  return response.data;
};

export const postUser = async (snsType: string, formData: FormData) => {
  const response = await axiosInstance.post(`/members/${snsType}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getCheckNickname = async (nickname: string) => {
  const response = await axiosInstance.get(
    `/members/check/nickname/${nickname}`
  );

  return response.data;
};

export const getServeNickname = async () => {
  const response = await axiosInstance.get(`/members/serve/nickname`);

  return response.data;
};
