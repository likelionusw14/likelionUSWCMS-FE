import { motion, useReducedMotion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { MobileMenuButton } from '@atoms'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME, NAV_SIDEBAR_TABLET_QUERY, NAV_SIDEBAR_TONE } from '@constants'
import { useAuth, useMediaQuery, useMobileMenu } from '@hooks'
import type { PublicHeaderProps } from '@types'
import { cn, glassNavTransition } from '@utils'

import { NavSidebarDrawer } from './NavSidebarDrawer'

const MOBILE_MENU_ID = 'public-mobile-menu'
const HOME_ITEM = { to: '/', label: BRAND_NAME }

// CTA(마이페이지·로그아웃)는 lg 이상 헤더에만 있어, lg 미만에서는 드로어가 유일한 진입점이다.
const DRAWER_CTA =
  'flex h-48 items-center justify-center rounded-full bg-gradient-user-menu text-sm-18 text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'

// 공통(마케팅) 헤더 — UserHeader 와 같은 앱바(backdrop-blur + Primary 세로 그라디언트 유리판) +
// 같은 GlassNavMenu(유리 알약 메뉴, 슬라이딩 캡슐·Tab 포커스 애니메이션 공유) 위에
// 브랜드 + 계정 버튼. sticky 로 콘텐츠 위에 얹어야 블러 대상(아래 다크 배경/히어로)이 성립한다.
// 게스트: 계정 아이콘(비활성). 로그인: 마이페이지(/app) 링크 + 로그아웃 CTA.
// lg 미만에서는 알약 메뉴/CTA 를 숨기고 관리자와 같은 NavSidebar 를 우측 드로어로 쓴다
// — 알약 메뉴가 375px 에서 260px 넘쳐 랜딩 페이지 가로 스크롤을 만들던 문제.
export function PublicHeader({ navItems, tone = 'light' }: PublicHeaderProps) {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const transition = glassNavTransition(!!reduce)
  const menu = useMobileMenu()
  // 모바일 카드만 헤더 바로 아래에 붙으므로 그때만 헤더도 같은 색으로 물들인다.
  // 태블릿 드로어는 화면을 덮는 별개 패널이라 헤더는 유리판 그대로 둔다.
  const isTablet = useMediaQuery(NAV_SIDEBAR_TABLET_QUERY)
  const tintHeader = menu.isOpen && !isTablet

  function handleLogout() {
    logout()
    navigate('/')
  }

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
        <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-24 py-16 sm:px-32 lg:px-64">
          <NavLink
            to="/"
            onClick={menu.close}
            className="rounded-8 text-sm-22 text-secondary-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:text-h1"
          >
            {BRAND_NAME}
          </NavLink>

          <div className="hidden items-center gap-24 lg:flex">
            <GlassNavMenu navItems={navItems}>
              {isAuthenticated ? (
                <motion.button
                  layout="position"
                  transition={transition}
                  type="button"
                  onClick={() => navigate('/app')}
                  aria-label="마이페이지"
                  className="relative mr-24 flex h-40 w-[18px] shrink-0 items-center justify-center rounded-full outline-none after:pointer-events-none after:absolute after:left-1/2 after:top-1/2 after:h-40 after:w-40 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-white"
                >
                  <img src={userIcon} alt="" className="h-[18px] w-[18px]" />
                </motion.button>
              ) : (
                <motion.img
                  layout="position"
                  transition={transition}
                  src={userIcon}
                  alt="계정"
                  className="mr-24 h-[18px] w-[18px] shrink-0"
                />
              )}
            </GlassNavMenu>

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-48 items-center justify-center rounded-full bg-gradient-user-menu px-16 text-sm-18 text-white outline-none backdrop-blur-menu focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                로그아웃
              </button>
            )}
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
        label="공통 모바일 메뉴"
        open={menu.isOpen}
        onClose={menu.close}
        homeItem={HOME_ITEM}
        navItems={navItems}
        side="right"
        tone={tone}
        headerHasBrand
      >
        {isAuthenticated && (
          <div className="flex flex-col gap-8 px-4">
            <NavLink to="/app" onClick={menu.close} className={DRAWER_CTA}>
              마이페이지
            </NavLink>
            <button
              type="button"
              onClick={() => {
                menu.close()
                handleLogout()
              }}
              className={DRAWER_CTA}
            >
              로그아웃
            </button>
          </div>
        )}
      </NavSidebarDrawer>
    </div>
  )
}
