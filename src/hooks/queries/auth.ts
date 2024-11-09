import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  getCheckNickname,
  getServeNickname,
  login,
  postUser,
} from '@/apis/auth';
import { setItem } from '@/utils/localStorage';

interface ICheckNicknameProps {
  nickname: string;
  setHasDuplicatedNickname: (value: boolean) => void;
  setIsDuplicatedNickname: (value: boolean) => void;
  handleOpenToast: (text: string, isError: boolean) => void;
}

interface IServeNicknameProps {
  setNickname: (value: string) => void;
}

interface ISignupProps {
  handleChangeStep: (step: number) => void;
}

const useSocialLogin = ({
  successCallback,
}: {
  successCallback: (
    data: IRes<{ accessToken: string; refreshToken: string }>
  ) => void;
}) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      snsType,
      authCode,
    }: {
      snsType: string;
      authCode: string;
    }) => await login(snsType, authCode),
    onSuccess: successCallback,
    onError: (error: unknown, { snsType }) => {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as any;
        const status = axiosError.response?.status;

        switch (status) {
          case 400:
            console.error('인가 코드를 확인해주세요');
            console.error(error);
            router.push('/');
            break;
          case 401: {
            console.error('가입되지 않은 회원입니다');
            const oauthToken = axiosError.response?.data?.data;
            setItem('@oauthToken', oauthToken);
            router.push(`/signup/${snsType}`);
            break;
          }
          case 500:
            console.error('서버 오류가 발생했습니다');
            console.error(error);
            break;
          default:
            console.error(
              '알 수 없는 에러가 발생했습니다',
              axiosError.response?.data
            );
        }
      }
    },
  });
};

const useCheckNickname = ({
  nickname,
  setHasDuplicatedNickname,
  setIsDuplicatedNickname,
  handleOpenToast,
}: ICheckNicknameProps) => {
  return useQuery({
    queryKey: ['checkNickname', nickname],
    queryFn: async () => {
      try {
        const { code } = await getCheckNickname(nickname);
        if (code === 'OK') {
          setHasDuplicatedNickname(true);
          setIsDuplicatedNickname(true);
          handleOpenToast('사용 가능한 아이디입니다.', false);
        }
      } catch (e: any) {
        if (e.code === 'DUPLICATED_NICKNAME_ERROR') {
          setHasDuplicatedNickname(true);
          setIsDuplicatedNickname(false);
          handleOpenToast('중복된 아이디입니다.', true);
        }
      }
      return null;
    },
    enabled: false,
  });
};

const useServeNickname = ({ setNickname }: IServeNicknameProps) => {
  return useQuery({
    queryKey: ['serveNickname'],
    queryFn: async () => {
      const { code, data } = await getServeNickname();
      if (code === 'OK') {
        setNickname(data.nicknames[0]);
      }
      return null;
    },
    enabled: false,
  });
};

export const useSignup = ({ handleChangeStep }: ISignupProps) => {
  return useMutation({
    mutationFn: (formData: FormData) => postUser('KAKAO', formData),
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        handleChangeStep(2);
      }
    },
  });
};

export { useSocialLogin, useCheckNickname, useServeNickname };
