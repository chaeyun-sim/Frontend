import { authInstance, publicInstance } from '.';

export interface ICreatePost {
  postType: string;
  title: string;
  content: string;
  publicMembers: string[];
  privateMembers: string[];
}

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
  const response = await authInstance.post('sns/createComment', data);
  return response.data;
};

export const createPost = async (props: ICreatePost) => {
  const response = await publicInstance.post(`sns/createPost`, props);
  return response.data;
};
