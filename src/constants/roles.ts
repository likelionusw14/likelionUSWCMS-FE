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

// 역할별 홈 경로 (로그인 후/진입 시 리다이렉트 대상).
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

// 역할 홈 경로.
export function roleHome(role: Role): string {
  return ROLE_HOME[role]
}
