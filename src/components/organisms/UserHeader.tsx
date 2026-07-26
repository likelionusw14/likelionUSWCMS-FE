import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import closeIcon from '@/assets/icons/close.svg'
import userIcon from '@/assets/icons/user-white.svg'
import { MobileMenuButton } from '@atoms'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME, NAV_SIDEBAR_TABLET_QUERY, NAV_SIDEBAR_TONE } from '@constants'
import { useElementHeight, useMediaQuery, useMobileMenu } from '@hooks'
import type { UserHeaderProps } from '@types'
import { cn, glassNavTransition } from '@utils'
import { sidebarTransition } from '@templates'
import { NavSidebarDrawer } from './NavSidebarDrawer'

const MOBILE_MENU_ID = 'user-mobile-menu'
const HOME_ITEM = { to: '/app', label: BRAND_NAME }

// Figma 공통 사이드바 — 회원·활동증명서 두 항목만 더 큰 모서리(16px)로 그룹핑되어 있다.
const ROUNDED_16_PATHS = new Set(['/app/members', '/app/certificates'])

// Figma 공통 사이드바 — 상단 두 항목(프로젝트·세션자료)만 40px, 나머지는 44px 높이.
const HEIGHT_40_PATHS = new Set(['/app/projects', '/app/sessions'])

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
  // 태블릿 드로어가 열리면 헤더 햄버거는 오른쪽 밖으로 빠진다. 그동안 X 로 변형시킬 이유도
  // 없으므로(닫기는 드로어 안 X 가 맡는다) 3줄 그대로 밀려나간다.
  const slideOutBurger = menu.isOpen && isTablet
  // 모바일 카드가 화면 최상단에서부터 내려오도록 헤더 실제 높이를 넘긴다(브레이크포인트마다 다르다).
  const headerRef = useRef<HTMLElement>(null)
  const headerHeight = useElementHeight(headerRef)

  return (
    // 관리자 셸과 같은 구조 — sticky 래퍼가 헤더(z-30) + 오버레이의 위치·z 기준이 된다.
    // 모바일 카드는 이 헤더 뒤(top-0)에서 내려오고, 스크림(z-10)은 헤더를 덮지 않는다.
    <div className="sticky top-0 z-40">
      {/* 유리판(그라디언트 + backdrop-blur)은 항상 유지하고, 카드와 같은 배경색만 오버레이로
          덧입혀 페이드한다. 클래스째 바꾸면 backdrop-filter·background-image 는 transition 대상이
          아니라 즉시 꺼지는데 색은 250ms 동안 서서히 차오르므로, 그 사이 블러가 풀려 보였다. */}
      <header
        ref={headerRef}
        className="relative z-30 w-full overflow-hidden bg-gradient-user-header backdrop-blur-header"
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 transition-opacity duration-sidebar ease-sidebar motion-reduce:transition-none',
            NAV_SIDEBAR_TONE[tone].panel,
            tintHeader ? 'opacity-100' : 'opacity-0',
          )}
        />
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
        label="사용자 모바일 메뉴"
        open={menu.isOpen}
        onClose={menu.close}
        homeItem={HOME_ITEM}
        navItems={navItems}
        side="right"
        tone={tone}
        headerHasBrand
        headerHeight={headerHeight}
        onLogout={onLogout}
      />
    </div>
  )
}
