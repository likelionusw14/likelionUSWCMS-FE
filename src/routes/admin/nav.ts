import type { AdminSection, BreadcrumbSegment, NavItem } from '@types'

// 대시보드 카드 설명 — Figma 의 임시 문구. 섹션별 문구가 확정되면 각 항목에서 개별 지정한다.
const PLACEHOLDER_DESCRIPTION =
  '시장 분석, 사용자 조사, 서비스 기획, 프로젝트 매니지먼트를 배웁니다. 팀의 비전을 설정하고 목표 달성을 이끄는 리더십을 기릅니다.'

// 관리 섹션 단일 출처. 헤더 메뉴·사이드바 메뉴·대시보드 카드·브레드크럼이 모두 여기서 파생된다.
// 새 관리 메뉴는 이 배열에만 추가하면 라우트를 제외한 모든 노출 지점이 자동으로 따라온다.
// (활동증명서 등 미구현 메뉴는 라우트가 준비될 때 여기 추가한다 — 유령 링크(404)를 만들지 않기 위함.)
export const ADMIN_SECTIONS: AdminSection[] = [
  { key: 'projects', to: '/admin/projects', navLabel: '프로젝트', sidebarLabel: '프로젝트 관리', cardDescription: PLACEHOLDER_DESCRIPTION },
  { key: 'sessions', to: '/admin/sessions', navLabel: '세션자료', sidebarLabel: '세션자료 관리', cardDescription: PLACEHOLDER_DESCRIPTION },
  { key: 'notices', to: '/admin/notices', navLabel: '공지', sidebarLabel: '공지 관리', cardDescription: PLACEHOLDER_DESCRIPTION },
  { key: 'schedule', to: '/admin/schedule', navLabel: '일정', sidebarLabel: '일정 관리', cardDescription: PLACEHOLDER_DESCRIPTION },
  { key: 'attendance', to: '/admin/attendance', navLabel: '출결', sidebarLabel: '출결 관리', cardDescription: PLACEHOLDER_DESCRIPTION },
  { key: 'members', to: '/admin/members', navLabel: '회원', sidebarLabel: '회원 관리', cardDescription: PLACEHOLDER_DESCRIPTION },
]

// 관리자 영역 헤더 메뉴 (대시보드 홈·404 의 상단 네비).
export const ADMIN_NAV: NavItem[] = ADMIN_SECTIONS.map((section) => ({
  to: section.to,
  label: section.navLabel,
}))

// 헤더에 띄울 페이지 제목. 페이지를 추가하면 여기에 한 줄 더한다.
export const ADMIN_PAGE_TITLES: Record<string, string> = {
  '/admin': '대시보드',
}

// 관리 페이지(사이드바 레이아웃)의 좌측 메뉴.
export const ADMIN_SIDEBAR_HOME: NavItem = { to: '/admin', label: '대시보드' }

export const ADMIN_SIDEBAR_NAV: NavItem[] = ADMIN_SECTIONS.map((section) => ({
  to: section.to,
  label: section.sidebarLabel,
}))

const BREADCRUMB_HOME: BreadcrumbSegment = { label: '홈', to: '/admin' }

// 경로 접미사 → 서브페이지 라벨. 목록 경로면 null.
function adminSubPageLabel(baseNoun: string, pathname: string, sectionTo: string): string | null {
  if (pathname === sectionTo) return null
  if (pathname === `${sectionTo}/new`) return `${baseNoun} 작성`
  if (pathname.endsWith('/edit')) return `${baseNoun} 수정`
  return `${baseNoun} 상세`
}

// ADMIN_SIDEBAR_NAV(=ADMIN_SECTIONS 파생)를 단일 출처로 현재 경로의 상단바 타이틀·브레드크럼을 유도한다.
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
