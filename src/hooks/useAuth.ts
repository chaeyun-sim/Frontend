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
    window.location.href = '/';
  };

  return { isLoggedIn, token, logout };
};
