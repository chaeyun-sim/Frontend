import { authInstance } from '.';

export const checkIdMatch = async (memberId: string) => {
  const response = await authInstance.get(`/members/isMyMemberId/${memberId}`);
  return response.data.data;
};

export const getProfileSummary = async (memberId: string) => {
  const response = await authInstance.get(`/members/summary/${memberId}`);
  return response.data.data;
};

export const getProfileInfo = async (memberId: string) => {
  const response = await authInstance.get(`/members/profile/${memberId}`);
  return response.data.data;
};

export const getPostList = async (memberId: string) => {
  const response = await authInstance.get(`/members/posts/${memberId}`);
  return response.data.data;
};

export const getFollowers = async (memberId: string) => {
  const response = await authInstance.get(`/members/followers/${memberId}`);
  return response.data.data;
};

export const getFollows = async (memberId: string) => {
  const response = await authInstance.get(`/members/follows/${memberId}`);
  return response.data.data;
};

export const getComments = async (memberId: string) => {
  const response = await authInstance.get(`/members/comments/${memberId}`);
  return response.data.data;
};

export const postFollow = async (data: IPostFollowReq) => {
  const response = await authInstance.post('/members/toggleFollow', data);
  return response.data.data;
};
