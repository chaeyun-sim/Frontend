import { useMutation } from '@tanstack/react-query';

import { postDailyMessage } from '@/apis/streamer';

interface IPostDailyMessageProps {
  setMessage: (value: string) => void;
}

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
