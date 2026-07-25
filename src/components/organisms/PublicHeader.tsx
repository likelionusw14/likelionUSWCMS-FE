import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { MobileMenuButton } from '@atoms'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME, NAV_SIDEBAR_TABLET_QUERY, NAV_SIDEBAR_TONE } from '@constants'
import { useAuth, useElementHeight, useMediaQuery, useMobileMenu } from '@hooks'
import type { PublicHeaderProps } from '@types'
import { cn, glassNavTransition } from '@utils'
import { sidebarTransition } from '@templates'
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
  // 태블릿 드로어가 열리면 헤더 햄버거는 오른쪽 밖으로 빠진다. 그동안 X 로 변형시킬 이유도
  // 없으므로(닫기는 드로어 안 X 가 맡는다) 3줄 그대로 밀려나간다.
  const slideOutBurger = menu.isOpen && isTablet
  // 모바일 카드가 화면 최상단에서부터 내려오도록 헤더 실제 높이를 넘긴다(브레이크포인트마다 다르다).
  const headerRef = useRef<HTMLElement>(null)
  const headerHeight = useElementHeight(headerRef)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    // 관리자 셸과 같은 구조 — sticky 래퍼가 헤더(z-30) + 오버레이의 위치·z 기준이 된다.
    // 모바일 카드는 이 헤더 뒤(top-0)에서 내려오고, 스크림(z-10)은 헤더를 덮지 않는다.
    <div className="sticky top-0 z-40">
      {/* 모바일 카드가 열리면 유리판을 걷고 카드와 같은 배경색으로 붙여 한 덩어리로 보이게 한다. */}
      <header
        ref={headerRef}
        className={cn(
          'relative z-30 w-full overflow-hidden transition-colors duration-sidebar ease-sidebar motion-reduce:transition-none',
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
              {/* 계정 아이콘 — 로그인 여부와 무관하게 같은 버튼 구조라 Tab 포커스 시 흰 원(after ring)이
                  똑같이 뜬다. img 로 두면 포커스 자체가 안 잡혀 게스트에서만 링이 없었다.
                  가는 곳만 다르다: 로그인 상태는 마이페이지(/app), 게스트는 로그인(/login). */}
              <motion.button
                layout="position"
                transition={transition}
                type="button"
                onClick={() => navigate(isAuthenticated ? '/app' : '/login')}
                aria-label={isAuthenticated ? '마이페이지' : '로그인'}
                title={isAuthenticated ? '마이페이지' : '로그인'}
                className="relative mr-24 flex h-40 w-[18px] shrink-0 items-center justify-center rounded-full outline-none after:pointer-events-none after:absolute after:left-1/2 after:top-1/2 after:h-40 after:w-40 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-white"
              >
                <img src={userIcon} alt="" className="h-[18px] w-[18px]" />
              </motion.button>
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

          {/* 태블릿 드로어가 열리면 햄버거를 오른쪽 밖으로 밀어낸다 — 그 드로어는 자체 X 를 갖고
              화면을 덮으므로 헤더 버튼이 남을 이유가 없다. 모바일 카드는 반대로 이 버튼(X)이
              유일한 닫기라 그대로 둔다. 드로어와 같은 리듬(sidebarTransition)으로 움직인다. */}
          <motion.div
            inert={slideOutBurger}
            initial={false}
            animate={{ x: slideOutBurger ? '200%' : 0, opacity: slideOutBurger ? 0 : 1 }}
            transition={sidebarTransition(!!reduce)}
            className="shrink-0 lg:hidden"
          >
            <MobileMenuButton
              open={menu.isOpen && !isTablet}
              onToggle={menu.toggle}
              controls={MOBILE_MENU_ID}
              className="h-32 w-32 text-secondary-2 sm:h-40 sm:w-40"
              barClassName="w-16 sm:w-24"
            />
          </motion.div>
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
        headerHeight={headerHeight}
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
