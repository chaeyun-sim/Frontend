import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Auth {
  token: string | null;
  refreshToken: string | null;
  memberId: number | null;
  role: string | null;
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
      role: null,
      profileImage: '',

      setAuth: (auth) => set({ ...auth, isLoggedIn: true }),

      logout: () => {
        localStorage.removeItem('auth-storage');
        set({
          token: null,
          refreshToken: null,
          memberId: null,
          role: null,
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
        role: state.role,
        profileImage: state.profileImage,
        isLoggedIn: !!state.token,
      }),
    }
  )
);
