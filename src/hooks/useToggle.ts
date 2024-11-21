import { useState } from 'react';

const useToggle = (initState: boolean) => {
  const [isOpen, setIsOpen] = useState(initState);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleToggle,
  };
};

export default useToggle;
