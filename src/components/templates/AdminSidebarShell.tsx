import { Outlet } from 'react-router-dom'
import { AdminFooter, AdminSidebar } from '@organisms'
import type { AdminSidebarShellProps } from '@types'

// 관리 페이지 셸: 좌측 사이드바 + (상단바는 각 페이지가 렌더) 콘텐츠 + 푸터.
export function AdminSidebarShell({ homeItem, navItems }: AdminSidebarShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background-1">
      <AdminSidebar homeItem={homeItem} navItems={navItems} />
      <div className="flex min-w-px flex-1 flex-col overflow-y-auto">
        <div className="flex-1">
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}
