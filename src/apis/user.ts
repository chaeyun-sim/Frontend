// /apis: API 호출 및 관련 로직을 관리

import { API_BASE_URL } from '@/constants/common';
import axios from 'axios';

export const getUser = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
  return response.data;
};

export const postUser = async (userData: any) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};
