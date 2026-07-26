import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import closeIcon from '@/assets/icons/close.svg'
import userIcon from '@/assets/icons/user-white.svg'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { cn, glassNavTransition } from '@utils'

const MOBILE_MENU_LABELS: Record<string, string> = {
  '/app/projects': '프로젝트',
  '/app/sessions': '세션자료',
  '/app/notices': '공지',
  '/app/schedule': '일정',
  '/app/attendance': '출결',
  '/app/members': '회원',
  '/app/certificates': '활동증명서 발급',
}

// Figma 공통 사이드바 — 회원·활동증명서 두 항목만 더 큰 모서리(16px)로 그룹핑되어 있다.
const ROUNDED_16_PATHS = new Set(['/app/members', '/app/certificates'])

// Figma 공통 사이드바 — 상단 두 항목(프로젝트·세션자료)만 40px, 나머지는 44px 높이.
const HEIGHT_40_PATHS = new Set(['/app/projects', '/app/sessions'])

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

    const previousOverflow = document.body.style.overflow

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <>
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
      </header>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setMenuOpen(false)}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="fixed inset-0 z-30 cursor-default bg-black/30 lg:hidden"
            />

            <motion.nav
              id="user-mobile-menu"
              aria-label="사용자 모바일 메뉴"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: '100%' }}
              transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
              className="fixed inset-y-0 right-0 z-40 flex w-[280px] max-w-[85vw] flex-col gap-24 bg-background-1 px-4 pb-8 pt-24 opacity-100 shadow-drop lg:hidden"
            >
              <div className="flex items-center justify-between px-24">
                <NavLink
                  to="/app"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-8 text-sm-22 text-secondary-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary-2"
                >
                  {BRAND_NAME}
                </NavLink>
                <button
                  type="button"
                  aria-label="메뉴 닫기"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-24 w-24 items-center justify-center rounded-8 outline-none focus-visible:ring-2 focus-visible:ring-secondary-2"
                >
                  <img src={closeIcon} alt="" className="h-24 w-24" />
                </button>
              </div>

              <div className="flex flex-col">
                {navItems
                  .filter((item) => MOBILE_MENU_LABELS[item.to])
                  .map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center px-24 text-sm-16 text-black outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-primary',
                          HEIGHT_40_PATHS.has(item.to) ? 'h-40' : 'h-[44px]',
                          ROUNDED_16_PATHS.has(item.to) ? 'rounded-16' : 'rounded-8',
                          isActive && 'bg-primary text-white hover:bg-primary',
                        )
                      }
                    >
                      {MOBILE_MENU_LABELS[item.to]}
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
