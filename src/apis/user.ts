// /apis: API 호출 및 관련 로직을 관리

import { publicInstance } from '.';

export const getUser = async (userId: string) => {
  const response = await publicInstance.get(`users/${userId}`);
  return response.data;
};

export const postUser = async (userData: any) => {
  const response = await publicInstance.post(`/users`, userData);
  return response.data;
};
