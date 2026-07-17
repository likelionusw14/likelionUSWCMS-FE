import type { BreadcrumbSegment, NavItem } from '@types'

// 관리자(운영진) 영역 헤더 메뉴 (대시보드 홈·404 의 상단 네비). 각 페이지는 순차 구현 예정이라 경로만 먼저 확정한다.
export const ADMIN_NAV: NavItem[] = [
  { to: '/admin/projects', label: '프로젝트' },
  { to: '/admin/sessions', label: '세션자료' },
  { to: '/admin/notices', label: '공지' },
  { to: '/admin/schedule', label: '일정' },
  { to: '/admin/attendance', label: '출결' },
  { to: '/admin/members', label: '회원' },
  { to: '/admin/certificates', label: '활동증명서' },
]

// 헤더에 띄울 페이지 제목. 페이지를 추가하면 여기에 한 줄 더한다.
export const ADMIN_PAGE_TITLES: Record<string, string> = {
  '/admin': '대시보드',
}

// 관리 페이지(사이드바 레이아웃)의 좌측 메뉴.
export const ADMIN_SIDEBAR_HOME: NavItem = { to: '/admin', label: '대시보드' }

export const ADMIN_SIDEBAR_NAV: NavItem[] = [
  { to: '/admin/projects', label: '프로젝트 관리' },
  { to: '/admin/sessions', label: '세션자료 관리' },
  { to: '/admin/notices', label: '공지 관리' },
  { to: '/admin/schedule', label: '일정 관리' },
  { to: '/admin/attendance', label: '출결 관리' },
  { to: '/admin/members', label: '회원 관리' },
]

const BREADCRUMB_HOME: BreadcrumbSegment = { label: '홈', to: '/admin' }

// 경로 접미사 → 서브페이지 라벨. 목록 경로면 null.
function adminSubPageLabel(baseNoun: string, pathname: string, sectionTo: string): string | null {
  if (pathname === sectionTo) return null
  if (pathname === `${sectionTo}/new`) return `${baseNoun} 작성`
  if (pathname.endsWith('/edit')) return `${baseNoun} 수정`
  return `${baseNoun} 상세`
}

// 사이드바 nav(ADMIN_SIDEBAR_NAV)를 단일 출처로 현재 경로의 상단바 타이틀·브레드크럼을 유도한다.
// 새 관리 메뉴를 추가하면 ADMIN_SIDEBAR_NAV 에만 넣으면 브레드크럼도 자동으로 따라온다.
export function getAdminBreadcrumb(pathname: string): {
  title: string
  breadcrumb: BreadcrumbSegment[]
} {
  const section = ADMIN_SIDEBAR_NAV.find(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`),
  )
  if (!section) return { title: '', breadcrumb: [] }

  const baseNoun = section.label.replace(/ 관리$/, '')
  const sub = adminSubPageLabel(baseNoun, pathname, section.to)

  // 목록 페이지 — [홈, 섹션(현재)]
  if (!sub) return { title: section.label, breadcrumb: [BREADCRUMB_HOME, { label: section.label }] }

  // 서브 페이지 — [홈, 섹션(링크), 서브(현재)]
  return {
    title: sub,
    breadcrumb: [BREADCRUMB_HOME, { label: section.label, to: section.to }, { label: sub }],
  }
}
