import { NavLink } from 'react-router-dom'
import userIcon from '@/assets/icons/user.svg'
import type { AdminHeaderProps } from '@types'

// 관리자 상단 헤더 — 브랜드/현재 페이지 제목 + 영역 메뉴 + 계정 아이콘.
export function AdminHeader({ title, navItems }: AdminHeaderProps) {
  return (
    <header className="w-full bg-background-1">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <div className="flex flex-col gap-4">
          <span className="text-h1 text-primary">LIKELION USW</span>
          <h1 className="text-sm-22 text-black">{title}</h1>
        </div>
        <nav className="flex items-center gap-24">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="text-sm-18 text-black">
              {item.label}
            </NavLink>
          ))}
          <img src={userIcon} alt="계정" className="h-40 w-40" />
        </nav>
      </div>
    </header>
  )
}
