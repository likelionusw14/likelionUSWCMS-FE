import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { cn } from '@utils'

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(활성/호버 항목은 유리 캡슐 강조) + 계정 버튼.
// Figma 717:1684. 헤더 자체는 배경색이 없고 backdrop-blur(2.5)만 있는 유리판이라,
// 아래 본문이 그대로 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야 이 효과가 성립한다.
// 메뉴 항목 사이는 전부 균일 gap-24 (좌표 계산 검증됨, 첫 항목 별도 여백 없음).
// 각 항목마다 "OO 유리" 히든 레이어가 있어 호버 시에도 활성과 동일한 유리 캡슐(좌우 대칭 px-16)이
// 뜬다 — 항목별 plain/glass 폭 차가 정확히 +32(px-16 양쪽)라 gap-24 로만 레이아웃이 밀린다.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full backdrop-blur-header">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <NavLink to="/app" className="text-h1 text-secondary-2">
          {BRAND_NAME}
        </NavLink>

        <nav className="flex items-center gap-24 rounded-full bg-gradient-user-menu p-4 backdrop-blur-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex h-40 items-center whitespace-nowrap text-sm-18 text-white transition-all duration-150 hover:rounded-full hover:bg-white/20 hover:px-16 hover:shadow-drop',
                  isActive && 'rounded-full bg-white/20 px-16 shadow-drop',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onLogout}
            aria-label="로그아웃"
            title="로그아웃"
            className="h-40 w-40 shrink-0"
          >
            <img src={userIcon} alt="" className="h-full w-full" />
          </button>
        </nav>
      </div>
    </header>
  )
}
