import type {
  ButtonHTMLAttributes,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'
import type { AreaType, Role } from './auth'
import type { NavItem } from './nav'
import type { Project, ProjectFormValues, ProjectSummary, UserProject } from './project'
import type { Session, SessionFormValues, UserSessionResource } from './session'
import type { Notice, UserNotice } from './notice'
import type { Member, PendingMember } from './member'
import type { AttendanceRecord, AttendanceCheckInResult } from './attendance'
import type { SignupProfile } from './signup'
import type { CalendarEvent } from './calendar'
import type { Lion, UserLionQuery } from './lion'
import type { CertificateInfo, CertificateFlowState } from './certificate'

// 컴포넌트 props 타입 (컴포넌트 파일 인라인 정의 금지 규칙에 따라 여기 정의).

export interface RequireRoleProps {
  area: AreaType
}

export interface AdminShellProps {
  // 경로 → 헤더에 띄울 페이지 제목.
  pageTitles: Record<string, string>
}

export interface AdminHeaderProps {
  title: string
  // 상단 메뉴는 404 처럼 네비가 필요한 화면에서만 넘긴다.
  // 대시보드 홈 시안(Figma 1205:8630)의 헤더에는 타이틀·로그아웃뿐이라 넘기지 않는다.
  navItems?: NavItem[]
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

// 입력 아톰 — variant 로 스타일 프리셋 선택: default(회원가입: h-40 흰 배경) · form(관리 폼: h-32 background-1).
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'default' | 'form'
}

// 공용 버튼 아톰 — variant(색)와 size(치수) 프리셋. 네이티브 button 속성 확장은 컴포넌트에서 병합한다.
export interface ButtonProps {
  variant?: 'primary' | 'outline' | 'neutral' | 'danger'
  size?: 'md' | 'block' | 'sm'
  className?: string
}

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

// 유리 알약 메뉴(molecule) — UserHeader/PublicHeader 가 공유한다. children 은 알약 안쪽
// 마지막 슬롯(계정 버튼 등)에 렌더된다.
export interface GlassNavMenuProps {
  navItems: NavItem[]
  children?: ReactNode
}

// tone 은 셸이 준다 — 배경이 어두운 게스트 홈(CommonHomePage)·로그인/가입(PublicShell)은 dark,
// 밝은 게스트 콘텐츠(PublicContentShell)는 light. 모바일 드로어 색이 이걸 따른다.
export interface PublicHeaderProps {
  navItems: NavItem[]
  tone?: NavSidebarTone
}

export interface PublicShellProps {
  navItems: NavItem[]
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

// ── 공통 사이드바 ──
// 관리자·사용자·게스트가 같은 NavSidebar 를 쓴다(Figma 1205:11709 / 1360:11150 — 사양 동일, 색만 다르다).
// 폭·위치는 담는 쪽이 className 으로 정한다 — 관리자 lg 이상은 흐름 안 224px 고정 컬럼,
// lg 미만은 NavSidebarDrawer(관리자 좌측 / 사용자·게스트 우측).
// onClose 는 오버레이일 때만 준다 — 그때만 브랜드 옆 24x24 닫기(X)가 붙는다.
// tone: light = 관리자 및 밝은 배경 라우트, dark = 어두운 배경인 게스트 홈(/)·사용자 홈(/app).
export type NavSidebarTone = 'light' | 'dark'

export interface NavSidebarProps {
  // 있으면 브랜드 행이 붙는다(관리자 오버레이·고정 컬럼). 사용자·게스트는 헤더가 브랜드와
  // 햄버거를 계속 띄우므로 넘기지 않는다 — 같은 행이 두 번 보이지 않게.
  homeItem?: NavItem
  navItems: NavItem[]
  onClose?: () => void
  tone?: NavSidebarTone
  className?: string
  // 메뉴 아래 CTA 자리(게스트·사용자 드로어의 지원하기·마이페이지·로그아웃).
  children?: ReactNode
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

// 상단바 — 셸(AdminSidebarShell)이 getAdminBreadcrumb 로 계산해 내려준다.
// 사이드바가 닫혀 있을 때만 좌측에 여는 햄버거가 붙는다(Figma 상단바의 '모바일 햄버거메뉴' 레이어).
export interface AdminTopBarProps {
  breadcrumb: BreadcrumbSegment[]
  title: string
  sidebarOpen: boolean
  onSidebarOpen: () => void
  sidebarControls: string
}

// lg 미만 사이드바 오버레이 — 관리자·사용자·게스트 공용.
// 모바일(<640)은 헤더 바로 아래로 내려오는 전폭 카드, 태블릿(640~1023)은 224px 측면 드로어.
// side 는 태블릿 드로어가 붙는 쪽 — 햄버거 위치를 따른다(관리자 좌측 / 사용자·게스트 우측).
export interface NavSidebarDrawerProps {
  id: string
  // 오버레이의 aria-label(예: '사용자 모바일 메뉴').
  label: string
  open: boolean
  onClose: () => void
  homeItem: NavItem
  navItems: NavItem[]
  side?: 'left' | 'right'
  tone?: NavSidebarTone
  // 바로 위 헤더가 이미 브랜드 + 햄버거를 띄우면 true — 그 헤더에 딱 붙는 모바일 카드에서만
  // 브랜드 행을 생략한다(같은 줄이 두 번 보이므로). 태블릿 드로어는 헤더를 덮으므로 항상 붙는다.
  headerHasBrand?: boolean
  // 메뉴 아래 CTA(지원하기·마이페이지·로그아웃) — lg 미만에서 헤더가 숨기므로 여기가 유일한 진입점이다.
  children?: ReactNode
}

// 햄버거 버튼 — 3줄 막대가 열리면 X 로 바뀐다. 색은 text-* 로 상속(bg-current).
// label 을 주면 aria-label/title 이 '<label>'/'<label> 닫기' 대신 그 문구로 고정된다
// (관리자 상단바처럼 '여는' 용도로만 쓰이는 버튼).
export interface MobileMenuButtonProps {
  open: boolean
  onToggle: () => void
  controls: string
  label?: string
  className?: string
  barClassName?: string
}

export interface ChipProps {
  label: string
  className?: string
}

export interface CountUpProps {
  // 목표 숫자 — 뷰포트 진입 시 0 → to 로 1회 증가한다.
  to: number
  // 숫자 뒤 접미사 (예: '년', '+').
  suffix?: string
  // 카운트업 길이(초). 기본 1.6.
  duration?: number
  className?: string
}

export interface SpeechBubbleProps {
  // 말풍선 SVG 에 얹을 클래스 (위치·좌우 반전 등).
  className?: string
}

export interface SiteFooterProps {
  // 배경·글자 색 테마. 'dark'=공개 홈(background-2), 'light'=사용자·관리자(secondary-1).
  variant: 'light' | 'dark'
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

export interface LionProfileCardProps {
  lion: Lion
  className?: string
}

export interface LionPartFilterProps {
  value: NonNullable<UserLionQuery['part']>
  onChange: (value: NonNullable<UserLionQuery['part']>) => void
  className?: string
}

export interface LionSectionProps {
  label: string
  lions: Lion[]
  isLoading: boolean
  filter?: ReactNode
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

export interface UserSessionFilterBarProps {
  week: string
  part: string
  weekOptions: SelectOption[]
  partOptions: SelectOption[]
  onWeekChange: (value: string) => void
  onPartChange: (value: string) => void
  onSearch: () => void
}

export interface UserSessionListProps {
  sessions: UserSessionResource[]
  totalCount: number
  page: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
}

export interface UserSessionDetailProps {
  session: UserSessionResource
}

export interface SessionFormProps {
  values: SessionFormValues
  onFieldChange: (field: keyof SessionFormValues, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  // 수정 화면에서만 내려온다 (작성 화면에는 삭제 대상이 없다).
  onDelete?: () => void
  weekOptions: SelectOption[]
  partOptions: SelectOption[]
  fileName: string
  onFileChange: (fileName: string) => void
  onFileClear: () => void
}

export interface UserProjectDetailProps {
  project: UserProject
}

export interface UserHeaderProps {
  navItems: NavItem[]
  onLogout: () => void
}

export interface UserShellProps {
  navItems: NavItem[]
}

export interface HomeProjectsProps {
  moreHref?: string
}

// 출석 코드 생성 — 코드 표시 + 유효시간 카운트다운 + 생성 버튼.
export interface AttendanceCodeCreateProps {
  // 발급된 7자리 코드. 없으면 placeholder('0000000') 표시.
  code: string | null
  // 남은 유효시간(초). 표시는 mm:ss.
  remainingSeconds: number
  onGenerate: () => void
}

// 출석 코드 입력 — 안내 말풍선 + 6자리 코드 입력 + 유효시간 + 버튼. 성공/실패는 ResultDialog.
export interface AttendanceCheckInProps {
  code: string
  onCodeChange: (value: string) => void
  remainingSeconds: number
  result: AttendanceCheckInResult
  onSubmit: () => void
  onCloseResult: () => void
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
  // 수정 진입 시 채울 기존 일정(신규 등록이면 null/undefined). 폼값 변환은 모달 내부에서 한다.
  initialEvent?: CalendarEvent | null
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
  // 꼬리 방향(팝업이 앵커의 어느 쪽에 놓이는지의 반대). left = 앵커 오른쪽에 팝업,
  // right = 앵커 왼쪽, top = 앵커 아래, bottom = 앵커 위. 기본 left.
  // 네 방향 모두 같은 곡선을 회전만 시킨 것이라 실루엣이 동일하다.
  tail?: 'left' | 'right' | 'top' | 'bottom'
  // 꼬리 뾰족점 위치 - 꼬리가 붙는 변 기준 좌표(위/아래 꼬리는 x, 좌/우 꼬리는 y). 없으면 가운데.
  tailOffset?: number
  // 말풍선 전체(꼬리 포함) 최대 폭. 앵커 위치에 따라 남는 가로 공간이 다르므로 바깥에서 준다.
  maxWidth?: number
  // 렌더된 실제 크기 보고 - 부모가 화면 밖으로 안 나가게 배치·뒤집기를 정하는 데 쓴다.
  onMeasure?: (size: { width: number; height: number }) => void
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
  // 수정 화면에서만 내려온다 (작성 화면에는 삭제 대상이 없다).
  onDelete?: () => void
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

export interface UserNoticeFilterBarProps {
  tag: string
  tagOptions: SelectOption[]
  onTagChange: (tag: string) => void
  onSearch: () => void
}

export interface UserNoticeListProps {
  notices: UserNotice[]
  totalCount: number
  page: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
  // 행 클릭 시 이동할 상세 경로의 베이스. 멤버(/app/notices)·게스트(/notices)가 같은 목록을 공유하므로
  // 현재 라우트를 넘겨받아 상세 링크를 만든다.
  detailBasePath: string
}

export interface UserNoticeDetailProps {
  notice: UserNotice
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

// 본인 출석 내역 — 날짜·이름·학번·파트·출석상태(읽기 전용 체크)·비고(텍스트) + 페이지네이션.
export interface UserAttendanceListProps {
  records: AttendanceRecord[]
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

// 상세 화면 헤더의 목록/수정 버튼 쌍 (프로젝트·세션·공지 상세 공용).
export interface DetailActionsProps {
  listHref: string
  editHref: string
}

export interface WheelPickerProps {
  items: string[]
  defaultIndex: number
  onChange: (index: number) => void
  widthClass?: string
  ariaLabel?: string
}

// 휠 데크 — 날짜/시간 피커가 공유하는 3열 휠 스캐폴드(중앙 선택 밴드 + 상하 페이드).
// children 으로 WheelPicker 열들을 받는다.
export interface WheelDeckProps {
  children: ReactNode
  // 중앙 선택 밴드 너비 (기본 w-[300px]). 시간 피커는 좁다(w-[230px]).
  bandClassName?: string
  className?: string
}

// 내 정보 확인 창 — 활동증명서에 반영될 본인 정보(읽기 전용) + PDF 발급하기.
export interface CertificateInfoPanelProps {
  info: CertificateInfo | undefined
  isLoading: boolean
  onIssue: () => void
}

// 발급 플로우 팝업 — 상태에 따라 발급 중(로딩) / 발급 완료(다운로드) / 다운로드 완료(홈).
export interface CertificateFlowModalProps {
  state: CertificateFlowState
  onDownload: () => void
  onGoHome: () => void
}
