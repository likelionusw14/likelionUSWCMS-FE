import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks'
import { SiteFooter, UserHeader } from '@organisms'
import type { UserShellProps } from '@types'

// 사용자 영역 공통 셸 — 상단 내비게이션 + 콘텐츠 + 푸터.
export function UserShell({ navItems }: UserShellProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background-1">
      <UserHeader navItems={navItems} onLogout={handleLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter variant="light" />
    </div>
  )
}
