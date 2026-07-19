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
// MEMBER 의 홈은 로그인 사용자용 마케팅 홈(`/`, 로그인 헤더). /app 은 대시보드 하위 영역.
const ROLE_HOME: Record<Role, string> = {
  GUEST: '/',
  MEMBER: '/',
  STAFF: '/admin',
}

// 역할별 "자기 영역" 홈 경로 (예: 404 페이지의 "홈으로 이동").
// ROLE_HOME 과 달리 MEMBER 도 자기 영역(/app)으로 보낸다 — ROLE_HOME 은
// "권한 없는 영역에서 쫓겨날 때"용이라 MEMBER 를 마케팅 홈(/)으로 보내는 게 맞지만,
// 404 는 이미 그 영역 안에 있다가 길을 잃은 상황이라 자기 영역으로 돌아가야 자연스럽다.
const ROLE_AREA_HOME: Record<Role, string> = {
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

// 역할별 "자기 영역" 홈 경로.
export function roleAreaHome(role: Role): string {
  return ROLE_AREA_HOME[role]
}
