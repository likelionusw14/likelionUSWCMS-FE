import { apiClient, endpoints } from '@api'
import { isBackendConnected } from '@config'
import { ROLE_LABEL } from '@constants'
import { useAuthStore } from '@store'
import type { Role, User } from '@types'

// 로그인 seam. 백엔드 미연동 시 선택한 역할로 mock 로그인, 연동 시 실제 API 호출.
// (컴포넌트는 loginAs 시그니처에만 의존 — 백엔드 연동 시 내부만 교체)
export function useLogin() {
  const login = useAuthStore((s) => s.login)

  async function loginAs(role: Role, id: string): Promise<User> {
    if (isBackendConnected) {
      const { data } = await apiClient.post<{ token: string; user: User }>(endpoints.login, { id })
      login(data)
      return data.user
    }
    // 데모: 선택한 역할로 mock 유저 생성
    const user: User = {
      id: id || `demo-${role.toLowerCase()}`,
      name: ROLE_LABEL[role],
      role,
    }
    login({ token: `demo-${role.toLowerCase()}-token`, user })
    return user
  }

  return { loginAs }
}
