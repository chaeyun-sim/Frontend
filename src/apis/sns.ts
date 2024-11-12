import { publicInstance } from '.';

export interface ICreatePost {
  postType: string;
  title: string;
  content: string;
  publicMembers: string[];
  privateMembers: string[];
}

export const createPost = async (props: ICreatePost) => {
  const response = await publicInstance.post(`sns/createPost`, props);
  return response.data;
};
