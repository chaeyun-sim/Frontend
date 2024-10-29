import { useState } from 'react';

interface IProps {
  isOpen: boolean;
  text: string;
  isError: boolean;
}

const useToast = () => {
  const [toast, setToast] = useState<IProps>({
    isOpen: false,
    text: '',
    isError: false,
  });

  const handleOpenToast = (text: string, isError: boolean) => {
    setToast({ isOpen: true, text, isError });
  };

  const handleCloseToast = () => {
    setToast({ isOpen: false, text: '', isError: false });
  };

  return {
    toast,
    handleOpenToast,
    handleCloseToast,
  };
};

export default useToast;
