import { Navigate, useNavigate } from 'react-router-dom'
import { roleHome } from '@constants'
import { useAuth } from '@hooks'
import { SocialLoginPanel } from '@organisms'

// 소셜(카카오) 로그인. OAuth 연동 전이라 가입 플로우(추가정보 입력)로 바로 보낸다.
export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, role } = useAuth()

  if (isAuthenticated) return <Navigate to={roleHome(role)} replace />

  return <SocialLoginPanel onKakaoLogin={() => navigate('/signup/profile')} />
}
