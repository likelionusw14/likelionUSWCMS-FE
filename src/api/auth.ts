import { apiClient } from './client'
import { credentialedConfig } from './csrf'
import { endpoints } from './endpoints'
import type { ApiAccessTokenResponse, ApiAccountResponse, ApiCreateAccountRequest } from './types'
import { env } from '@config'
import type { Role, User } from '@types'

// 카카오 OIDC 는 백엔드가 code 교환·ID Token 검증을 수행하는 BFF 구조다.
// 따라서 프론트에는 카카오 REST API key 가 필요 없고(백엔드 설정값), 세션은 HttpOnly 쿠키로 오간다.
// - refresh_session   : 기존 계정 — POST /auth/tokens 로 Access JWT 재발급
// - onboarding_session: 미가입자 — POST /accounts 로 추가정보 제출
// 두 쿠키 모두 JS 로 읽을 수 없으므로 "어느 쪽인지"는 요청을 보내 응답으로만 판별한다.

// 카카오 로그인 시작 URL. fetch 가 아니라 브라우저를 통째로 보내야 하는 이동 목적지다
// (백엔드가 302 로 카카오 인증 화면에 넘긴다 — XHR 로는 이 리다이렉트를 따라갈 수 없다).
export function kakaoLoginUrl(): string {
  return `${env.apiBaseUrl}${endpoints.kakaoLogin}`
}

// Access Token 재발급. refresh_session 쿠키가 유효하면 계정 정보까지 함께 돌려준다.
// 콜백 직후 "기존 계정인지" 판별하는 용도로도 쓴다 (401 이면 기존 계정이 아니다).
export async function reissueAccessToken(): Promise<ApiAccessTokenResponse> {
  const { data } = await apiClient.post<ApiAccessTokenResponse>(
    endpoints.authTokens,
    undefined,
    credentialedConfig(),
  )
  return data
}

// 서비스 로그아웃 — 서버의 Refresh Token 폐기 + 쿠키 만료. 카카오 연결 해제는 하지 않는다.
export async function deleteAuthSession(): Promise<void> {
  await apiClient.delete(endpoints.authSession, credentialedConfig())
}

// 백엔드 계정 → 앱 사용자 매핑 seam.
// 백엔드는 역할(MEMBER/ADMIN)과 가입상태(PENDING/ACTIVE/REJECTED)를 따로 두는데,
// 앱의 Role 은 접근 권한 하나로 합쳐진 개념이라 둘을 곱해서 판정한다.
// 승인 전(PENDING)·거절(REJECTED) 계정은 아직 활동 권한이 없으므로 GUEST 로 떨어뜨린다.
export function toAuthUser(account: ApiAccountResponse): User {
  let role: Role = 'GUEST'
  if (account.role === 'ADMIN') role = 'STAFF'
  else if (account.status === 'ACTIVE') role = 'MEMBER'

  return {
    // 백엔드 Id 는 int64 — 엔티티 id 는 문자열 규약이라 변환한다.
    id: String(account.userId),
    name: account.name,
    role,
    status: account.status,
  }
}

// 가입 신청 — onboarding_session 쿠키에 추가정보를 결합해 PENDING 계정을 만든다.
// Idempotency-Key 는 24시간 동안 같은 요청 결과를 재사용하므로 제출 1건당 하나를 만들어 넘긴다.
export async function createAccount(
  payload: ApiCreateAccountRequest,
  idempotencyKey: string,
): Promise<ApiAccountResponse> {
  const config = credentialedConfig()
  const { data } = await apiClient.post<ApiAccountResponse>(endpoints.accounts, payload, {
    ...config,
    headers: { ...config.headers, 'Idempotency-Key': idempotencyKey },
  })
  return data
}
