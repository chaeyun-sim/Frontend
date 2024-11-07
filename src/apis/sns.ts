import { publicInstance } from '.';

export const getSnsList = async () => {
  const response = await publicInstance.get('/sns/getPostList');

  if (response.data.code === 'OK') {
    return response.data.data;
  }

  return [];
};

export const getSnsDetail = async (postId: number) => {
  const response = await publicInstance.get(`/sns/getPostDetails/${postId}`);

  if (response.data.code === 'OK') {
    return response.data.data;
  }

  return [];
};

export const getPostingFollowings = async () => {
  const response = await publicInstance.get('/sns/getFollowedLatestPosts');

  if (response.data.code === 'OK') {
    return response.data.data;
  }

  return [];
};
