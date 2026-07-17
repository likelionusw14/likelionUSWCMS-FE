import type {
  ButtonHTMLAttributes,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'
import type { AreaType, Role } from './auth'
import type { NavItem } from './nav'
import type { Project, ProjectFormValues, ProjectSummary } from './project'
import type { Session, SessionFormValues } from './session'
import type { Notice } from './notice'
import type { Member, PendingMember } from './member'
import type { AttendanceRecord } from './attendance'
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
  // 헤더 바 높이 등 커스텀 (기본 h-32). 큰 섹션 창은 h-40.
  headerClassName?: string
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

// 상단바 브레드크럼 세그먼트 — to 가 있으면 링크(이동), 없으면 현재 페이지(텍스트).
export interface BreadcrumbSegment {
  label: string
  to?: string
}

export interface AdminTopBarProps {
  // 문자열이면 기존처럼 텍스트만, 세그먼트 배열이면 각 조각을 링크로 렌더.
  breadcrumb: string | BreadcrumbSegment[]
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
  project: ProjectSummary
  detailPath: string
  className?: string
}

// 목록 상단 공용 검색바 — 껍데기(흰 카드)+검색 아이콘은 SearchBar 소유, 필터는 children 슬롯.
// 관리자 목록(프로젝트·세션·공지·출결)이 공유. 검색 동작은 백엔드 연동 시 채운다(디자인에 입력창 없음).
export interface SearchBarProps {
  // 좌측 필터 슬롯 (Dropdown·날짜버튼 등).
  children: ReactNode
  // 검색 아이콘 클릭. 없으면 아이콘 비활성(디자인상 항상 표시).
  onSearch?: () => void
}

// 사용자 프로젝트 목록 상단 검색바(기수+분류 필터). 관리자는 SearchBar 로 통일했으나
// 사용자 화면(UserProjectListPage)이 이 컴포넌트를 그대로 사용 중이라 유지한다.
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
  projects: ProjectSummary[]
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  detailBasePath: string
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
  cohortOptions: SelectOption[]
  categoryOptions: SelectOption[]
  fileName: string
  onFileChange: (fileName: string) => void
  onFileClear: () => void
}

// 관리 폼 공용 업로드 박스 — 아이콘 + 파일명 + 찾기/삭제 버튼. 공지·세션자료·프로젝트 작성이 공유한다.
export interface FileUploadFieldProps {
  fileName: string
  onFileChange: (fileName: string) => void
  onFileClear: () => void
  accept?: string
}

// ── 세션자료 관리 ──
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

// 출석 코드 생성 — 코드 표시 + 유효시간 카운트다운 + 생성 버튼.
export interface AttendanceCodeCreateProps {
  // 발급된 7자리 코드. 없으면 placeholder('0000000') 표시.
  code: string | null
  // 남은 유효시간(초). 표시는 mm:ss.
  remainingSeconds: number
  onGenerate: () => void
}

// 목록 섹션 셸 — 제목 + 총건수(+선택 페이지정보) + 선택 추가버튼 + 툴바 슬롯 + 콘텐츠(DataTable) + 선택 페이지네이션.
// 관리자 목록 5종(회원·승인대기·출결·공지·세션)이 공유. 가변부는 선택 prop 유무로 켠다.
export interface ListSectionProps {
  // 카드 안 최상단 제목 슬롯(선택). 스타일은 페이지가 소유. 예: <h2 className="text-sm-22 text-black">회원 목록</h2>
  header?: ReactNode
  totalCount: number
  // 셋 다 주면 하단 Pagination + 건수에 (page/total) 표기.
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  // 있으면 건수 줄 우측에 + 버튼.
  onAdd?: () => void
  children: ReactNode
  className?: string
}

// 공용 체크박스 — 공지 필독(round·32) / 출결 Checkpoint(square·24) 겸용.
export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  // round = 필독(원형 32px), square = Checkpoint(사각 24px, rounded-8). 기본 square.
  variant?: 'round' | 'square'
  disabled?: boolean
  ariaLabel?: string
  className?: string
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
  // 다이얼로그 카드 class. 기본 흰 카드(rounded-8 bg-white). 창(WindowPanel) 팝업은 '' 로 넘겨 카드 제거.
  panelClassName?: string
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

// ── 창(WindowPanel) 팝업들 (일정/회원 관리) ──

// 일정 작성 팝업 값.
export interface ScheduleFormValues {
  title: string
  place: string
  // 'YYYY.MM.DD' (없으면 '').
  date: string
  // 'HH:MM' (없으면 '').
  time: string
  description: string
}

// 일정 작성 팝업 — 일정명·장소·날짜·시간·설명. 날짜/시간 필드는 내부에서 선택 팝업을 띄운다.
export interface ScheduleFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: ScheduleFormValues) => void
  initialValues?: Partial<ScheduleFormValues>
}

