import { useState } from 'react';

export const useToggle = (initState?: boolean) => {
  const [bool, setBool] = useState(!!initState);

  const handleToggle = () => setBool((prev) => !prev);

  const changeToTrue = () => setBool(true);
  const changeToFalse = () => setBool(false);

  return {
    value: bool,
    handleToggle,
    options: {
      changeToTrue,
      changeToFalse,
    },
  };
};
