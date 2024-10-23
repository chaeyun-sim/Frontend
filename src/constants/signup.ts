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
