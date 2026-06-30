import { Outlet } from 'react-router-dom'
import { AdminShell } from '@templates'

// 인증된 관리자 영역의 공통 레이아웃 라우트.
export function RootLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  )
}
