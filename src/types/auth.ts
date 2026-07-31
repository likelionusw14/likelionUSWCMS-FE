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

// 카카오 콜백이 실어 보내는 인증 결과. 백엔드가 `?status=` 로 명시한다.
// 쿠키(onboarding_session/refresh_session)는 HttpOnly 라 프론트가 직접 볼 수 없어,
// 어느 쪽인지는 이 파라미터로만 안다. 값이 없으면 카카오를 거치지 않은 직접 진입이다.
export type AuthCallbackStatus = 'onboarding' | 'member'

// 콜백 실패 사유. 백엔드가 `?error=` 로 넘긴다 (문구는 AUTH_ERROR_MESSAGE).
export type AuthErrorCode = 'access_denied' | 'invalid_state' | 'kakao_error' | 'server_error'

// 세션 복원 결과 — refresh_session 쿠키로 Access JWT 를 받아오는 시도의 결말.
// expired 는 쿠키가 없거나 만료된 정상적 실패라, 통신 실패(failed)와 문구를 달리한다.
export type AuthSessionResult =
  | { kind: 'ok'; user: User }
  | { kind: 'expired' }
  | { kind: 'failed'; message: string }
