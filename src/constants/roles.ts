import type { AreaType, Role } from '@types'

// 역할 계층: 값이 클수록 상위 권한 (STAFF ≥ MEMBER ≥ GUEST).
const ROLE_RANK: Record<Role, number> = {
  GUEST: 0,
  MEMBER: 1,
  STAFF: 2,
}

// 영역 접근에 필요한 최소 역할.
const AREA_MIN_ROLE: Record<AreaType, Role> = {
  common: 'GUEST',
  user: 'MEMBER',
  admin: 'STAFF',
}

// 역할별 홈 경로 (로그인 후·404 "홈으로 이동"·권한 없는 영역에서 쫓겨날 때 공통 대상).
// MEMBER 는 자기 영역(/app)으로 간다 — 마케팅 홈(/)이 아니라 로그인 상태에서 길을
// 잃었을 때 늘 자기 대시보드로 돌아가야 자연스럽다.
const ROLE_HOME: Record<Role, string> = {
  GUEST: '/',
  MEMBER: '/app',
  STAFF: '/admin',
}

// 역할 UI 라벨 (한국어).
export const ROLE_LABEL: Record<Role, string> = {
  GUEST: '게스트',
  MEMBER: '아기사자',
  STAFF: '운영진',
}

// 계층형 접근 판정: role 이 area 의 최소 역할 이상인가.
export function canAccess(role: Role, area: AreaType): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[AREA_MIN_ROLE[area]]
}

// 역할별 홈 경로.
export function roleHome(role: Role): string {
  return ROLE_HOME[role]
}
