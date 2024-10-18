// /utils: 유틸리티 함수들을 저장하는 폴더

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
