import { motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { cn } from '@utils'

const MotionNavLink = motion.create(NavLink)

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(활성 항목은 유리 캡슐 강조) + 계정 버튼.
// Figma 717:1684. 헤더 자체는 배경색이 없고 backdrop-blur(2.5)만 있는 유리판이라,
// 아래 본문이 그대로 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야 이 효과가 성립한다.
// 메뉴 항목 사이는 균일 gap-24 (좌표 계산 검증됨). 활성 캡슐은 별도 "OO 유리" 레이어 —
// 좌우 대칭 px-16. 단 첫 항목(프로젝트)은 비활성 상태일 때만 pl-24 여백이 추가로 있다
// (Figma 717:1689 히든 idle 레이어에서 확인 — 활성 glass 상태의 px-16 과는 별개).
// 활성 캡슐은 layoutId 공유 레이아웃 애니메이션으로 항목 사이를 슬라이딩하고, 각 항목·메뉴바
// 자체도 layout 으로 폭 변화가 부드럽게 이어지도록 한다.
// 키보드 focus 는 Figma 에 정의되지 않았지만(디자인 툴이 focus 상태를 모델링하지 않음),
// 메뉴 항목·계정 버튼은 별도 링 대신 활성 상태와 동일한 유리 캡슐(rounded-full bg-white/20
// shadow-drop)을 그대로 포커스 표시로 재사용한다. 유리 캡슐이 없는 브랜드 링크만 링을 쓴다.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  const reduce = useReducedMotion()
  const transition = { duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <header className="sticky top-0 z-10 w-full backdrop-blur-header">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <NavLink
          to="/app"
          className="rounded-8 text-h1 text-secondary-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          {BRAND_NAME}
        </NavLink>

        <motion.nav
          layout
          transition={transition}
          className="flex items-center gap-24 rounded-full bg-gradient-user-menu p-4 backdrop-blur-menu"
        >
          {navItems.map((item, index) => (
            <MotionNavLink
              key={item.to}
              to={item.to}
              layout
              transition={transition}
              className={({ isActive }) =>
                cn(
                  'relative flex h-40 items-center whitespace-nowrap rounded-full text-sm-18 text-white',
                  'focus-visible:bg-white/20 focus-visible:px-16 focus-visible:shadow-drop focus-visible:outline-none',
                  index === 0 && !isActive && 'pl-24',
                  isActive && 'px-16',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="user-nav-active-pill"
                      transition={transition}
                      className="absolute inset-0 -z-10 rounded-full bg-white/20 shadow-drop"
                    />
                  )}
                  {item.label}
                </>
              )}
            </MotionNavLink>
          ))}
          <button
            type="button"
            onClick={onLogout}
            aria-label="로그아웃"
            title="로그아웃"
            className="h-40 w-40 shrink-0 rounded-full focus-visible:bg-white/20 focus-visible:shadow-drop focus-visible:outline-none"
          >
            <img src={userIcon} alt="" className="h-full w-full" />
          </button>
        </motion.nav>
      </div>
    </header>
  )
}
