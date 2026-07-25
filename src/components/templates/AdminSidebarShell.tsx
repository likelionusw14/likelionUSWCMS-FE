import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AdminSidebar, AdminSidebarDrawer, AdminTopBar, SiteFooter } from '@organisms'
import { useAdminSidebar } from '@hooks'
import { getAdminBreadcrumb } from '@routes/admin/nav'
import type { AdminSidebarShellProps } from '@types'
import { AnimatedOutlet } from './AnimatedOutlet'
import { pageFadeTransition } from './transitions'

const SIDEBAR_ID = 'admin-sidebar'

// 관리 페이지 셸: 좌측 사이드바 + 고정 상단바 + 본문 스크롤 영역 + 푸터.
// lg 이상은 224px 컬럼이 항상 떠 있고(접지 않는다 — Figma 페이지 시안에 닫기·햄버거가 없다),
// lg 미만에서만 useAdminSidebar 상태로 오버레이가 열린다 — 태블릿은 좌측 드로어, 모바일은 상단바 아래 드롭다운.
// 오버레이는 사이드바 안 X 로 닫고 상단바 햄버거로 다시 연다.
export function AdminSidebarShell({ homeItem, navItems }: AdminSidebarShellProps) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const sidebar = useAdminSidebar()
  const { title, breadcrumb } = getAdminBreadcrumb(location.pathname)

  return (
    <div className="flex h-screen overflow-hidden bg-background-1">
      <AdminSidebar
        homeItem={homeItem}
        navItems={navItems}
        className="hidden w-[224px] shrink-0 lg:flex"
      />
      <div className="flex min-w-px flex-1 flex-col overflow-hidden">
        {/* 상단바 고정 (스크롤바 밖). 오버레이 사이드바의 위치 기준이자 z 층 컨테이너다 —
            모바일 드롭다운은 이 박스 바로 아래(top-full)에 붙고, 상단바(z-30)는 스크림(z-10) 위에 남는다. */}
        <div className="relative z-40 shrink-0">
          <div className="relative z-30">
            <AdminTopBar
              title={title}
              breadcrumb={breadcrumb}
              sidebarOpen={sidebar.isOpen}
              onSidebarOpen={sidebar.open}
              sidebarControls={SIDEBAR_ID}
            />
          </div>
          <AdminSidebarDrawer
            id={SIDEBAR_ID}
            open={sidebar.isOpen}
            onClose={sidebar.close}
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
