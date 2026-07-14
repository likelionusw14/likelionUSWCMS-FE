import { Outlet } from 'react-router-dom'
import { PublicFooter, PublicHeader } from '@organisms'
import type { PublicShellProps } from '@types'

// 로그인 전(공통) 영역 셸: 다크 배경 + 헤더 + 콘텐츠 + 푸터.
export function PublicShell({ navItems, applyItem }: PublicShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background-2">
      <PublicHeader navItems={navItems} applyItem={applyItem} />
      <main className="flex flex-1 items-center justify-center px-64 py-[120px]">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}
