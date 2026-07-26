import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NAV_SIDEBAR_TABLET_QUERY } from '@constants'
import { useMediaQuery } from '@hooks'
import { sidebarTransition } from '@templates'
import { cn } from '@utils'
import type { NavSidebarDrawerProps } from '@types'
import { NavSidebar } from './NavSidebar'

// Tailwind sm — 이 아래(모바일)는 Figma 사이드바가 375 전폭 카드(1356:10670 / 1360:11172)라
// 헤더 아래로 펼쳐지고, 여기부터 lg 미만(태블릿)은 224px 세로 드로어(1356:10648)라 옆에서 밀려나온다.

// lg 미만 사이드바 오버레이 — 관리자·사용자·게스트가 같은 것을 쓴다.
// 내용은 데스크톱 컬럼과 완전히 같은 NavSidebar 라 세 폭에서 메뉴가 어긋나지 않고,
// 폭에 따라 나오는 방식만 바뀐다: 모바일은 헤더 아래로 내려오는 전폭 카드, 태블릿은 측면 드로어.
// side 는 그 측면 드로어가 붙는 쪽 — 햄버거 위치를 따라간다(관리자 좌측 / 사용자·게스트 우측).
// 위치 기준은 헤더 래퍼(relative)다: 모바일 카드는 헤더 바로 아래(top-full)에 붙고,
// 스크림은 헤더보다 아래 층(z-10)이라 헤더는 덮이지 않는다.
// headerHasBrand: 바로 위 헤더가 이미 브랜드 + 햄버거(열리면 X)를 띄우는 경우(사용자·게스트).
// 그때 모바일 카드는 그 헤더에 딱 붙으므로 브랜드 행을 또 두면 같은 줄이 두 번 보인다 — 생략한다.
// 태블릿 드로어는 화면 높이를 다 덮어 헤더가 가려지므로 두 경우 모두 자기 브랜드 행을 갖는다.
// (관리자 상단바는 브레드크럼·제목이라 중복이 없어 모바일에서도 그대로 붙는다.)
export function NavSidebarDrawer({
  id,
  label,
  open,
  onClose,
  homeItem,
  navItems,
  side = 'left',
  tone = 'light',
  headerHasBrand = false,
  headerHeight = 0,
  onLogout,
}: NavSidebarDrawerProps) {
  const reduce = useReducedMotion()
  const isTablet = useMediaQuery(NAV_SIDEBAR_TABLET_QUERY)
  const hidden = isTablet ? { x: side === 'left' ? '-100%' : '100%' } : { y: '-100%' }
  const showBrand = isTablet || !headerHasBrand

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
            transition={sidebarTransition(!!reduce)}
            // 태블릿(sm~lg): 드로어가 화면 높이를 다 쓰므로 헤더까지 함께 어두워져야 한 덩어리로 보인다.
            // 헤더 래퍼와 같은 z-30 이지만 DOM 뒤라 위에 깔린다(패널은 z-40 이라 계속 그 위).
            // 모바일(<sm): 카드가 헤더 '아래'에 붙고 그 뒤(z-20)에서 밀려나오므로,
            // 헤더는 스크림 위(z-30)에 남겨 햄버거·제목이 계속 보이게 둔다.
            className="fixed inset-0 z-10 cursor-default bg-black/30 sm:z-30 lg:hidden"
          />

          <motion.div
            id={id}
            role="dialog"
            aria-label={label}
            initial={reduce ? false : hidden}
            animate={{ x: 0, y: 0 }}
            exit={reduce ? undefined : hidden}
            transition={sidebarTransition(!!reduce)}
            // 모바일 카드는 헤더 높이만큼 위쪽을 비워 두고 화면 최상단(기준 박스의 top-0)에 건다.
            // 그래야 y:-100% 일 때 카드의 아래 끝이 정확히 브라우저 최상단에 놓여, 헤더 아래가
            // 아니라 화면 맨 위에서부터 내려오고 올라간다. 비운 자리는 헤더가 덮는다.
            style={isTablet ? undefined : { paddingTop: headerHeight }}
            className={cn(
              'overflow-y-auto shadow-drop lg:hidden',
              isTablet
                ? // 태블릿 — 화면 높이 전체를 차지하는 측면 드로어(헤더 위 z-40).
                  cn(
                    'fixed inset-y-0 z-40 w-[224px] max-w-[85vw]',
                    side === 'left' ? 'left-0' : 'right-0',
                  )
                : // 모바일 — 헤더 뒤(z-20)에서 밀려나오는 전폭 카드.
                  'absolute inset-x-0 top-0 z-20 max-h-screen rounded-b-16',
            )}
          >
            <NavSidebar
              homeItem={showBrand ? homeItem : undefined}
              navItems={navItems}
              onClose={onClose}
              tone={tone}
              onLogout={onLogout}
              className="min-h-full"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
