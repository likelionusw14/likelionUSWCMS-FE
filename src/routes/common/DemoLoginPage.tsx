import { Navigate } from 'react-router-dom'
import { useLoginForm } from '@hooks'
import { LoginForm } from '@organisms'

// 개발용 역할 선택 로그인 (/login/demo). 카카오 OAuth 연동 전까지 각 영역에 진입하는 통로다.
export function DemoLoginPage() {
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
