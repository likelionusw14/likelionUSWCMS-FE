import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { AdminSidebarDrawerProps } from '@types'
import { AdminSidebar } from './AdminSidebar'

// lg 미만 관리자 사이드바 — 왼쪽에서 밀려나오는 오버레이 드로어.
// 내용은 데스크톱과 완전히 같은 AdminSidebar 를 그대로 담아, 두 폭에서 메뉴가 어긋나지 않게 한다.
// (사용자·공통 헤더는 우측 드로어를 쓰지만, 관리자는 원래 좌측 사이드바라 방향을 왼쪽으로 맞췄다.)
export function AdminSidebarDrawer({
  id,
  open,
  onClose,
  homeItem,
  navItems,
}: AdminSidebarDrawerProps) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence initial={false}>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="사이드바 닫기"
            onClick={onClose}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="fixed inset-0 z-30 cursor-default bg-black/30 lg:hidden"
          />

          <motion.div
            id={id}
            initial={reduce ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: '-100%' }}
            transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 z-40 lg:hidden"
          >
            <AdminSidebar
              homeItem={homeItem}
              navItems={navItems}
              onClose={onClose}
              className="h-full max-w-[85vw] overflow-y-auto shadow-drop"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
