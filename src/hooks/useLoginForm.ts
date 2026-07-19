import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { roleHome } from '@constants'
import { useAuth } from './useAuth'
import { useLogin } from './useLogin'
import type { Role } from '@types'

// AGENTS.md에 라우트에는 비즈니스 로직을 직접 넣지말고 훅과 컴포넌트를 조합하도록 명시되어있으므로 분리한 훅.
// 로그인 폼 상태·제출 흐름. 라우트는 이 훅과 폼 UI 조합만 담당하도록 했음.
export function useLoginForm() {
  const navigate = useNavigate()
  const { isAuthenticated, role: currentRole } = useAuth()
  const { loginAs } = useLogin()
  const [role, setRole] = useState<Role>('MEMBER')
  const [id, setId] = useState('')
  const [error, setError] = useState('')

  // 이미 로그인 상태면 자기 영역 홈으로 보낼 대상 경로이고 없으면 null로 처리하도록 했음.
  const redirectTo = isAuthenticated ? roleHome(currentRole) : null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    // 게스트는 비로그인 상태로 공통 영역만 둘러본다.
    if (role === 'GUEST') {
      navigate('/')
      return
    }
    try {
      const user = await loginAs(role, id)
      navigate(roleHome(user.role))
    } catch {
      setError('로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return { role, setRole, id, setId, error, redirectTo, handleSubmit }
}
