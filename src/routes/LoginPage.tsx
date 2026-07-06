import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@atoms'
import { ROLE_LABEL, roleHome } from '@constants'
import { useAuth, useLogin } from '@hooks'
import type { Role } from '@types'

// 데모 로그인: 백엔드 연동 전, 역할을 선택해 각 영역을 확인한다.
const DEMO_ROLES: Role[] = ['GUEST', 'MEMBER', 'STAFF']

export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, role: currentRole, logout } = useAuth()
  const { loginAs } = useLogin()
  const [role, setRole] = useState<Role>('MEMBER')
  const [id, setId] = useState('')
  const [error, setError] = useState('')

  // 이미 로그인 상태면 자기 홈으로.
  if (isAuthenticated) return <Navigate to={roleHome(currentRole)} replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    // 게스트는 비로그인 상태로 공통 영역만 둘러본다.
    if (role === 'GUEST') {
      logout()
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

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[320px] rounded border border-gray-300 bg-white p-32"
      >
        <h1 className="text-sm-22 text-gray-900">멋사 USW CMS</h1>
        <p className="mb-24 mt-4 text-r-14 text-gray-700">로그인 (백엔드 연동 전 데모)</p>

        <label htmlFor="login-role" className="mb-4 block text-r-14 text-gray-700">
          역할 선택
        </label>
        <select
          id="login-role"
          value={role}
          onChange={(event) => setRole(event.target.value as Role)}
          className="mb-12 w-full rounded border border-gray-300 px-12 py-8 text-r-14 outline-none focus:border-primary"
        >
          {DEMO_ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABEL[r]}
            </option>
          ))}
        </select>

        <input
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="아이디 (선택)"
          aria-label="아이디"
          className="mb-12 w-full rounded border border-gray-300 px-12 py-8 text-r-14 outline-none focus:border-primary"
        />
        {error ? <p className="mb-12 text-r-14 text-error">{error}</p> : null}
        <Button type="submit" className="w-full">
          {role === 'GUEST' ? '게스트로 둘러보기' : '로그인'}
        </Button>
      </form>
    </div>
  )
}
