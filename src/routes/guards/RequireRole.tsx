import { Navigate, Outlet } from 'react-router-dom'
import { canAccess, roleHome } from '@constants'
import { useAuth } from '@hooks'
import type { AreaType } from '@types'

interface RequireRoleProps {
  area: AreaType
}

// 영역 접근 가드. 권한 없으면 비로그인은 로그인으로, 로그인 상태는 자기 홈으로 보낸다.
export function RequireRole({ area }: RequireRoleProps) {
  const { role, isAuthenticated } = useAuth()

  if (canAccess(role, area)) return <Outlet />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Navigate to={roleHome(role)} replace />
}
