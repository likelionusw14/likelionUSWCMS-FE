import { NavLink } from 'react-router-dom'
import headerBackground from '@/assets/header-bg.png'
import userIcon from '@/assets/icons/user-white.svg'
import { BRAND_NAME } from '@constants'
import type { PublicHeaderProps } from '@types'

// 로그인 전(공통) 헤더 — 다크 배경 위 브랜드 + 유리 알약 메뉴 + 지원하기.
export function PublicHeader({ navItems, applyItem }: PublicHeaderProps) {
  return (
    <header className="relative w-full overflow-hidden">
      <img src={headerBackground} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <span className="text-h1 text-secondary-2">{BRAND_NAME}</span>
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
