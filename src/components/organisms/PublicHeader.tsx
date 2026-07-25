import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { MobileMenuButton } from '@atoms'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME } from '@constants'
import { useAuth, useMobileMenu } from '@hooks'
import type { PublicHeaderProps } from '@types'
import { cn, glassNavTransition } from '@utils'

const MOBILE_MENU_ID = 'public-mobile-menu'

// 공통(마케팅) 헤더 — UserHeader 와 같은 앱바(backdrop-blur + Primary 세로 그라디언트 유리판) +
// 같은 GlassNavMenu(유리 알약 메뉴, 슬라이딩 캡슐·Tab 포커스 애니메이션 공유) 위에
// 브랜드 + 계정 버튼. sticky 로 콘텐츠 위에 얹어야 블러 대상(아래 다크 배경/히어로)이 성립한다.
// 게스트: 계정 아이콘(비활성) + 지원하기 CTA. 로그인: 마이페이지(/app) 링크 + 로그아웃 CTA.
// lg 미만에서는 알약 메뉴/CTA 를 숨기고 UserHeader 와 같은 우측 드로어(useMobileMenu 공유)를 쓴다
// — 알약 메뉴가 375px 에서 260px 넘쳐 랜딩 페이지 가로 스크롤을 만들던 문제.
export function PublicHeader({ navItems, applyItem }: PublicHeaderProps) {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const transition = glassNavTransition(!!reduce)
  const menu = useMobileMenu()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-gradient-user-header backdrop-blur-header">
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

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-48 items-center justify-center rounded-full bg-gradient-user-menu px-16 text-sm-18 text-white outline-none backdrop-blur-menu focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                로그아웃
              </button>
            ) : (
              <NavLink
                to={applyItem.to}
                className="flex h-48 items-center justify-center rounded-full bg-gradient-user-menu px-16 text-sm-18 text-white outline-none backdrop-blur-menu focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                {applyItem.label}
              </NavLink>
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

      <AnimatePresence initial={false}>
        {menu.isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="메뉴 닫기"
              onClick={menu.close}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="fixed inset-0 z-30 cursor-default bg-black/30 lg:hidden"
            />

            <motion.nav
              id={MOBILE_MENU_ID}
              aria-label="공통 모바일 메뉴"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: '100%' }}
              transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
              className="fixed inset-y-0 right-0 z-40 flex w-[280px] max-w-[85vw] flex-col bg-white px-16 pb-24 pt-24 shadow-drop lg:hidden"
            >
              <div className="mb-16 flex items-center justify-between px-8">
                <NavLink
                  to="/"
                  onClick={menu.close}
                  className="rounded-8 text-sm-22 text-secondary-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary-2"
                >
                  {BRAND_NAME}
                </NavLink>
                <button
                  type="button"
                  aria-label="메뉴 닫기"
                  onClick={menu.close}
                  className="flex h-32 w-32 items-center justify-center rounded-8 text-sm-22 text-secondary-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary-2"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={menu.close}
                    className={({ isActive }) =>
                      cn(
                        'rounded-8 px-16 py-12 text-sm-16 text-black outline-none hover:bg-background-1 focus-visible:ring-2 focus-visible:ring-primary',
                        isActive && 'bg-background-1',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-24 flex flex-col gap-8">
                {isAuthenticated ? (
                  <>
                    <NavLink
                      to="/app"
                      onClick={menu.close}
                      className="flex h-48 items-center justify-center rounded-full bg-gradient-user-menu text-sm-18 text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                    >
                      마이페이지
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => {
                        menu.close()
                        handleLogout()
                      }}
                      className="flex h-48 items-center justify-center rounded-full bg-gradient-user-menu text-sm-18 text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <NavLink
                    to={applyItem.to}
                    onClick={menu.close}
                    className="flex h-48 items-center justify-center rounded-full bg-gradient-user-menu text-sm-18 text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                  >
                    {applyItem.label}
                  </NavLink>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
