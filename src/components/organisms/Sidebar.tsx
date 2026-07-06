import { NavLink } from 'react-router-dom'
import { cn } from '@utils'

interface NavItem {
  to: string
  label: string
}

// 도메인 메뉴(동아리/회원/지원서 등)는 백엔드 스펙 확정 후 추가한다.
const NAV_ITEMS: NavItem[] = [{ to: '/', label: '대시보드' }]

export function Sidebar() {
  return (
    <aside className="flex h-full w-[240px] flex-col border-r border-gray-300 bg-white">
      <div className="flex h-[56px] items-center gap-8 border-b border-gray-300 px-24">
        <span className="text-lg font-bold text-primary">멋사 USW</span>
        <span className="text-sm text-gray-500">CMS</span>
      </div>
      <nav className="flex flex-1 flex-col gap-4 p-12">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                'rounded px-12 py-8 text-sm font-medium transition-colors',
                isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
