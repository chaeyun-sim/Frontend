import { create } from 'zustand';

interface IStore {
  isMyPage: boolean;
  setIsMyPage: (value: boolean) => void;
  memberId: string;
  setMemberId: (value: string) => void;
}

export const useCheckMyPage = create<IStore>()((set) => ({
  isMyPage: false,
  setIsMyPage: (value: boolean) => set({ isMyPage: value }),

  memberId: '',
  setMemberId: (value: string) => set({ memberId: value }),
}));
