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
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-16 px-24 py-16 sm:px-32 lg:px-64">
        <NavLink to="/admin" className="flex shrink-0 flex-col gap-4">
          <span className="text-sm-22 text-secondary-2 sm:text-h1">{BRAND_NAME}</span>
          <h1 className="text-sm-18 text-black sm:text-sm-22">{title}</h1>
        </NavLink>
        <nav className="no-scrollbar flex min-w-0 items-center gap-16 overflow-x-auto sm:gap-24">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="shrink-0 text-sm-18 text-black">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={onLogout}
          aria-label="로그아웃"
          title="로그아웃"
          className="shrink-0"
        >
          <img src={topbarLogoutIcon} alt="" className="h-24 w-24" />
        </button>
      </div>
    </header>
  )
}
