import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks'
import { AdminFooter, AdminHeader } from '@organisms'
import type { AdminShellProps } from '@types'

// 관리자 영역 셸: 상단 헤더 + 콘텐츠 + 푸터.
export function AdminShell({ navItems, pageTitles }: AdminShellProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background-1">
      <AdminHeader title={pageTitles[pathname] ?? ''} navItems={navItems} onLogout={handleLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  )
}
