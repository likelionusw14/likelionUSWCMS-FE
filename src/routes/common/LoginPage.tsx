import { Navigate } from 'react-router-dom'
import { roleHome } from '@constants'
import { useAuth } from '@hooks'
import { SocialLoginPanel } from '@organisms'

// 소셜(카카오) 로그인. 카카오 OAuth 연동 전이라 버튼 동작은 아직 비어 있다.
export function LoginPage() {
  const { isAuthenticated, role } = useAuth()

  if (isAuthenticated) return <Navigate to={roleHome(role)} replace />

  return <SocialLoginPanel />
}
