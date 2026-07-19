import { NavLink } from 'react-router-dom'
import topbarLogoutIcon from '@/assets/icons/topbar-logout.svg'
import { BRAND_NAME } from '@constants'
import type { AdminHeaderProps } from '@types'

// 관리자 상단 헤더 — 브랜드/현재 페이지 제목 + 영역 메뉴 + 로그아웃 아이콘.
// 브랜드·타이틀을 누르면 관리자 홈(/admin)으로 이동한다. 로그아웃 아이콘은
// AdminTopBar(사이드바 레이아웃)와 같은 topbar-logout.svg 로 통일한다.
export function AdminHeader({ title, navItems, onLogout }: AdminHeaderProps) {
  return (
    <header className="w-full bg-background-1">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-64 py-16">
        <NavLink to="/admin" className="flex flex-col gap-4">
          <span className="text-h1 text-secondary-2">{BRAND_NAME}</span>
          <h1 className="text-sm-22 text-black">{title}</h1>
        </NavLink>
        <nav className="flex items-center gap-24">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="text-sm-18 text-black">
              {item.label}
            </NavLink>
          ))}
          <button type="button" onClick={onLogout} aria-label="로그아웃" title="로그아웃">
            <img src={topbarLogoutIcon} alt="" className="h-24 w-24" />
          </button>
        </nav>
      </div>
    </header>
  )
}
