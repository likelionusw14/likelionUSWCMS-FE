import type { AuthErrorCode } from '@types'

// 카카오 콜백 실패 사유 라벨.
// 백엔드가 `/auth/callback?error=<code>` 로 넘겨주는 코드를 사용자 문구로 옮긴다.
// 모르는 코드가 와도 화면이 비지 않도록 AUTH_ERROR_FALLBACK 으로 받는다.
export const AUTH_ERROR_MESSAGE: Record<AuthErrorCode, string> = {
  access_denied: '카카오 로그인을 취소하셨습니다.',
  invalid_state: '만료되었거나 유효하지 않은 요청입니다. 다시 로그인해주세요.',
  kakao_error: '카카오 서버와 통신하지 못했습니다. 잠시 후 다시 시도해주세요.',
  server_error: '로그인 처리 중 오류가 발생했습니다.',
}

export const AUTH_ERROR_FALLBACK = '로그인에 실패했습니다. 다시 시도해주세요.'

// 세션이 없거나 만료된 상태로 착지한 경우 (status=member 인데 토큰 재발급이 401).
export const AUTH_SESSION_EXPIRED = '로그인 세션이 만료되었습니다. 다시 로그인해주세요.'

// status·error 중 무엇도 없이 착지한 경우 — 카카오를 거치지 않은 직접 진입이다.
export const AUTH_INVALID_ENTRY = '잘못된 접근입니다. 로그인 화면에서 다시 시도해주세요.'
