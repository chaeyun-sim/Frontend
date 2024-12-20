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

export const promoteStreamer = async (platformUrl: string) => {
  const response = await authInstance.post(`/members/promoteStreamer`, {
    platformUrl,
  });
  return response.data;
};

export interface ProfileUpdateRequest {
  nickname: string;
  selfIntroduction: string;
  tagList: string[];
}

export const updateMemberInfo = async (
  file: string,
  body: ProfileUpdateRequest
) => {
  const response = await authInstance.put(`/members`, {
    file,
    ...body,
  });
  return response.data;
};

export const toggleFollow = async ({
  memberId,
  isFollow,
}: {
  memberId: number;
  isFollow: boolean;
}) => {
  const response = await authInstance.post(`/members/toggleFollow`, {
    memberId,
    isFollow,
  });
  return response.data;
};

export const getTags = async (keyword: string) => {
  const response = await authInstance.get(`/tags?tagWord=${keyword}`);
  return response.data;
};
