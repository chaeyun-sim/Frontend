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
      const { code, data }: IRes<ISnsItem[] | null> = await getSnsList();
      if (code === 'OK' && data) {
        const currentSnsIdx = data?.findIndex((v) => v.postId === snsId);

        setPrevSnsId(data[currentSnsIdx - 1]?.postId);
        setNextSnsId(data[currentSnsIdx + 1]?.postId);

        return data;
      }
    },
  });
};

export const useGetSnsDetail = (snsId: number) => {
  return useQuery({
    queryKey: ['snsDetail', snsId],
    queryFn: async () => {
      const { code, data }: IRes<ISnsDetail | null> = await getSnsDetail(snsId);
      if (code === 'OK') {
        return data;
      }
    },
    enabled: !!snsId,
  });
};

export const useGetPostingFollowings = () => {
  return useQuery({
    queryKey: ['postingFollowings'],
    queryFn: async () => {
      const { code, data }: IRes<IPostingFollowing> =
        await getPostingFollowings();
      if (code === 'OK') {
        return [data];
      }
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
