import { NavLink } from 'react-router-dom'
import { BRAND_NAME } from '@constants'
import type { AdminSidebarProps } from '@types'

// 관리 페이지 좌측 사이드바 — 브랜드 + 대시보드 + 관리 메뉴.
export function AdminSidebar({ homeItem, navItems }: AdminSidebarProps) {
  return (
    <aside className="flex w-[224px] shrink-0 flex-col gap-24 bg-white py-24">
      <p className="px-24 text-sm-22 text-secondary-2">{BRAND_NAME}</p>
      <NavLink
        to={homeItem.to}
        end
        className="flex h-40 items-center rounded-8 px-24 text-sm-16 text-black"
      >
        {homeItem.label}
      </NavLink>
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex h-40 items-center rounded-8 px-24 text-sm-16 text-black"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
