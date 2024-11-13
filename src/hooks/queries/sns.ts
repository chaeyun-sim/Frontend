import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getPostingFollowings,
  getSnsDetail,
  getSnsList,
  postComment,
  createPost,
  ICreatePost,
} from '@/apis/sns';

interface IGetSnsListProps {
  snsId: number;
  setPrevSnsId: (value: number) => void;
  setNextSnsId: (value: number) => void;
}

interface IPostCommentProps {
  onClose: () => void;
}

export const useGetSnsList = ({
  snsId,
  setPrevSnsId,
  setNextSnsId,
}: IGetSnsListProps) => {
  return useQuery({
    queryKey: ['snsList'],
    queryFn: async () => {
      const { code, data } = await getSnsList();
      if (code === 'OK') {
        const currentSnsIdx = (data as ISnsItem[]).findIndex(
          (v) => v.postId === snsId
        );

        setPrevSnsId(data[currentSnsIdx - 1]?.postId);
        setNextSnsId(data[currentSnsIdx + 1]?.postId);

        return data;
      }
      return [];
    },
  });
};

export const useGetSnsDetail = (snsId: number) => {
  return useQuery({
    queryKey: ['snsDetail', snsId],
    queryFn: async () => {
      const { code, data } = await getSnsDetail(snsId);
      if (code === 'OK') {
        return data;
      }
      return null;
    },
    enabled: !!snsId,
  });
};

export const useGetPostingFollowings = () => {
  return useQuery({
    queryKey: ['postingFollowings'],
    queryFn: async () => {
      const { code, data } = await getPostingFollowings();
      if (code === 'OK') {
        return data;
      }
      return null;
    },
  });
};

export const usePostComment = ({ onClose }: IPostCommentProps) => {
  return useMutation({
    mutationFn: (data: IPostCommentReq) => postComment(data),
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        onClose();
      }
    },
  });
};

export const useCreatePost = ({
  successCallback,
}: {
  successCallback: (data: IRes<any>) => void;
}) => {
  return useMutation({
    mutationFn: async (props: ICreatePost) => await createPost(props),
    onSuccess: successCallback,
  });
};
