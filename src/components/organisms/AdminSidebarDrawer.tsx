import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '@hooks'
import { cn } from '@utils'
import type { AdminSidebarDrawerProps } from '@types'
import { AdminSidebar } from './AdminSidebar'

// Tailwind sm — 이 아래(모바일)는 Figma 사이드바가 375 전폭 카드(1356:10670)라 상단바 아래로 펼쳐지고,
// 여기부터 lg 미만(태블릿)은 224px 세로 드로어(1356:10648)라 왼쪽에서 밀려나온다.
const TABLET_QUERY = '(min-width: 640px)'

// lg 미만 관리자 사이드바 오버레이. 내용은 데스크톱과 완전히 같은 AdminSidebar 를 그대로 담아
// 세 폭에서 메뉴가 어긋나지 않게 하고, 폭에 따라 나오는 방향(아래 / 왼쪽)만 바꾼다.
// 셸의 상단바 래퍼(relative) 안에 있어 모바일 드롭다운은 상단바 바로 아래에 붙고,
// 스크림은 상단바보다 아래 층(z-10)이라 상단바는 덮이지 않는다.
export function AdminSidebarDrawer({
  id,
  open,
  onClose,
  homeItem,
  navItems,
}: AdminSidebarDrawerProps) {
  const reduce = useReducedMotion()
  const isTablet = useMediaQuery(TABLET_QUERY)
  const hidden = isTablet ? { x: '-100%' } : { y: '-100%' }

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
            className="fixed inset-0 z-10 cursor-default bg-black/30 lg:hidden"
          />

          <motion.div
            id={id}
            initial={reduce ? false : hidden}
            animate={{ x: 0, y: 0 }}
            exit={reduce ? undefined : hidden}
            transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
            className={cn(
              'overflow-y-auto shadow-drop lg:hidden',
              isTablet
                ? // 태블릿 — 화면 높이 전체를 차지하는 좌측 드로어(상단바 위 z-40).
                  'fixed inset-y-0 left-0 z-40 w-[224px] max-w-[85vw]'
                : // 모바일 — 상단바(=위치 기준) 바로 아래로 내려오는 전폭 카드. 상단바 뒤(z-20)에서 밀려나온다.
                  // max-h 의 100% 는 기준 박스(상단바) 높이라 calc 로 '상단바 아래 남은 화면'이 된다.
                  'absolute inset-x-0 top-full z-20 max-h-[calc(100vh-100%)] rounded-b-16',
            )}
          >
            <AdminSidebar
              homeItem={homeItem}
              navItems={navItems}
              onClose={onClose}
              className="min-h-full"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
