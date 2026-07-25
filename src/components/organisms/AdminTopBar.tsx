import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import topbarLogoutIcon from '@/assets/icons/topbar-logout.svg'
import { MobileMenuButton } from '@atoms'
import { useLogout } from '@hooks'
import { pageFadeTransition } from '@templates'
import type { AdminTopBarProps } from '@types'

// 셸(AdminSidebarShell)이 상단에 고정하는 UI 컴포넌트.
// title·breadcrumb 는 셸에서 계산해 prop 으로 내려준다(dumb organism). 경로 변경 시 크로스페이드.
// lg 미만(사이드바가 숨는 구간)에서는 좌측에 햄버거가 붙는다 — Figma 관리자페이지 상단바 모바일.
export function AdminTopBar({
  title,
  breadcrumb,
  menuOpen,
  onMenuToggle,
  menuControls,
}: AdminTopBarProps) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const handleLogout = useLogout()

  return (
    <div className="flex w-full shrink-0 items-center justify-between gap-24 overflow-hidden bg-white px-24 py-16">
      <MobileMenuButton
        open={menuOpen}
        onToggle={onMenuToggle}
        controls={menuControls}
        className="h-20 w-20 shrink-0 text-black lg:hidden"
        barClassName="w-20"
      />
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
