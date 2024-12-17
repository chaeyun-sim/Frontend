import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  getLatestSnsList,
  getSnsDetail,
  getSnsList,
  postComment,
  createPost,
} from '@/apis/sns';

interface IGetSnsDetailProps {
  snsId?: number;
  snsList?: ISnsItem[] | null;
  setPrevSnsId?: (value: number) => void;
  setNextSnsId?: (value: number) => void;
}

interface IPostCommentProps {
  onClose: () => void;
}

export const useGetSnsList = () => {
  return useQuery({
    queryKey: ['snsList'],
    queryFn: async () => {
      const { code, data }: IRes<ISnsItem[]> = await getSnsList();
      if (code === 'OK') {
        return data;
      }
      return null;
    },
  });
};

export const useGetSnsDetail = ({
  snsId,
  snsList,
  setPrevSnsId,
  setNextSnsId,
}: IGetSnsDetailProps) => {
  return useQuery({
    queryKey: ['snsDetail', snsId],
    queryFn: async () => {
      const { code, data }: IRes<ISnsDetail | null> = await getSnsDetail(snsId);
      if (code === 'OK') {
        if (snsList && setPrevSnsId && setNextSnsId) {
          const currentSnsIdx = snsList.findIndex((v) => v.postId === snsId);
          setPrevSnsId(snsList[currentSnsIdx - 1]?.postId);
          setNextSnsId(snsList[currentSnsIdx + 1]?.postId);
        }
        return data;
      }
      return null;
    },
    enabled: !!snsId,
  });
};

export const useGetLatestSnsList = () => {
  return useQuery({
    queryKey: ['latestSnsList'],
    queryFn: async () => {
      const { code, data }: IRes<ILastestSnsItem[]> = await getLatestSnsList();
      if (code === 'OK') {
        return data;
      }
      return null;
    },
  });
};

export const usePostComment = ({ onClose }: IPostCommentProps) => {
  return useMutation({
    mutationFn: postComment,
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        onClose();
      }
      return null;
    },
  });
};

export const useCreatePost = () => {
  const navigate = useRouter();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      if (data.code === 'OK') {
        // TODO: 수정 필요
        navigate.push(`/post/${data.data.postId}`);
      }
    },
  });
};
