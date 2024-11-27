import { useState } from 'react';

export const useToggle = (initState: boolean) => {
  const [isOpen, setIsOpen] = useState(initState);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleToggle,
  };
};
