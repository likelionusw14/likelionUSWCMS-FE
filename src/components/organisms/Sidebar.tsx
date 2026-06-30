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
    <aside className="flex h-full w-60 flex-col border-r border-surface-border bg-surface-base">
      <div className="flex h-14 items-center gap-2 border-b border-surface-border px-5">
        <span className="text-lg font-bold text-brand">멋사 USW</span>
        <span className="text-sm text-content-subtle">CMS</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                'rounded-card px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-content-muted hover:bg-surface-muted',
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
