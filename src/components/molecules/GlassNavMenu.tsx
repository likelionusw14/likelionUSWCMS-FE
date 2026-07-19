import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { GlassNavMenuProps } from '@types'
import { cn, glassNavTransition } from '@utils'

const MotionNavLink = motion.create(NavLink)

// 유리 알약 메뉴 — UserHeader/PublicHeader 공유 molecule.
// Figma 717:1684(사용자 헤더)에서 실측 검증한 구조를 그대로 재사용한다:
// 메뉴 항목 사이 균일 gap-24. 활성 캡슐은 별도 "OO 유리" 레이어 — 좌우 대칭 px-16.
// 첫 항목은 비활성 상태일 때만 pl-24 여백이 추가로 있다(Figma 717:1689 히든 idle 레이어).
// 활성 캡슐(motion.span layoutId)은 라우트 변경 시 부드럽게 슬라이딩하고, 키보드 Tab 포커스도
// 같은 슬라이딩을 공유한다 — onFocus 에서 `:focus-visible` 매칭을 확인해 키보드 포커스일 때만
// focusedTo 를 갱신한다. 마우스 클릭은 :focus-visible 을 만족하지 않으므로 focusedTo 가 절대
// 건드려지지 않고, 클릭→라우트 변경만으로 캡슐이 이동한다 — onFocus/onBlur 를 조건 없이 걸었을
// 때 발생했던 mousedown/mouseup 레이스 조건(캡슐이 축소->확장 두 번 움찔거리던 버그)을 이
// 방식으로 원천 차단한다. nav 전체/개별 링크는 layout 으로 폭 변화를 부드럽게 애니메이트하되,
// 텍스트에는 layout="position" 카운터 스케일을 적용해 부모 scale() 변형에 글자가 찌그러지지
// 않도록 한다. children(계정 버튼 등)은 알약 안쪽 마지막 슬롯에 그대로 렌더한다.
export function GlassNavMenu({ navItems, children }: GlassNavMenuProps) {
  const reduce = useReducedMotion()
  const transition = glassNavTransition(!!reduce)
  const [focusedTo, setFocusedTo] = useState<string | null>(null)

  return (
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
                    layoutId="glass-nav-active-pill"
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
      {children}
    </motion.nav>
  )
}
