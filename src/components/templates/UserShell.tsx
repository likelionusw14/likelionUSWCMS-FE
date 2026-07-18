import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks'
import { UserFooter, UserHeader } from '@organisms'
import type { UserShellProps } from '@types'

// 사용자 영역 공통 셸 — 상단 내비게이션 + 콘텐츠 + 푸터.
export function UserShell({ navItems }: UserShellProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background-1">
      <UserHeader
        navItems={navItems}
        onLogout={handleLogout}
        variant={location.pathname === '/app' ? 'home' : 'default'}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  )
}
