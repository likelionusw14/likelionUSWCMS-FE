import type { NavItem } from '@types'

// 관리자(운영진) 영역 헤더 메뉴. 각 페이지는 순차 구현 예정이라 경로만 먼저 확정한다.
export const ADMIN_NAV: NavItem[] = [
  { to: '/admin/projects', label: '프로젝트' },
  { to: '/admin/sessions', label: '세션자료' },
  { to: '/admin/notices', label: '공지' },
  { to: '/admin/schedule', label: '일정' },
  { to: '/admin/attendance', label: '출결' },
  { to: '/admin/members', label: '사자' },
  { to: '/admin/certificates', label: '활동증명서' },
]

// 헤더에 띄울 페이지 제목. 페이지를 추가하면 여기에 한 줄 더한다.
export const ADMIN_PAGE_TITLES: Record<string, string> = {
  '/admin': '대시보드',
}
