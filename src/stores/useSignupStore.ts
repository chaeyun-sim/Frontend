import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ITerms {
  usageAgree: boolean;
  personalAgree: boolean;
  withdrawalAgree: boolean;
}

interface IStore {
  usageAgree: boolean;
  personalAgree: boolean;
  withdrawalAgree: boolean;
  setTerms: (terms: ITerms) => void;
}

const initialState = {
  usageAgree: false,
  personalAgree: false,
  withdrawalAgree: false,
};

export const useSignupStore = create<IStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTerms: (terms) => set((state) => ({ ...state, ...terms })),
    }),
    { name: 'signup' }
  )
);
