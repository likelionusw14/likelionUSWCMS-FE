import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AdminMobileMenu, AdminSidebar, AdminTopBar, SiteFooter } from '@organisms'
import { useMobileMenu } from '@hooks'
import { getAdminBreadcrumb } from '@routes/admin/nav'
import type { AdminSidebarShellProps } from '@types'
import { AnimatedOutlet } from './AnimatedOutlet'
import { pageFadeTransition } from './transitions'

const MOBILE_MENU_ID = 'admin-mobile-menu'

// 관리 페이지 셸: 좌측 사이드바(lg 이상) + 고정 상단바 + 본문 스크롤 영역 + 푸터.
// lg 미만에서는 사이드바를 숨기고 상단바 햄버거 → AdminMobileMenu 패널이 같은 메뉴를 제공한다.
export function AdminSidebarShell({ homeItem, navItems }: AdminSidebarShellProps) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const menu = useMobileMenu()
  const { title, breadcrumb } = getAdminBreadcrumb(location.pathname)

  return (
    <div className="flex h-screen overflow-hidden bg-background-1">
      <AdminSidebar homeItem={homeItem} navItems={navItems} />
      <div className="flex min-w-px flex-1 flex-col overflow-hidden">
        {/* 상단바 고정 (스크롤바 밖) — 모바일 메뉴는 이 컨테이너 기준으로 아래에 펼쳐진다. */}
        <div className="relative z-20 shrink-0">
          <AdminTopBar
            title={title}
            breadcrumb={breadcrumb}
            menuOpen={menu.isOpen}
            onMenuToggle={menu.toggle}
            menuControls={MOBILE_MENU_ID}
          />
          <AdminMobileMenu
            id={MOBILE_MENU_ID}
            open={menu.isOpen}
            onClose={menu.close}
            homeItem={homeItem}
            navItems={navItems}
          />
        </div>

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
                transition={pageFadeTransition(!!reduce)}
                className="col-start-1 row-start-1 min-h-full"
              >
                <AnimatedOutlet />
              </motion.div>
            </AnimatePresence>
          </div>
          <SiteFooter variant="light" />
        </div>
      </div>
    </div>
  )
}
