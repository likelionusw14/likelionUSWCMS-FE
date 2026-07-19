import { motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { GlassNavMenu } from '@molecules'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { glassNavTransition } from '@utils'

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(GlassNavMenu, UserHeader/PublicHeader 공유) + 계정 버튼.
// Figma 717:1684. 헤더는 backdrop-blur(2.5)위에 Primary 세로 그라디언트(30%->2%)를 얹은
// 유리판이라, 아래 본문이 옅게 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야
// 이 효과가 성립한다.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  const reduce = useReducedMotion()
  const transition = glassNavTransition(!!reduce)

  return (
    <header className="sticky top-0 z-10 w-full bg-gradient-user-header backdrop-blur-header">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <NavLink
          to="/app"
          className="rounded-8 text-h1 text-secondary-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          {BRAND_NAME}
        </NavLink>

        <GlassNavMenu navItems={navItems}>
          <motion.button
            layout="position"
            transition={transition}
            type="button"
            onClick={onLogout}
            aria-label="로그아웃"
            title="로그아웃"
            className="h-40 w-40 shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            <motion.img layout="position" transition={transition} src={userIcon} alt="" className="h-full w-full" />
          </motion.button>
        </GlassNavMenu>
      </div>
    </header>
  )
}
