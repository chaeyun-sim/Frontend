import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getPostingFollowings,
  getSnsDetail,
  getSnsList,
  postComment,
  createPost,
  ICreatePost,
} from '@/apis/sns';

interface IGetSnsDetailProps {
  snsId: number;
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
      const { code, data }: IRes<ISnsItem[] | null> = await getSnsList();
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
    enabled: !!snsId && !!snsList,
  });
};

export const useGetPostingFollowings = () => {
  return useQuery({
    queryKey: ['postingFollowings'],
    queryFn: async () => {
      const { code, data }: IRes<IProfile> = await getPostingFollowings();
      if (code === 'OK') {
        return [data];
      }
      return null;
    },
  });
};

export const usePostComment = ({ onClose }: IPostCommentProps) => {
  return useMutation({
    mutationFn: (data: IPostCommentReq) => postComment(data),
    onSuccess: ({ code }: IRes<any>) => {
      if (code === 'OK') {
        onClose();
      }
      return null;
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
