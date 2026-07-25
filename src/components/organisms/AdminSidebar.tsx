import { NavLink } from 'react-router-dom'
import closeIcon from '@/assets/icons/close.svg'
import { BRAND_NAME } from '@constants'
import { cn } from '@utils'
import type { AdminSidebarProps } from '@types'

// Figma 1327:10669 실측: 항목은 컨테이너(px-4) 폭을 꽉 채우고 px-24 rounded-8,
// 활성은 bg-primary + 흰 글자다(사이드바 배경이 background-1 이라 이전의 bg-background-1 로는 안 보인다).
const MENU_ITEM = 'flex h-40 items-center rounded-8 px-24 text-sm-16 text-black'
const MENU_ITEM_ACTIVE = 'bg-primary text-white'

// 관리 페이지 좌측 사이드바 — 브랜드(홈 링크) + 닫기(X) + 관리 메뉴.
// Figma 1327:10669 의 브랜드 옆 24x24 아이콘이 이 X 다. 닫으면 상단바 햄버거로 다시 연다.
// 노출/배치는 셸이 정한다: lg 이상은 흐름 안 고정 컬럼(hidden lg:flex),
// lg 미만은 AdminSidebarDrawer 가 이 컴포넌트를 오버레이 드로어에 담아 왼쪽에서 밀어 넣는다.
export function AdminSidebar({ homeItem, navItems, onClose, className }: AdminSidebarProps) {
  return (
    <aside
      className={cn('flex w-[224px] shrink-0 flex-col gap-24 bg-background-1 py-24', className)}
    >
      <div className="flex items-start gap-8 px-24">
        <NavLink
          to={homeItem.to}
          end
          className="min-w-px flex-1 break-words rounded-8 text-sm-22 text-secondary-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary-2"
        >
          {BRAND_NAME}
        </NavLink>
        <button
          type="button"
          onClick={onClose}
          aria-label="사이드바 닫기"
          title="사이드바 닫기"
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-8 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <img src={closeIcon} alt="" className="h-24 w-24" />
        </button>
      </div>
      <nav className="flex flex-col px-4">
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
