import { create } from 'zustand';

interface IStore {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
}

export const usePostContent = create<IStore>()((set) => ({
  title: '',
  content: '',
  setTitle: (value: string) => set({ title: value }),
  setContent: (value: string) => set({ content: value }),
}));
