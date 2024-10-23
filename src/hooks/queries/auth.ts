import { useMutation } from '@tanstack/react-query';

import { login } from '@/apis/auth';
import { IRes } from '@/types/common';

const useSocialLogin = ({
  successCallback,
}: {
  successCallback: (
    data: IRes<{ accessToken: string; refreshToken: string }>
  ) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      snsType,
      authCode,
    }: {
      snsType: string;
      authCode: string;
    }) => login(snsType, authCode),
    onSuccess: successCallback,
  });
};

export { useSocialLogin };
