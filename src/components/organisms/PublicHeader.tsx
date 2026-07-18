import { NavLink, useNavigate } from 'react-router-dom'
import headerBackground from '@/assets/header-bg.png'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import { useAuth } from '@hooks'
import type { PublicHeaderProps } from '@types'

// 공통(마케팅) 헤더 — 다크 배경 위 브랜드 + 유리 알약 메뉴.
// 게스트: 계정 아이콘 + 지원하기 CTA. 로그인: 마이페이지(/app) 링크 + 로그아웃.
export function PublicHeader({ navItems, applyItem }: PublicHeaderProps) {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="relative w-full overflow-hidden">
      <img src={headerBackground} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <NavLink to="/" className="text-h1 text-secondary-2">
          {BRAND_NAME}
        </NavLink>
        <div className="flex items-center gap-24">
          <nav className="flex h-48 items-center gap-24 rounded-full bg-gradient-primary p-4 pl-24 backdrop-blur-[6px]">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="text-sm-18 text-white">
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <NavLink to="/app" aria-label="마이페이지" className="flex items-center justify-center">
                <img src={userIcon} alt="" className="h-40 w-40" />
              </NavLink>
            ) : (
              <img src={userIcon} alt="계정" className="h-40 w-40" />
            )}
          </nav>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-48 items-center justify-center rounded-full bg-gradient-primary px-16 text-sm-18 text-white backdrop-blur-[6px]"
            >
              로그아웃
            </button>
          ) : (
            <NavLink
              to={applyItem.to}
              className="flex h-48 items-center justify-center rounded-full bg-gradient-primary px-16 text-sm-18 text-white backdrop-blur-[6px]"
            >
              {applyItem.label}
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
