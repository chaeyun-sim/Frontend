type TSignupTerm = 'service' | 'privacy' | 'withdrawal';

type TSignupStep = 'terms' | 'info' | 'complete';

interface ISignupRes {
  accessToken: string;
  refreshToken: string;
}
