import { Navigate } from 'react-router-dom'
import { useLoginForm } from '@hooks'
import { LoginForm } from '@organisms'

// 로그인 라우트는 폼 상태 훅과 폼 UI 를 조합만 한다.
export function LoginPage() {
  const { role, setRole, id, setId, error, redirectTo, handleSubmit } = useLoginForm()

  // 이미 로그인 상태면 자기 홈으로.
  if (redirectTo) return <Navigate to={redirectTo} replace />

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <LoginForm
        role={role}
        onRoleChange={setRole}
        id={id}
        onIdChange={setId}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
