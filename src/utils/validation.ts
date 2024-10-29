export const validateNickname = (nickname: string) => {
  return {
    1: nickname.length < 13, // 12자 이하
    2: /^[a-zA-Z0-9가-힣!@#$%^&*()\-_+={}[\];:',.<>/?\\|~"·]*$/.test(nickname), // 한글, 영문, 숫자, 특수문자 사용 가능
    3: /^[a-zA-Z0-9가-힣()\-_:]*$/.test(nickname), // 특수문자 (  )   -   _   : 사용 가능
  };
};
