import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AdminTopBar, NavSidebar, NavSidebarDrawer, SiteFooter } from '@organisms'
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
      <NavSidebar
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
          <NavSidebarDrawer
            id={SIDEBAR_ID}
            label="관리 메뉴"
            open={sidebar.isOpen}
            onClose={sidebar.close}
            homeItem={homeItem}
            navItems={navItems}
            side="left"
          />
        </div>

        {/* 본문 + 푸터만 내부 스크롤 (스크롤바가 본문 우측에 형성됨).
            relative z-0 로 본문에 자체 스택 컨텍스트를 만든다 — 이게 없으면 본문 안의 z-40/z-50
            (폼 행 겹침 순서, 캘린더 팝업)이 상단바·사이드바 래퍼(z-40)와 같은 층에서 경쟁해
            사이드바를 열었을 때 폼이 사이드바 위로 올라온다. */}
        <div className="relative z-0 flex-1 overflow-y-auto">
          {/* 크로스페이드 — 이전 페이지가 흐려지는 동시에 새 페이지가 진해진다.
              grid 한 칸에 겹쳐 렌더해 스크롤 영역 높이를 유지한다.
              min-w-0: grid item 기본값(min-width:auto = min-content)이면 DataTable 의 minWidth 가
                트랙 폭으로 전파돼 좁은 화면에서 페이지 전체가 표 폭만큼 늘어난다(표는 자체 가로스크롤을 갖는다).
              max-w-[1056px]: Figma 데스크톱 시안이 1280(사이드바 224 + 본문 1056)까지만 정의돼 있다.
              본문이 그 위로 계속 늘어나면 표는 폭이 고정된 열 사이 여백(justify-between 잔여폭)만 벌어져
              해상도마다 간격이 달라진다. 1056 에서 멈추고 가운데 정렬해 1280 이상은 시안과 동일하게 고정한다.
              (사용자 페이지도 같은 규칙으로 max-w-[1280px] 을 쓴다.) */}
          <div className="mx-auto grid min-h-full w-full max-w-[1056px]">
            <AnimatePresence mode="sync">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={pageFadeTransition(!!reduce)}
                className="col-start-1 row-start-1 min-h-full min-w-0"
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
