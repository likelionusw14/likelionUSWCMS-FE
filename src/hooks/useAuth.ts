import { useAuthStore } from '@store'
import type { Role } from '@types'

// 인증 상태·역할·액션 접근 seam. 컴포넌트는 이 훅에만 의존한다.
export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  const role: Role = user?.role ?? 'GUEST'
  return { user, token, role, isAuthenticated, login, logout }
}
