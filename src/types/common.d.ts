// /types: TypeScript 타입 정의 파일을 저장하는 폴더

interface IRes<T> {
  code: string;
  data: T;
  message: string;
}

type TSns = 'KAKAO' | 'GOOGLE' | 'NAVER';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

type TRole = 'MEMBER' | 'STREAMER';
