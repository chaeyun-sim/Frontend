import { authInstance } from '.';

export interface ICreatePost {
  postType: string;
  title: string;
  content: string;
  publicMembers: string[];
  privateMembers: string[];
}

export const getSnsList = async () => {
  const response = await authInstance.get('/sns/getPostList');
  return response.data;
};

export const getSnsDetail = async (postId?: number) => {
  const response = await authInstance.get(`/sns/getPostDetails/${postId}`);
  return response.data;
};

export const getLatestSnsList = async () => {
  const response = await authInstance.get('/sns/getLatestPosts');
  return response.data;
};

export const postComment = async (data: IPostCommentReq) => {
  const response = await authInstance.post('/sns/createComment', data);
  return response.data;
};

export const createPost = async (props: ICreatePost) => {
  const response = await authInstance.post(`/sns/createPost`, props);
  return response.data;
};
