import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AdminSidebar, AdminSidebarDrawer, AdminTopBar, SiteFooter } from '@organisms'
import { useAdminSidebar } from '@hooks'
import { getAdminBreadcrumb } from '@routes/admin/nav'
import type { AdminSidebarShellProps } from '@types'
import { AnimatedOutlet } from './AnimatedOutlet'
import { pageFadeTransition } from './transitions'

const SIDEBAR_ID = 'admin-sidebar'

// 관리 페이지 셸: 접이식 좌측 사이드바 + 고정 상단바 + 본문 스크롤 영역 + 푸터.
// 사이드바 상태는 하나(useAdminSidebar)로, lg 이상은 기본 열림(흐름 안 고정 컬럼),
// lg 미만은 기본 닫힘(AdminSidebarDrawer 가 왼쪽에서 밀어 넣는 오버레이)이다.
// 닫으면 상단바에 여는 햄버거가 나타난다 — Figma 의 사이드바 X ↔ 상단바 햄버거 관계.
export function AdminSidebarShell({ homeItem, navItems }: AdminSidebarShellProps) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const sidebar = useAdminSidebar()
  const { title, breadcrumb } = getAdminBreadcrumb(location.pathname)

  return (
    <div className="flex h-screen overflow-hidden bg-background-1">
      {sidebar.isOpen && (
        <AdminSidebar
          homeItem={homeItem}
          navItems={navItems}
          onClose={sidebar.close}
          className="hidden lg:flex"
        />
      )}
      <AdminSidebarDrawer
        id={SIDEBAR_ID}
        open={sidebar.isOpen}
        onClose={sidebar.close}
        homeItem={homeItem}
        navItems={navItems}
      />
      <div className="flex min-w-px flex-1 flex-col overflow-hidden">
        {/* 상단바 고정 (스크롤바 밖) */}
        <AdminTopBar
          title={title}
          breadcrumb={breadcrumb}
          sidebarOpen={sidebar.isOpen}
          onSidebarOpen={sidebar.open}
          sidebarControls={SIDEBAR_ID}
        />

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
