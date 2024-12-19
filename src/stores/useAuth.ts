import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Auth {
  token: string | null;
  refreshToken: string | null;
  memberId: number | null;
  profileImage: string;
}

interface IStore extends Auth {
  isLoggedIn: boolean;
  setAuth: (auth: Auth) => void;
  logout: () => void;
}

export const useAuth = create<IStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      refreshToken: null,
      memberId: null,
      profileImage: '',

      setAuth: (auth) => set({ ...auth, isLoggedIn: true }),

      logout: () => {
        localStorage.removeItem('auth-storage');
        set({
          token: null,
          refreshToken: null,
          memberId: null,
          profileImage: '',
          isLoggedIn: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        memberId: state.memberId,
        isLoggedIn: !!state.token,
      }),
    }
  )
);
