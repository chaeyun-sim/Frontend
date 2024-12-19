import { useMutation, useQuery } from '@tanstack/react-query';

import { getStreamerSnsList, postDailyMessage } from '@/apis/streamer';

import { IGetSnsListProps } from './sns';

interface IPostDailyMessageProps {
  setMessage: (value: string) => void;
}

export const useGetStreamerSnsList = ({ setSnsId }: IGetSnsListProps) => {
  return useQuery({
    queryKey: ['streamerSnsList'],
    queryFn: async () => {
      const { code, data }: IRes<ISnsItem[]> = await getStreamerSnsList();
      if (code === 'OK') {
        setSnsId(data[0].postId);
        return data;
      }
      return null;
    },
  });
};

export const usePostDailyMessage = ({ setMessage }: IPostDailyMessageProps) => {
  return useMutation({
    mutationFn: postDailyMessage,
    onSuccess: ({ code }: IRes<null>) => {
      if (code === 'OK') {
        setMessage('');
      }
    },
  });
};
