import { useState } from 'react';

export const useToggle = () => {
  const [boolValue, setBoolValue] = useState(false);

  const toggle = () => setBoolValue(!boolValue);

  return { boolValue, toggle };
};
