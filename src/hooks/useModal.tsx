import { useState } from 'react';

export const useModal = <T extends string | number>() => {
  const [activeModal, setActiveModal] = useState<T | null>(null);

  const openModal = (modalType: T) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  return {
    activeModal,
    openModal,
    closeModal,
    isOpen: activeModal !== null,
  };
};
