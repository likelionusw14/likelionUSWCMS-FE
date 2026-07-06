import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@types'

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (payload: { token: string; user: User }) => void
  logout: () => void
}

// 인증 상태. 새로고침 유지를 위해 localStorage 에 영속화한다.
// (백엔드 연동 시 토큰 refresh/만료 처리를 여기서 확장)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: ({ token, user }) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'likelion-cms-auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
