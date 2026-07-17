import { useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PublicFooter, PublicHeader } from '@organisms'
import type { PublicShellProps } from '@types'

// 로그인 전(공통) 영역 셸: 다크 배경 + 헤더 + 콘텐츠 + 푸터.
function AnimatedOutlet() {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <>{outlet}</>
}

export function PublicShell({ navItems, applyItem }: PublicShellProps) {
  const location = useLocation()
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
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
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="flex w-full justify-center"
          >
            <AnimatedOutlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <PublicFooter />
    </div>
  )
}
