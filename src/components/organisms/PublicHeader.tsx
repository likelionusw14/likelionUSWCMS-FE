import { motion, useReducedMotion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME } from '@constants'
import { useAuth } from '@hooks'
import type { PublicHeaderProps } from '@types'
import { glassNavTransition } from '@utils'

// 공통(마케팅) 헤더 — UserHeader 와 같은 앱바(backdrop-blur + Primary 세로 그라디언트 유리판) +
// 같은 GlassNavMenu(유리 알약 메뉴, 슬라이딩 캡슐·Tab 포커스 애니메이션 공유) 위에
// 브랜드 + 계정 버튼. sticky 로 콘텐츠 위에 얹어야 블러 대상(아래 다크 배경/히어로)이 성립한다.
// 게스트: 계정 아이콘(비활성) + 지원하기 CTA. 로그인: 마이페이지(/app) 링크 + 로그아웃 CTA.
export function PublicHeader({ navItems, applyItem }: PublicHeaderProps) {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const transition = glassNavTransition(!!reduce)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-gradient-user-header backdrop-blur-header">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <NavLink
          to="/"
          className="rounded-8 text-h1 text-secondary-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          {BRAND_NAME}
        </NavLink>

        <div className="flex items-center gap-24">
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
      </div>
    </header>
  )
}
