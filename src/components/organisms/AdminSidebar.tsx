import { NavLink } from 'react-router-dom'
import { BRAND_NAME } from '@constants'
import { cn } from '@utils'
import type { AdminSidebarProps } from '@types'

// 메뉴 항목 — 보고 있는 페이지(선택 상태)만 배경을 칠한다.
// Figma 사이드바 컴포넌트의 변형이 `<메뉴> 선택` 뿐이라 호버 상태는 따로 없다.
const MENU_ITEM = 'flex h-40 items-center rounded-8 px-24 text-sm-16 text-black'
const MENU_ITEM_ACTIVE = 'bg-background-1'

// 관리 페이지 좌측 사이드바 — 브랜드 + 대시보드 + 관리 메뉴.
export function AdminSidebar({ homeItem, navItems }: AdminSidebarProps) {
  return (
    <aside className="flex w-[224px] shrink-0 flex-col gap-24 bg-white py-24">
      <p className="px-24 text-sm-22 text-secondary-2">{BRAND_NAME}</p>
      <NavLink
        to={homeItem.to}
        end
        className={({ isActive }) => cn(MENU_ITEM, isActive && MENU_ITEM_ACTIVE)}
      >
        {homeItem.label}
      </NavLink>
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(MENU_ITEM, isActive && MENU_ITEM_ACTIVE)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
