import { authInstance } from '.';

export const checkIdMatch = async (memberId: string) => {
  const response = await authInstance.get(`/members/isMyMemberId/${memberId}`);
  return response.data.data;
};

export const getProfileSummary = async (memberId: string) => {
  const response = await authInstance.get(`/summary/${memberId}`);
  return response.data;
};

export const getProfileInfo = async (memberId: string) => {
  const response = await authInstance.get(`/profile/${memberId}`);
  return response.data;
};

export const getPostList = async (memberId: string) => {
  const response = await authInstance.get(`/posts/${memberId}`);
  return response.data;
};

export const getFollowers = async (memberId: string) => {
  const response = await authInstance.get(`/members/followers/${memberId}`);
  return response.data;
};

export const getComments = async (memberId: string) => {
  const response = await authInstance.get(`/members/comments/${memberId}`);
  return response.data;
};

export const postFollow = async (data: IPostFollowReq) => {
  const response = await authInstance.post('/members/toggleFollow', data);
  return response.data;
};
