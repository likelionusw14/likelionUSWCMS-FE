import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { cn, glassNavTransition } from '@utils'

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(GlassNavMenu, UserHeader/PublicHeader 공유) + 계정 버튼.
// Figma 717:1684. 헤더는 backdrop-blur(2.5)위에 Primary 세로 그라디언트(30%->2%)를 얹은
// 유리판이라, 아래 본문이 옅게 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야
// 이 효과가 성립한다.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  const reduce = useReducedMotion()
  const transition = glassNavTransition(!!reduce)
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  function handleMobileLogout() {
    setMenuOpen(false)
    onLogout()
  }

  return (
    <header className="sticky top-0 z-20 w-full bg-gradient-user-header backdrop-blur-header">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-16 py-16 sm:px-32 lg:px-64">
        <NavLink
          to="/app"
          onClick={() => setMenuOpen(false)}
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

        <button
          type="button"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls="user-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-32 w-32 flex-col items-center justify-center gap-4 rounded-8 text-secondary-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary-2 sm:h-40 sm:w-40 lg:hidden"
        >
          <span
            className={cn(
              'h-[2px] w-16 bg-secondary-2 transition-transform sm:w-24',
              menuOpen && 'translate-y-[6px] rotate-45',
            )}
          />
          <span
            className={cn(
              'h-[2px] w-16 bg-secondary-2 transition-opacity sm:w-24',
              menuOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'h-[2px] w-16 bg-secondary-2 transition-transform sm:w-24',
              menuOpen && '-translate-y-[6px] -rotate-45',
            )}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="user-mobile-menu"
            aria-label="사용자 모바일 메뉴"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: 'easeInOut' }}
            className="absolute inset-x-0 top-full overflow-hidden border-t border-primary/10 bg-background-1 shadow-drop lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-[1280px] flex-col px-16 py-16 sm:px-32">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-8 px-16 py-12 text-m-16 text-black outline-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary',
                      isActive && 'bg-primary text-white hover:bg-primary',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={handleMobileLogout}
                className="mt-8 rounded-8 px-16 py-12 text-left text-m-16 text-error outline-none hover:bg-error/10 focus-visible:ring-2 focus-visible:ring-error"
              >
                로그아웃
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
