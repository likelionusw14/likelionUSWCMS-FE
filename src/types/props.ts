import type {
  ButtonHTMLAttributes,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'
import type { AreaType, Role } from './auth'
import type { NavItem } from './nav'
import type { Project, ProjectFormValues } from './project'
import type { Session, SessionFormValues } from './session'
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
  onLogout: () => void
}

export interface MenuCardProps {
  title: string
  description: string
  to: string
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

// 필터 드롭다운 — 선택지 패널을 직접 그려서 네이티브 select 의 이벤트 대신 값만 주고받는다.
export interface DropdownProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder: string
  className?: string
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

// ── 관리 페이지(사이드바 레이아웃) ──
export interface AdminSidebarProps {
  homeItem: NavItem
  navItems: NavItem[]
}

export interface AdminSidebarShellProps {
  homeItem: NavItem
  navItems: NavItem[]
}

export interface AdminTopBarProps {
  breadcrumb: string
  title: string
}

export interface ChipProps {
  label: string
  className?: string
}

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface ProjectCardProps {
  project: Project
  className?: string
}

export interface ProjectFilterBarProps {
  cohort: string
  filterValue: string
  onCohortChange: (cohort: string) => void
  onFilterChange: (value: string) => void
  cohortOptions: SelectOption[]
  filterOptions: SelectOption[]
  filterPlaceholder: string
  onSearch: () => void
}

export interface ProjectListProps {
  projects: Project[]
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void

  createPath?: string
}

export interface ProjectDetailProps {
  project: Project
}

export interface FormRowProps {
  label: string
  children: ReactNode
  className?: string
  labelClassName?: string
}

export interface ProjectFormProps {
  values: ProjectFormValues
  onFieldChange: (field: keyof ProjectFormValues, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  // 수정 화면에서만 내려온다 (작성 화면에는 삭제 대상이 없다).
  onDelete?: () => void
  categoryOptions: SelectOption[]
  fileName: string
  onFileChange: (fileName: string) => void
  onFileClear: () => void
}

// ── 세션자료 관리 ──
export interface SessionFilterBarProps {
  week: string
  part: string
  onWeekChange: (week: string) => void
  onPartChange: (part: string) => void
  weekOptions: SelectOption[]
  partOptions: SelectOption[]
  onSearch: () => void
}

export interface SessionListProps {
  sessions: Session[]
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface SessionDetailProps {
  session: Session
}

export interface SessionFormProps {
  values: SessionFormValues
  onFieldChange: (field: keyof SessionFormValues, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  weekOptions: SelectOption[]
  partOptions: SelectOption[]
  fileName: string
  onFileChange: (fileName: string) => void
  onFileClear: () => void
}

export interface UserProjectDetailProps {
  project: Project
}

export interface UserHeaderProps {
  navItems: NavItem[]
  onLogout: () => void
}

export interface UserShellProps {
  navItems: NavItem[]
}
