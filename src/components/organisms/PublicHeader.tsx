import { NavLink, useNavigate } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import { useAuth } from '@hooks'
import type { PublicHeaderProps } from '@types'

// 공통(마케팅) 헤더 — UserHeader 와 동일한 앱바(backdrop-blur + Primary 세로 그라디언트 유리판) 위
// 브랜드 + 유리 알약 메뉴. sticky 로 콘텐츠 위에 얹어야 블러 대상(아래 다크 배경/히어로)이 성립한다.
// 게스트: 계정 아이콘 + 지원하기 CTA. 로그인: 마이페이지(/app) 링크 + 로그아웃.
export function PublicHeader({ navItems, applyItem }: PublicHeaderProps) {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-gradient-user-header backdrop-blur-header">
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
