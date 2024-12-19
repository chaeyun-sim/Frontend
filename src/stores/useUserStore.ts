import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TRole = string;

interface IStore {
  role: string;
  setUserRole: (role: TRole) => void;
}

const initialState = {
  role: '',
};

export const useUserStore = create<IStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUserRole: (role) => set((state) => ({ ...state, role })),
    }),
    { name: 'user' }
  )
);
