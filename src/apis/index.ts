import axios from 'axios';

import { useAuth } from '@/stores/useAuth';

import { getRefresh } from './auth';

export const publicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API + '/api/v1',
  withCredentials: true,
});

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API + '/api/v1',
  withCredentials: true,
  headers: { Authorization: `Bearer ${useAuth.getState().token}` },
});

authInstance.interceptors.request.use(
  (config) => {
    if (useAuth.getState().token)
      config.headers.Authorization = `Bearer ${useAuth.getState().token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const origin = error.config;

    if (error.response?.status === 401 && origin.url !== '/members/reissue') {
      if (useAuth.getState().token) {
        // 401 에러 & 토큰 있음 -> 토큰 refresh 새로 받기
        try {
          const { refreshToken: originRefreshToken } = useAuth.getState();

          const response = await getRefresh(originRefreshToken!);
          const { accessToken, refreshToken } = response.data;

          useAuth.getState().setAuth({
            ...useAuth.getState(),
            token: accessToken,
            refreshToken: refreshToken,
          });

          origin.headers.Authorization = `Bearer ${accessToken}`;
          authInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return authInstance(origin);
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
