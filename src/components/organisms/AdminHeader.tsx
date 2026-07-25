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
        {/* Figma 대시보드 홈 헤더(1205:8630 / 8755 / 10206) — 브랜드와 제목은 가로로 붙는다.
            타이틀 블록 370x48 = 브랜드 277 + gap 16 + 제목 77, 제목은 세로 가운데(48 기준 y=11).
            375 시안(1205:10206)에는 제목이 없고 브랜드(166x29)만 남아 헤더가 61px 이라 sm 미만에서 숨긴다. */}
        <NavLink to="/admin" className="flex shrink-0 items-center gap-16">
          <span className="text-sm-22 text-secondary-2 sm:text-h1">{BRAND_NAME}</span>
          <h1 className="hidden text-sm-22 text-black sm:block">{title}</h1>
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
