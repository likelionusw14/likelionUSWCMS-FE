import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { MobileMenuButton } from '@atoms'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME } from '@constants'
import { useMobileMenu } from '@hooks'
import type { UserHeaderProps } from '@types'
import { cn, glassNavTransition } from '@utils'

const MOBILE_MENU_ID = 'user-mobile-menu'

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(GlassNavMenu, UserHeader/PublicHeader 공유) + 계정 버튼.
// Figma 717:1684. 헤더는 backdrop-blur(2.5)위에 Primary 세로 그라디언트(30%->2%)를 얹은
// 유리판이라, 아래 본문이 옅게 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야
// 이 효과가 성립한다. lg 미만에서는 알약 메뉴 대신 햄버거 → 우측 드로어를 쓴다.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  const reduce = useReducedMotion()
  const transition = glassNavTransition(!!reduce)
  const menu = useMobileMenu()

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-gradient-user-header backdrop-blur-header">
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
              aria-label="사용자 모바일 메뉴"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: '100%' }}
              transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
              className="fixed inset-y-0 right-0 z-40 flex w-[280px] max-w-[85vw] flex-col bg-white px-16 pb-24 pt-24 opacity-100 shadow-drop lg:hidden"
            >
              <div className="mb-16 flex items-center justify-between px-8">
                <NavLink
                  to="/app"
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
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
