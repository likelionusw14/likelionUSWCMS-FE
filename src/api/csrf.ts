import { readCookie } from '@utils'

// 쿠키 인증(refresh_session/onboarding_session) 요청에 붙는 CSRF 이중 제출 토큰.
// client.ts 와 auth.ts 가 함께 쓰므로 순환 import 를 피해 별도 모듈로 둔다.

// 백엔드가 어떤 쿠키 이름으로 내려주는지 OpenAPI 스펙에 없어 관례적인 후보를 순서대로 본다.
// 백엔드 확정 시 이 배열을 실제 이름 하나로 줄인다.
const CSRF_COOKIE_NAMES = ['XSRF-TOKEN', 'csrf_token', 'CSRF-TOKEN'] as const

export function readCsrfToken(): string | null {
  for (const name of CSRF_COOKIE_NAMES) {
    const value = readCookie(name)
    if (value) return value
  }
  return null
}

// 쿠키 인증 요청 공통 설정 — 크로스 오리진에도 쿠키를 싣고, 상태 변경이면 CSRF 헤더를 얹는다.
export function credentialedConfig() {
  const csrf = readCsrfToken()
  return {
    withCredentials: true,
    headers: csrf ? { 'X-CSRF-Token': csrf } : undefined,
  }
}
