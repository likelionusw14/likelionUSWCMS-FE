import { readCookie } from '@utils'

// 쿠키 인증(refresh_session/onboarding_session) 요청에 붙는 CSRF 이중 제출 토큰.
// client.ts 와 auth.ts 가 함께 쓰므로 순환 import 를 피해 별도 모듈로 둔다.

// 쿠키 이름은 백엔드 구현 문서(/v3/api-docs)에서 확인한 값이다 — 쿠키 인증 엔드포인트가
// cookie:csrf_token 과 header:X-CSRF-Token 을 함께 파라미터로 선언한다 (이중 제출).
const CSRF_COOKIE_NAME = 'csrf_token'

export function readCsrfToken(): string | null {
  return readCookie(CSRF_COOKIE_NAME)
}

// 쿠키 인증 요청 공통 설정 — 크로스 오리진에도 쿠키를 싣고, 상태 변경이면 CSRF 헤더를 얹는다.
export function credentialedConfig() {
  const csrf = readCsrfToken()
  return {
    withCredentials: true,
    headers: csrf ? { 'X-CSRF-Token': csrf } : undefined,
  }
}
