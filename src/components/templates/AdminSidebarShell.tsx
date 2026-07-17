import { useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AdminFooter, AdminSidebar, AdminTopBar } from '@organisms'
import type { AdminSidebarShellProps } from '@types'

// AnimatePresence 로 크로스페이드하는 동안 나가는(exit) 인스턴스가 '이전 라우트' 내용을
// 유지하도록 outlet 을 최초 마운트 시점 값으로 고정한다. (useOutlet 은 매 렌더 새 라우트를 준다.)
function AnimatedOutlet() {
  const outlet = useOutlet()
  const [snapshot] = useState(outlet)
  return <>{snapshot}</>
}

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
          {/* 크로스페이드 — 이전 페이지가 흐려지는 동시에 새 페이지가 진해진다.
              grid 한 칸에 겹쳐 렌더해 스크롤 영역 높이를 유지한다. */}
          <div className="grid min-h-full">
            <AnimatePresence mode="sync">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: 'easeInOut' }}
                className="col-start-1 row-start-1 min-h-full"
              >
                <AnimatedOutlet />
              </motion.div>
            </AnimatePresence>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  )
}
