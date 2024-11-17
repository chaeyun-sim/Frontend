import { useEffect, useState } from 'react';

import { getItem } from '@/utils/localStorage';

export const useAuth = () => {
  const token = getItem('@token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return { isLoggedIn, token };
};
