import { useMutation, useQuery } from '@tanstack/react-query';

import { getStreamerSnsList, postDailyMessage } from '@/apis/streamer';

interface IPostDailyMessageProps {
  setMessage: (value: string) => void;
}

export const useGetStreamerSnsList = () => {
  return useQuery({
    queryKey: ['streamerSnsList'],
    queryFn: async () => {
      const { code, data }: IRes<ISnsItem[]> = await getStreamerSnsList();
      if (code === 'OK') {
        return data;
      }
      return null;
    },
  });
};

export const usePostDailyMessage = ({ setMessage }: IPostDailyMessageProps) => {
  return useMutation({
    mutationFn: postDailyMessage,
    onSuccess: ({ code }: IRes<any>) => {
      if (code === 'OK') {
        setMessage('');
      }
    },
  });
};
