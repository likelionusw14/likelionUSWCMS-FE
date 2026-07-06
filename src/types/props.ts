import type { AreaType } from './auth'
import type { NavItem } from './nav'

// 컴포넌트 props 타입 (컴포넌트 파일 인라인 정의 금지 규칙에 따라 여기 정의).
export interface SidebarProps {
  navItems: NavItem[]
  brandLabel?: string
}

export interface AppShellProps {
  areaLabel: string
  navItems: NavItem[]
}

export interface RequireRoleProps {
  area: AreaType
}
