import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import type { PublicHeaderProps } from '@types'

// 로그인 전(공통) 헤더 — 다크 배경 위 브랜드 + 유리 알약 메뉴 + 지원하기.
// UserHeader 와 동일한 앱바 속성: backdrop-blur(2.5)+Primary 세로 그라디언트(30%->2%) 유리판.
// sticky 로 콘텐츠 위에 얹어야 블러 대상(아래 다크 배경/히어로)이 있어 효과가 성립한다.
export function PublicHeader({ navItems, applyItem }: PublicHeaderProps) {
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
            <img src={userIcon} alt="계정" className="h-40 w-40" />
          </nav>
          <NavLink
            to={applyItem.to}
            className="flex h-48 items-center justify-center rounded-full bg-gradient-primary px-16 text-sm-18 text-white backdrop-blur-[6px]"
          >
            {applyItem.label}
          </NavLink>
        </div>
      </div>
    </header>
  )
}
