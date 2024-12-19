import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IStore {
  role: TRole;
  setUserRole: (role: TRole) => void;
}

export const useUserStore = create<IStore>()(
  persist(
    (set) => ({
      role: 'MEMBER',
      setUserRole: (role) => set((state) => ({ ...state, role })),
    }),
    { name: 'user' }
  )
);
