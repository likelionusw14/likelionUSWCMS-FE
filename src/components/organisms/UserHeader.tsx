import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { cn } from '@utils'

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(활성 항목은 유리 캡슐 강조) + 계정 버튼.
// Figma 717:1684. 헤더는 backdrop-blur(2.5)위에 Primary 세로 그라디언트(30%->2%)를 얹은
// 유리판이라, 아래 본문이 옅게 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야
// 이 효과가 성립한다.
// 메뉴 항목 사이는 균일 gap-24 (좌표 계산 검증됨). 활성 캡슐은 별도 "OO 유리" 레이어 —
// 좌우 대칭 px-16. 단 첫 항목(프로젝트)은 비활성 상태일 때만 pl-24 여백이 추가로 있다
// (Figma 717:1689 히든 idle 레이어에서 확인 — 활성 glass 상태의 px-16 과는 별개).
// 유리 캡슐(rounded-full bg-white/20 effect-glass-shadow)은 활성 상태뿐 아니라 키보드 포커스
// 상태도 공유한다 — Figma 는 focus 를 모델링하지 않지만, 별도 링 대신 이 캡슐을 그대로
// 재사용한다. 활성/포커스 캡슐(motion.span)만 layoutId 로 슬라이딩 애니메이션을 타고,
// nav 전체/개별 링크에는 layout 을 부여하지 않아 메뉴바 전체가 찌그러지거나 흔들리는 현상을 방지한다.
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

        <nav className="flex items-center gap-24 rounded-full bg-gradient-user-menu p-4 backdrop-blur-menu">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              onFocus={() => setFocusedTo(item.to)}
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
                    {item.label}
                  </>
                )
              }}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onLogout}
            aria-label="로그아웃"
            title="로그아웃"
            className="h-40 w-40 shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            <img src={userIcon} alt="" className="h-full w-full" />
          </button>
        </nav>
      </div>
    </header>
  )
}
