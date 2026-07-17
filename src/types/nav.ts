// 사이드바/네비게이션 항목.
export interface NavItem {
  to: string
  label: string
}

// 관리 섹션 단일 출처 항목 — 헤더 라벨·사이드바 라벨·카드 설명·경로를 한곳에서 정의한다.
// ADMIN_NAV(헤더) · ADMIN_SIDEBAR_NAV(사이드바) · 대시보드 카드가 모두 이 배열에서 파생된다.
export interface AdminSection {
  key: string
  to: string
  navLabel: string
  sidebarLabel: string
  cardDescription: string
}
