export const SIGNUP_PROCESS_STEPS = [
  { title: '약관 동의', iconName: 'agree' },
  { title: '사용자 정보', iconName: 'profile' },
  { title: '가입 완료', iconName: 'celebrate' },
];

export const SIGNUP_TERMS = [
  { id: 'service', value: '이용 약관' },
  { id: 'privacy', value: '개인 정보 수집 및 저장' },
  { id: 'withdrawal', value: '회원 탈퇴 시 처리 방안' },
];

export const SIGNUP_TERMS_CONTENT: { [key in TSignupTerm]: string } = {
  service: '이용 약관 내용',
  privacy: '개인 정보 수집 및 저장 내용',
  withdrawal: '회원 탈퇴 시 처리 방안 내용',
};

export const SIGNUP_NICKNAME_VALIDATIONS = [
  { id: 1, value: '12자 이하' },
  { id: 2, value: '한글, 영문, 숫자, 특수문자 사용 가능' },
  { id: 3, value: '특수문자 (  )   -   _   : 사용 가능' },
];

export const SIGNUP_SUB_TITLES: { [key: string]: string } = {
  terms: '가입을 통해 다양한 서비스를 이용해보세요!',
  info: '서비스 이용을 위해 사용자 정보를 입력해주세요.',
};

export const SIGNUP_STEPS: { [key: string]: number } = {
  terms: 0,
  info: 1,
  complete: 2,
};
