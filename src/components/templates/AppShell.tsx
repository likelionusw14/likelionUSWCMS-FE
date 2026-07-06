import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@atoms'
import { ROLE_LABEL } from '@constants'
import { useAuth } from '@hooks'
import { Sidebar } from '@organisms'
import type { AppShellProps } from '@types'

// 로그인 영역 공통 셸: 좌측 Sidebar + 상단 헤더(영역/사용자/로그아웃) + 콘텐츠.
export function AppShell({ areaLabel, navItems }: AppShellProps) {
  const navigate = useNavigate()
  const { user, role, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar navItems={navItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-[56px] items-center justify-between border-b border-gray-300 bg-white px-24">
          <span className="text-m-14 text-gray-700">{areaLabel} 콘솔</span>
          <div className="flex items-center gap-12">
            <span className="text-r-14 text-gray-500">
              {ROLE_LABEL[role]}
              {user ? ` · ${user.name}` : ''}
            </span>
            <Button variant="ghost" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-24">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
