import { useEffect, useState } from 'react';

import { getItem, removeItem } from '@/utils/localStorage';

export const useAuth = () => {
  const token = getItem('@token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const logout = () => {
    removeItem('@token');
    removeItem('@refresh');
    setIsLoggedIn(false);
    // TODO: 로그인이 필요없는 사이트는 현재 위치에 남고, 로그인이 필요하다면 홈으로 이동
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  return { isLoggedIn, token, logout };
};
