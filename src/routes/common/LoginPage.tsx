import { Navigate } from 'react-router-dom'
import { roleHome } from '@constants'
import { useAuth, useKakaoLogin } from '@hooks'
import { SocialLoginPanel } from '@organisms'

// 소셜(카카오) 로그인 진입.
// 실제 인증은 백엔드가 수행한다 — 버튼은 브라우저를 /auth/kakao/login 으로 넘기고,
// 되돌아오는 착지 지점(/auth/callback)에서 세션을 교환한다.
export function LoginPage() {
  const { isAuthenticated, role } = useAuth()
  const { startKakaoLogin } = useKakaoLogin()

  if (isAuthenticated) return <Navigate to={roleHome(role)} replace />

  return <SocialLoginPanel onKakaoLogin={startKakaoLogin} />
}
