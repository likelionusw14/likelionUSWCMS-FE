import { useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AdminFooter, AdminSidebar, AdminTopBarRender } from '@organisms'
import type { AdminSidebarShellProps } from '@types'

// 관리 페이지 셸: 좌측 사이드바 + (상단바는 각 페이지가 렌더) 콘텐츠 + 푸터.
function AnimatedOutlet() {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <>{outlet}</>
}

export function AdminSidebarShell({ homeItem, navItems }: AdminSidebarShellProps) {
  const location = useLocation()
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
  return (
    <div className="flex h-screen overflow-hidden bg-background-1">
      <AdminSidebar homeItem={homeItem} navItems={navItems} />
      <div className="flex min-w-px flex-1 flex-col overflow-hidden">
        {/* 상단바 고정 (스크롤바 밖) */}
        <AdminTopBarRender />

        {/* 본문 + 푸터만 내부 스크롤 (스크롤바가 본문 우측에 형성됨) */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="min-h-full"
            >
              <AnimatedOutlet />
            </motion.div>
          </AnimatePresence>
          <AdminFooter />
        </div>
      </div>
    </div>
  )
}
