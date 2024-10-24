import axios from 'axios';

import { axiosInstance } from '.';

export const login = async (snsType: string, authCode: string) => {
  const response = await axios.post(`/members/login/${snsType}`, {
    authCode,
  });
  return response.data;
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
