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
        // 401 에러 & 토큰 있음 -> 토큰 refresh 새로 받기
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
        // 401 에러 & 토큰 없음 -> 토큰 문제
        alert(error);
        window.location.href = '/';
        return Promise.reject(error);
      }
    }

    // 그 외 에러 -> api에서 개별 관리
    return Promise.reject(error);
  }
);