// 날짜 선택 팝업 — 년/월/일 3열 휠(granularity='month' 면 년/월 2열). 일정 등록·수정,
// 일정(날짜) 변경, 프로젝트 제작기간(월 단위) 공용.
export interface DatePickerModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (value: string) => void // granularity 에 따라 'YYYY.MM.DD' 또는 'YYYY.MM'
  // 초기 선택값. 없으면 오늘.
  value?: string
  // 제목. 기본 '날짜 선택'.
  title?: string
  // 'day'(기본, 년/월/일) | 'month'(년/월만, 출력도 'YYYY.MM').
  granularity?: 'day' | 'month'
}

// 시간 선택 팝업 — 시/분/오전·오후 3열 휠.
export interface TimePickerModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (value: string) => void // 'HH:MM' (24h)
  // 초기 선택값 'HH:MM'. 없으면 현재 시각.
  value?: string
}

// 비고 작성 팝업 — 비고 textarea + 저장/취소.
export interface RemarkModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (value: string) => void
  value?: string
}

// 회원정보 수정 팝업 — 이름 + 기수·파트 드롭다운 + 저장/취소 + 회원정보 삭제 링크.
export interface MemberEditModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: { name: string; cohort: string; part: string }) => void
  onDelete: () => void
  initialValues?: { name?: string; cohort?: string; part?: string }
  cohortOptions: SelectOption[]
  partOptions: SelectOption[]
}

// 권한 수정 팝업 — 운영진/아기사자 2분할 토글 + 저장/취소.
export interface RoleEditModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (role: string) => void
  // 현재 선택된 권한 키. 기본 첫 옵션.
  value?: string
}

// 일정 팝업 항목 — 캘린더 날짜 클릭 시 말풍선에 표시할 일정.
export interface SchedulePopupEvent {
  id: string
  title: string
  // 표시용 문자열. 예: '2026년 7월 3일 10:00'.
  dateTime: string
  place: string
  description: string
}

// 일정 팝업 — 캘린더 날짜 위 말풍선. 제목·날짜시간·장소·설명 + (선택)수정/삭제.
export interface SchedulePopupProps {
  event: SchedulePopupEvent
  // 꼬리 방향. left = 팝업이 셀 오른쪽(꼬리 왼쪽), right = 팝업이 셀 왼쪽(꼬리 오른쪽). 기본 left.
  tail?: 'left' | 'right'
  // 있으면 하단 수정/삭제 버튼 표시.
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

// 고정여부 토글 — 공지 고정 등. off=background-1 / on=primary 트랙, 20px 흰 노브.
export interface PinToggleProps {
  pinned: boolean
  onChange: (pinned: boolean) => void
  disabled?: boolean
  ariaLabel?: string
  className?: string
}

// ── 공지 작성 ──
export interface NoticeFormValues {
  title: string
  tag: string
  content: string
}

// 공지 작성 폼 — 제목·태그·고정여부·첨부링크·공지내용 + 저장. 제목/내용 미입력 시 오류 문구.
export interface NoticeFormProps {
  values: NoticeFormValues
  onFieldChange: (field: keyof NoticeFormValues, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  pinned: boolean
  onPinnedChange: (pinned: boolean) => void
  tagOptions: SelectOption[]
  fileName: string
  onFileChange: (fileName: string) => void
  onFileClear: () => void
}

// 승인/취소 액션 버튼 쌍 — 승인대기 목록 행 등. Figma 1000:1550.
export interface ApprovalActionsProps {
  onApprove: () => void
  onCancel: () => void
  disabled?: boolean
  className?: string
}

// 공지 목록 — 건수·등록·표(필독·제목·태그·작성일)·페이지네이션.
export interface NoticeListProps {
  notices: Notice[]
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

// 공지 상세 — 제목·목록/수정·태그/작성일/첨부 정보표 + 공지내용.
export interface NoticeDetailProps {
  notice: Notice
}

// 승인대기 목록 — 이름·기수·파트 + 승인/취소.
export interface PendingMemberListProps {
  members: PendingMember[]
  totalCount: number
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

// 회원 목록 — 이름·분류(링크)·기수·파트·가입상태·수정(링크) + 페이지네이션.
export interface MemberListProps {
  members: Member[]
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onEditRole: (member: Member) => void
  onEditMember: (member: Member) => void
}

// 출석 내역 — 날짜·이름·학번·파트·출석상태(체크)·비고(버튼) + 페이지네이션.
export interface AttendanceListProps {
  records: AttendanceRecord[]
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onTogglePresent: (id: string) => void
  onEditRemark: (record: AttendanceRecord) => void
}
