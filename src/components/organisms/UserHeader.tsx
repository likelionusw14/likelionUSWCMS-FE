import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { cn } from '@utils'

const MotionNavLink = motion.create(NavLink)

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(활성 항목은 유리 캡슐 강조) + 계정 버튼.
// Figma 717:1684. 헤더는 backdrop-blur(2.5)위에 Primary 세로 그라디언트(30%->2%)를 얹은
// 유리판이라, 아래 본문이 옅게 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야
// 이 효과가 성립한다.
// 메뉴 항목 사이는 균일 gap-24 (좌표 계산 검증됨). 활성 캡슐은 별도 "OO 유리" 레이어 —
// 좌우 대칭 px-16. 단 첫 항목(프로젝트)은 비활성 상태일 때만 pl-24 여백이 추가로 있다
// (Figma 717:1689 히든 idle 레이어에서 확인 — 활성 glass 상태의 px-16 과는 별개).
// 활성 캡슐(motion.span layoutId)은 라우트 변경 시 부드럽게 슬라이딩하고, 키보드 Tab 포커스도
// 같은 슬라이딩을 공유한다 — 단, onFocus 에서 `:focus-visible` 매칭을 확인해 키보드 포커스일
// 때만 focusedTo 를 갱신한다. 마우스 클릭은 :focus-visible 을 만족하지 않으므로 focusedTo 가
// 절대 건드려지지 않고, 클릭→라우트 변경만으로 캡슐이 이동한다 — 이전에 onFocus/onBlur 를
// 조건 없이 걸었을 때 발생했던 mousedown/mouseup 레이스 조건(캡슐이 축소->확장 두 번 움찔거리던
// 버그)을 이 방식으로 원천 차단한다.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  const reduce = useReducedMotion()
  const transition = { duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }
  const [focusedTo, setFocusedTo] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-10 w-full bg-gradient-user-header backdrop-blur-header">
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
              onFocus={(event) => {
                if (event.target.matches(':focus-visible')) setFocusedTo(item.to)
              }}
              onBlur={() => setFocusedTo((prev) => (prev === item.to ? null : prev))}
              className={({ isActive }) => {
                const highlighted = focusedTo ? item.to === focusedTo : isActive
                return cn(
                  'relative flex h-40 items-center whitespace-nowrap rounded-full text-sm-18 text-white outline-none',
                  index === 0 && !highlighted && 'pl-24',
                  highlighted && 'px-16',
                )
              }}
            >
              {({ isActive }) => {
                const highlighted = focusedTo ? item.to === focusedTo : isActive
                return (
                  <>
                    {highlighted && (
                      <motion.span
                        layoutId="user-nav-active-pill"
                        transition={transition}
                        className="absolute inset-0 -z-10 rounded-full bg-white/20 effect-glass-shadow"
                      />
                    )}
                    <motion.span layout="position" transition={transition}>
                      {item.label}
                    </motion.span>
                  </>
                )
              }}
            </MotionNavLink>
          ))}
          <motion.button
            layout
            transition={transition}
            type="button"
            onClick={onLogout}
            aria-label="로그아웃"
            title="로그아웃"
            className="h-40 w-40 shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            <motion.img layout="position" transition={transition} src={userIcon} alt="" className="h-full w-full" />
          </motion.button>
        </motion.nav>
      </div>
    </header>
  )
}
