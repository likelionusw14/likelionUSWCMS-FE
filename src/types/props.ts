import type {
  ButtonHTMLAttributes,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'
import type { AreaType, Role } from './auth'
import type { NavItem } from './nav'
import type { SignupProfile } from './signup'

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

export interface AdminShellProps {
  navItems: NavItem[]
  // 경로 → 헤더에 띄울 페이지 제목.
  pageTitles: Record<string, string>
}

export interface AdminHeaderProps {
  title: string
  navItems: NavItem[]
}

export interface MenuCardProps {
  title: string
  description: string
  className?: string
}

export interface LoginFormProps {
  role: Role
  onRoleChange: (role: Role) => void
  id: string
  onIdChange: (id: string) => void
  error: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

// ── 공통(로그인 전) 영역 ──
export interface WindowPanelProps {
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder: string
}

export type KakaoLoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export interface FormFieldProps {
  label: string
  htmlFor: string
  children: ReactNode
  className?: string
}

export interface PublicHeaderProps {
  navItems: NavItem[]
  applyItem: NavItem
}

export interface PublicShellProps {
  navItems: NavItem[]
  applyItem: NavItem
}

export interface SocialLoginPanelProps {
  onKakaoLogin?: () => void
}

export interface SignupProfileFormProps {
  values: SignupProfile
  onFieldChange: (field: keyof SignupProfile, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  cohortOptions: SelectOption[]
  partOptions: SelectOption[]
}
