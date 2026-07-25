import { motion, useReducedMotion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { MobileMenuButton } from '@atoms'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME, NAV_SIDEBAR_TABLET_QUERY, NAV_SIDEBAR_TONE } from '@constants'
import { useMediaQuery, useMobileMenu } from '@hooks'
import type { UserHeaderProps } from '@types'
import { cn, glassNavTransition } from '@utils'
import { NavSidebarDrawer } from './NavSidebarDrawer'

const MOBILE_MENU_ID = 'user-mobile-menu'
const HOME_ITEM = { to: '/app', label: BRAND_NAME }

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(GlassNavMenu, UserHeader/PublicHeader 공유) + 계정 버튼.
// Figma 717:1684. 헤더는 backdrop-blur(2.5)위에 Primary 세로 그라디언트(30%->2%)를 얹은
// 유리판이라, 아래 본문이 옅게 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야
// 이 효과가 성립한다. lg 미만에서는 알약 메뉴 대신 햄버거 → 관리자와 같은 NavSidebar 우측 드로어.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  const reduce = useReducedMotion()
  const transition = glassNavTransition(!!reduce)
  const menu = useMobileMenu()
  const { pathname } = useLocation()
  // 홈(/app)은 어두운 히어로 위에 얹히므로 드로어도 어두운 테마로 뒤집는다.
  const isHome = pathname === '/app'
  const tone = isHome ? 'dark' : 'light'
  // 모바일 카드만 헤더 바로 아래에 붙으므로 그때만 헤더도 같은 색으로 물들인다.
  // 태블릿 드로어는 화면을 덮는 별개 패널이라 헤더는 유리판 그대로 둔다.
  const isTablet = useMediaQuery(NAV_SIDEBAR_TABLET_QUERY)
  const tintHeader = menu.isOpen && !isTablet

  return (
    // 관리자 셸과 같은 구조 — sticky 래퍼가 헤더(z-30) + 오버레이의 위치·z 기준이 된다.
    // 모바일 카드는 이 헤더 바로 아래(top-full)에 붙고, 스크림(z-10)은 헤더를 덮지 않는다.
    <div className="sticky top-0 z-40">
      {/* 모바일 카드가 열리면 유리판을 걷고 카드와 같은 배경색으로 붙여 한 덩어리로 보이게 한다. */}
      <header
        className={cn(
          'relative z-30 w-full transition-colors duration-200 motion-reduce:transition-none',
          tintHeader
            ? NAV_SIDEBAR_TONE[tone].panel
            : 'bg-gradient-user-header backdrop-blur-header',
        )}
      >
        <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-16 py-16 sm:px-32 lg:px-64">
          <NavLink
            to="/app"
            onClick={menu.close}
            className="rounded-8 text-sm-22 text-secondary-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:text-h1"
          >
            {BRAND_NAME}
          </NavLink>

          <div className="hidden lg:block">
            <GlassNavMenu navItems={navItems}>
              <motion.button
                layout="position"
                transition={transition}
                type="button"
                onClick={onLogout}
                aria-label="로그아웃"
                title="로그아웃"
                className="relative mr-24 flex h-40 w-[18px] shrink-0 items-center justify-center rounded-full outline-none after:pointer-events-none after:absolute after:left-1/2 after:top-1/2 after:h-40 after:w-40 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-white"
              >
                <img src={userIcon} alt="" className="h-[18px] w-[18px]" />
              </motion.button>
            </GlassNavMenu>
          </div>

          <MobileMenuButton
            open={menu.isOpen}
            onToggle={menu.toggle}
            controls={MOBILE_MENU_ID}
            className="h-32 w-32 text-secondary-2 sm:h-40 sm:w-40 lg:hidden"
            barClassName="w-16 sm:w-24"
          />
        </div>
      </header>

      <NavSidebarDrawer
        id={MOBILE_MENU_ID}
        label="사용자 모바일 메뉴"
        open={menu.isOpen}
        onClose={menu.close}
        homeItem={HOME_ITEM}
        navItems={navItems}
        side="right"
        tone={tone}
        headerHasBrand
      />
    </div>
  )
}
