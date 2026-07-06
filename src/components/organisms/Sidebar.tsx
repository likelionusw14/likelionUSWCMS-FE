import { NavLink } from 'react-router-dom'
import { cn } from '@utils'
import type { SidebarProps } from '@types'

export function Sidebar({ navItems, brandLabel = '멋사 USW' }: SidebarProps) {
  return (
    <aside className="flex h-full w-[240px] flex-col border-r border-gray-300 bg-white">
      <div className="flex h-[56px] items-center gap-8 border-b border-gray-300 px-24">
        <span className="text-sm-18 text-primary">{brandLabel}</span>
        <span className="text-r-14 text-gray-500">CMS</span>
      </div>
      <nav className="flex flex-1 flex-col gap-4 p-12">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                'rounded px-12 py-8 text-m-14 transition-colors',
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
