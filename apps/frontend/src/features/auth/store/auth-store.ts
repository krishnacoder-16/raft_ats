import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '../types';

export interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem('access_token', token);
        }
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem('access_token');
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'raft-auth-storage',
    }
  )
);
