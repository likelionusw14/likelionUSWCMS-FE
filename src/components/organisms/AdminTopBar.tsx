import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import topbarLogoutIcon from '@/assets/icons/topbar-logout.svg'
import { MobileMenuButton } from '@atoms'
import { useLogout } from '@hooks'
import { pageFadeTransition } from '@templates'
import type { AdminTopBarProps } from '@types'

// 셸(AdminSidebarShell)이 상단에 고정하는 UI 컴포넌트.
// title·breadcrumb 는 셸에서 계산해 prop 으로 내려준다(dumb organism). 경로 변경 시 크로스페이드.
// 사이드바가 닫혀 있을 때만 좌측에 여는 햄버거가 붙는다 — Figma 상단바의 '모바일 햄버거메뉴'
// 레이어가 데스크톱 인스턴스에서만 숨겨져 있는 것과 같은 규칙(20x20, secondary-2, 3줄).
export function AdminTopBar({
  title,
  breadcrumb,
  sidebarOpen,
  onSidebarOpen,
  sidebarControls,
}: AdminTopBarProps) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const handleLogout = useLogout()

  return (
    <div className="flex w-full shrink-0 items-center justify-between gap-24 overflow-hidden bg-white px-24 py-16">
      {!sidebarOpen && (
        <MobileMenuButton
          open={false}
          onToggle={onSidebarOpen}
          controls={sidebarControls}
          label="사이드바 열기"
          className="h-20 w-20 shrink-0 text-secondary-2"
          barClassName="w-[18px]"
        />
      )}
      <div className="grid flex-1">
        <AnimatePresence mode="sync">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={pageFadeTransition(!!reduce)}
            className="col-start-1 row-start-1 flex flex-col gap-4"
          >
            <p className="text-r-14 text-primary/60">
              {breadcrumb.map((segment, index) => (
                <span key={`${segment.label}-${index}`}>
                  {index > 0 && <span className="px-4"> / </span>}
                  <Link
                    to={segment.to || location.pathname}
                    className="transition-colors hover:text-primary"
                  >
                    {segment.label}
                  </Link>
                </span>
              ))}
            </p>
            <h1 className="text-sm-22 text-black">{title}</h1>
          </motion.div>
        </AnimatePresence>
      </div>
      <button type="button" onClick={handleLogout} aria-label="로그아웃" title="로그아웃">
        <img src={topbarLogoutIcon} alt="" className="h-24 w-24" />
      </button>
    </div>
  )
}
