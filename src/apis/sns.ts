import { authInstance } from '.';

interface IPostCommentReq {
  postId: number;
  content: string;
}

interface IPostReportPostReq {
  postId: number;
  reason: string;
}

export interface ICreatePost {
  postType: string;
  title: string;
  content: string;
  publicMembers: number[];
  privateMembers: number[];
}

export const getSnsList = async () => {
  const response = await authInstance.get('/posts/getPostList');
  return response.data;
};

export const getSnsDetail = async (postId?: number) => {
  const response = await authInstance.get(`/posts/getPostDetails/${postId}`);
  return response.data;
};

export const getLatestSnsList = async () => {
  const response = await authInstance.get('/posts/getLatestPosts');
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

export const postReportPost = async (data: IPostReportPostReq) => {
  const response = await authInstance.post('/sns/reportPost', data);
  return response.data;
};

export const postReportComment = async (commentId: number) => {
  const response = await authInstance.post('/sns/reportComment', { commentId });
  return response.data;
};

export const uploadPostMedia = async (file: FormData) => {
  const response = await authInstance.post('/sns/uploadPostMedia', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const searchMember = async (nickname: string) => {
  const response = await authInstance.get(`/sns/searchMember/${nickname}`);
  return response.data.data;
};
