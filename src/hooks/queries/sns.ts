import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  getLatestSnsList,
  getSnsDetail,
  getSnsList,
  postComment,
  createPost,
  postReportPost,
  postReportComment,
  searchMember,
  deleteSns,
  getMySnsDetail,
} from '@/apis/sns';
import { ModalProps } from '@/components/modal/modal.interface';

export interface IGetSnsListProps {
  setSnsId: (value: number) => void;
}

interface IGetSnsDetailProps {
  snsId?: number;
  snsList?: ISnsItem[] | null;
  setPrevSnsId?: (value: number) => void;
  setNextSnsId?: (value: number) => void;
}

export const useGetSnsList = ({ setSnsId }: IGetSnsListProps) => {
  return useQuery({
    queryKey: ['snsList'],
    queryFn: async () => {
      const { code, data }: IRes<ISnsItem[]> = await getSnsList();
      if (code === 'OK') {
        setSnsId(data[0].postId);
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

export const useGetMySnsDetail = ({ snsId }: { snsId: number }) => {
  return useQuery({
    queryKey: ['mySnsDetail', snsId],
    queryFn: async () => {
      const { code, data }: IRes<IMySnsDetail | null> =
        await getMySnsDetail(snsId);
      if (code === 'OK') {
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

export const usePostComment = ({ onClose }: ModalProps) => {
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
        navigate.push(`/sns/normal/${data.data.postId}`);
      }
    },
  });
};

export const useSearchMember = (nickname: string) => {
  return useQuery<Member[]>({
    queryKey: ['search-member', nickname],
    queryFn: () => searchMember(nickname),
  });
};

export const usePostReportPost = ({ onClose }: ModalProps) => {
  return useMutation({
    mutationFn: postReportPost,
    onSuccess: ({ code }: IRes<null>) => {
      if (code === 'OK') {
        onClose();
      }
      return null;
    },
  });
};

export const usePostReportComment = ({ onClose }: ModalProps) => {
  return useMutation({
    mutationFn: postReportComment,
    onSuccess: ({ code }: IRes<null>) => {
      if (code === 'OK') {
        onClose();
      }
      return null;
    },
  });
};

export const useDeleteSns = ({ onClose }: ModalProps) => {
  return useMutation({
    mutationFn: deleteSns,
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        location.replace('/mypage');
      }
      return null;
    },
  });
};
