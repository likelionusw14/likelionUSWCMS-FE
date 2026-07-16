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
  part: string
  onCohortChange: (cohort: string) => void
  onPartChange: (part: string) => void
  cohortOptions: SelectOption[]
  partOptions: SelectOption[]
  onSearch: () => void
}

export interface ProjectListProps {
  projects: Project[]
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
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

// 공용 모달 셸 — 오버레이 + 중앙 카드. 포털·ESC·바깥클릭 닫기. children 은 카드 내용.
export interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  // 닫기 수단(ESC·바깥클릭) 잠금. 결과 팝업처럼 버튼으로만 닫을 때 true.
  dismissable?: boolean
  // 접근성 라벨(제목 텍스트).
  ariaLabel?: string
}

// 확인 팝업(삭제 등) — 경고 아이콘 + 제목/설명 + 취소/확인 2버튼.
export interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  // 제목(SM/20). 예: '삭제'.
  title: string
  // 설명(M/14). 예: '해당 문서를 삭제하시겠습니까?'.
  description?: string
  // 확인 버튼 라벨. 기본 '확인'.
  confirmLabel?: string
  // 취소 버튼 라벨. 기본 '취소'.
  cancelLabel?: string
}

// 결과 팝업(삭제완료 등) — 제목/설명 + 단일 확인 버튼(버튼으로만 닫힘).
export interface ResultDialogProps {
  open: boolean
  onConfirm: () => void
  // 제목(SM/20). 예: '삭제 완료'.
  title: string
  // 설명(M/14). 예: '삭제처리가 완료되었습니다.'.
  description?: string
  // 버튼 라벨. 예: '일정 관리로 이동'.
  confirmLabel: string
}
