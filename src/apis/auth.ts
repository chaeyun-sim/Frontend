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
