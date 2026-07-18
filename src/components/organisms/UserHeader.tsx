import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { cn } from '@utils'

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴(활성 항목은 유리 캡슐 강조) + 계정 버튼.
// Figma 717:1684. 헤더 자체는 배경색이 없고 backdrop-blur(2.5)만 있는 유리판이라,
// 아래 본문이 그대로 비쳐 흐리게 보인다 — sticky 로 스크롤 컨테이너 위에 얹어야 이 효과가 성립한다.
// 메뉴 항목 사이 gap-24, 첫 항목만 pl-24. 활성 캡슐은 별도 "OO 유리" 레이어.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full backdrop-blur-header">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <NavLink to="/app" className="text-h1 text-secondary-2">
          {BRAND_NAME}
        </NavLink>

        <nav className="flex items-center gap-24 rounded-999 bg-gradient-user-menu p-4 backdrop-blur-menu">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex h-40 items-center whitespace-nowrap text-sm-18 text-white',
                  index === 0 && 'pl-24',
                  isActive && 'rounded-999 bg-white/20 px-16 shadow-drop',
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
            className="flex h-40 w-40 items-center justify-center"
          >
            <img src={userIcon} alt="" className="h-24 w-24" />
          </button>
        </nav>
      </div>
    </header>
  )
}
