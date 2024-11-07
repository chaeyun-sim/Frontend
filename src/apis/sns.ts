import { publicInstance } from '.';

export const getSnsList = async () => {
  const response = await publicInstance.get('/sns/getPostList');

  return response.data;
};

export const getSnsDetail = async (postId: number) => {
  const response = await publicInstance.get(`/sns/getPostDetails/${postId}`);

  return response.data;
};

export const getPostingFollowings = async () => {
  const response = await publicInstance.get('/sns/getFollowedLatestPosts');

  return response.data;
};

export const postComment = async (data: IPostCommentReq) => {
  const response = await publicInstance.post('sns/createComment', data);

  return response.data;
};
