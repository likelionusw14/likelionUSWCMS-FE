import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLogout } from '@hooks'
import { AdminFooter, AdminHeader } from '@organisms'
import type { AdminShellProps } from '@types'
import { AnimatedOutlet } from './AnimatedOutlet'
import { pageFadeTransition, pageFadeVariants } from './transitions'

// 대시보드 홈 셸: 상단 헤더(영역 네비) + 본문 + 푸터. 관리 페이지는 AdminSidebarShell 을 쓴다.
export function AdminShell({ navItems, pageTitles }: AdminShellProps) {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const handleLogout = useLogout()

  return (
    <div className="flex min-h-screen flex-col bg-background-1">
      <AdminHeader title={pageTitles[pathname] ?? ''} navItems={navItems} onLogout={handleLogout} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageFadeVariants}
            transition={pageFadeTransition(!!reduce)}
          >
            <AnimatedOutlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <AdminFooter />
    </div>
  )
}
