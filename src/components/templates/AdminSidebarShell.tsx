import { useLocation, Outlet } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { AdminFooter, AdminSidebar, AdminTopBar } from '@organisms'
import type { AdminSidebarShellProps } from '@types'

// 관리 페이지 셸: 좌측 사이드바 + 고정 상단바 + 본문 스크롤 영역 + 푸터.

export function AdminSidebarShell({ homeItem, navItems }: AdminSidebarShellProps) {
  const location = useLocation()
  const reduce = useReducedMotion()
  return (
    <div className="flex h-screen overflow-hidden bg-background-1">
      <AdminSidebar homeItem={homeItem} navItems={navItems} />
      <div className="flex min-w-px flex-1 flex-col overflow-hidden">
        {/* 상단바 고정 (스크롤바 밖) */}
        <AdminTopBar />

        {/* 본문 + 푸터만 내부 스크롤 (스크롤바가 본문 우측에 형성됨) */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.12 }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
          <AdminFooter />
        </div>
      </div>
    </div>
  )
}
