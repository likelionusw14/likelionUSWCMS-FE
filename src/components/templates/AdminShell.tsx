import type { ReactNode } from 'react'
import { Sidebar } from '@organisms'

interface AdminShellProps {
  children: ReactNode
}

// 관리자 페이지 공통 셸: 좌측 Sidebar + 상단 헤더 + 콘텐츠 영역.
export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex h-screen bg-surface-subtle">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-surface-border bg-surface-base px-6">
          <span className="text-sm font-medium text-content-muted">관리자 콘솔</span>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
