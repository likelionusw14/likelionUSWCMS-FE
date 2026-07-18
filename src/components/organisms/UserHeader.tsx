import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import type { UserHeaderProps } from '@types'
import { cn } from '@utils'

// 사용자 영역 상단 헤더 — 브랜드 + 알약형 메뉴 + 계정 버튼.
export function UserHeader({ navItems, onLogout }: UserHeaderProps) {
  return (
    <header className="relative w-full overflow-hidden bg-gradient-user-header backdrop-blur-header">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <NavLink to="/app" className="text-h1 text-secondary-2">
          {BRAND_NAME}
        </NavLink>

        <nav className="flex h-48 items-center rounded-full bg-gradient-primary p-4 shadow-emboss-light">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex h-40 items-center rounded-full px-16 text-sm-16 text-white',
                  isActive && 'bg-white/10 shadow-emboss-light',
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
