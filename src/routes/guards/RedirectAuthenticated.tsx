import { Navigate, Outlet } from 'react-router-dom'
import { roleHome } from '@constants'
import { useAuth } from '@hooks'

// 로그인 전 랜딩(/) 가드 — RequireRole 과 반대 방향이다.
// 로그인 상태로 마케팅 홈에 오면 자기 영역 홈으로 돌려보낸다(아기사자 -> /app, 운영진 -> /admin).
// 게스트 콘텐츠(/projects·/notices 등)는 로그인 사용자도 그대로 볼 수 있어야 하므로 여기에 걸지 않는다.
// roleHome 이 '/' 인 역할(게스트)은 자기 자신으로 보내면 무한 루프라 그대로 통과시킨다.
export function RedirectAuthenticated() {
  const { role, isAuthenticated } = useAuth()
  const home = roleHome(role)

  if (isAuthenticated && home !== '/') return <Navigate to={home} replace />
  return <Outlet />
}
