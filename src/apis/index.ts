import axios from 'axios';

import { getItem, setItem } from '@/utils/localStorage';

import { getRefresh } from './auth';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_API + '/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const token = String(getItem('@token'));

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const origin = error.config;
    const token = String(getItem('@token'));

    if (error.response?.status === 401 && origin.url !== '/members/reissue') {
      if (token) {
        // api가 reissue가 아니고 & 401 에러 & 토큰 있음 -> 토큰 refresh 새로 받기
        try {
          const originRefreshToken = String(getItem('@refresh'));
          const response = await getRefresh(originRefreshToken);
          const { accessToken, refreshToken } = response.data;
          origin.headers.Authorization = `Bearer ${accessToken}`;
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          setItem('@token', accessToken);
          setItem('@refresh', refreshToken);
          return axiosInstance(origin);
        } catch (error) {
          console.error(error);
        }
      } else {
        // api가 reissue가 아니고 & 401 에러 & 토큰 없음 -> 토큰 문제
        console.error(error);
        window.location.href = '/';
        return Promise.reject(error);
      }
    } else if (
      error.response?.status === 400 &&
      origin.url !== '/members/reissue'
    ) {
      // api가 reissue가 아니고 & 400 에러 -> 회원가입으로 이동
      window.location.href = '/join';
    }

    return Promise.reject(error);
  }
);
