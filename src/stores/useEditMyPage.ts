import { create } from 'zustand';

interface IStore {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const useEditMyPage = create<IStore>()((set) => ({
  isEditing: false,
  setIsEditing: (value: boolean) => set({ isEditing: value }),
}));
