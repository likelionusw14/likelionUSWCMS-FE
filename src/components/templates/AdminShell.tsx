import { Outlet, useLocation } from 'react-router-dom'
import { AdminFooter, AdminHeader } from '@organisms'
import type { AdminShellProps } from '@types'

// 관리자 영역 셸: 상단 헤더 + 콘텐츠 + 푸터.
export function AdminShell({ navItems, pageTitles }: AdminShellProps) {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-background-1">
      <AdminHeader title={pageTitles[pathname] ?? ''} navItems={navItems} />
      <main className="flex-1">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  )
}
