import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getPostingFollowings,
  getSnsDetail,
  getSnsList,
  postComment,
} from '@/apis/sns';

interface IPostCommentProps {
  onClose: () => void;
}

export const useGetSnsList = () => {
  return useQuery({
    queryKey: ['snsList'],
    queryFn: getSnsList,
  });
};

export const useGetSnsDetail = (snsId: number) => {
  return useQuery({
    queryKey: ['snsDetail', snsId],
    queryFn: () => getSnsDetail(snsId),
    enabled: !!snsId,
  });
};

export const useGetPostingFollowings = () => {
  return useQuery({
    queryKey: ['postingFollowings'],
    queryFn: getPostingFollowings,
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
