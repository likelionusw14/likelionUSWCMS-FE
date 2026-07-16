import type { NavItem } from '@types'

// 사용자(아기사자) 영역 네비. 페이지 추가 시 여기에 항목을 더한다.
export const USER_NAV: NavItem[] = [
  { to: '/app/projects', label: '프로젝트' },
  { to: '/app/sessions', label: '세션자료' },
  { to: '/app/notices', label: '공지' },
  { to: '/app/schedule', label: '일정' },
  { to: '/app/attendance', label: '출결' },
  { to: '/app/members', label: '사자' },
  { to: '/app/certificates', label: '활동증명서' },
]
