import type { ApiAccountStatus } from '@api'
import type { Entity } from './common'

// 사용자 역할. 백엔드 역할 문자열은 로그인 seam 에서 이 식별자로 매핑한다.
export type Role = 'GUEST' | 'MEMBER' | 'STAFF'

// 라우팅 영역.
export type AreaType = 'common' | 'user' | 'admin'

// 로그인된 사용자 (Entity: id 필수).
export interface User extends Entity {
  name: string
  role: Role
  // 가입 상태. 승인 대기(PENDING)면 아직 활동 권한이 없어 대기 화면으로 보낸다.
  // 데모 로그인 등 백엔드를 거치지 않은 사용자는 값이 없다.
  status?: ApiAccountStatus
}

// 인증 스토어 상태·액션 (zustand store 계약).
// AGENTS.md에 따라 모든 인터페이스 타입은 src/types/에 정의되어야하나 위반했으므로 authStore.ts에서 이동함.
export interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (payload: { token: string; user: User }) => void
  // Access JWT 만 교체 (만료 시 refresh_session 으로 조용히 재발급하는 경로).
  setToken: (token: string) => void
  logout: () => void
}

// 카카오 콜백 처리 결과 — 콜백 화면의 라우팅 분기 입력.
// 미가입자와 기존 계정은 백엔드가 서로 다른 HttpOnly 쿠키를 심어 구분하는데,
// 쿠키를 JS 로 읽을 수 없으므로 /auth/tokens 응답(200/401)으로 판별한다.
export type AuthCallbackOutcome =
  { kind: 'member'; user: User } | { kind: 'onboarding' } | { kind: 'failed'; message: string }
