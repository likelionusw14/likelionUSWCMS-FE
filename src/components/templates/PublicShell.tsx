import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PublicFooter, PublicHeader } from '@organisms'
import type { PublicShellProps } from '@types'

// 로그인 전(공통) 영역 셸: 다크 배경 + 헤더 + 콘텐츠 + 푸터.
export function PublicShell({ navItems, applyItem }: PublicShellProps) {
  const location = useLocation()
  const variants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  }
  return (
    <div className="flex min-h-screen flex-col bg-background-2">
      <PublicHeader navItems={navItems} applyItem={applyItem} />
      <main className="flex flex-1 items-center justify-center px-64 py-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex w-full justify-center"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <PublicFooter />
    </div>
  )
}
