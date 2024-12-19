import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Auth {
  // token: string | null;
  // refreshToken: string | null;
  memberId: number | null;
  profileImage: string;
  role: string;
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
      // token: null,
      // refreshToken: null,
      memberId: null,
      profileImage: '',
      role: '',

      setAuth: (auth) => set({ ...auth, isLoggedIn: true }),

      logout: () => {
        localStorage.removeItem('auth-storage');
        set({
          // token: null,
          // refreshToken: null,
          memberId: null,
          profileImage: '',
          role: '',
          isLoggedIn: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // token: state.token,
        // refreshToken: state.refreshToken,
        memberId: state.memberId,
        profileImage: state.profileImage,
        role: state.role,
      }),
    }
  )
);
