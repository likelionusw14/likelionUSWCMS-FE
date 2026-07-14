import type { NavItem } from '@types'

// 로그인 전(공통) 헤더 메뉴. 각 페이지는 순차 구현 예정이라 경로만 먼저 확정한다.
export const PUBLIC_NAV: NavItem[] = [
  { to: '/projects', label: '프로젝트' },
  { to: '/notices', label: '공지' },
  { to: '/schedule', label: '일정' },
  { to: '/members', label: '사자' },
]

// 헤더 우측 강조 버튼.
export const PUBLIC_APPLY: NavItem = { to: '/apply', label: '지원하기' }
