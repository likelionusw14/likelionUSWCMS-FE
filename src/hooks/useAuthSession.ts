import { normalizeError, reissueAccessToken, toAuthUser } from '@api'
import { useAuthStore } from '@store'
import type { AuthCallbackOutcome } from '@types'

// 세션 복원 seam — refresh_session 쿠키로 Access JWT 를 받아 인증 상태를 채운다.
//
// 백엔드는 카카오 콜백에서 미가입자면 onboarding_session, 기존 계정이면 refresh_session 쿠키를
// 심는다. 둘 다 HttpOnly 라 JS 로 어느 쪽인지 볼 수 없으므로, /auth/tokens 를 한 번 두드려
// 200 이면 기존 계정, 401 이면 "기존 계정은 아님"으로 판정한다.
//
// 401 의 의미는 호출자 맥락에 따라 다르다 — 카카오 콜백 직후면 미가입자(추가정보 입력),
// 앱 부팅 중이면 그냥 비로그인. 그래서 판정만 돌려주고 이동은 호출자가 정한다.
export async function restoreSession(): Promise<AuthCallbackOutcome> {
  try {
    const data = await reissueAccessToken()
    const user = toAuthUser(data.account)
    useAuthStore.getState().login({ token: data.accessToken, user })
    return { kind: 'member', user }
  } catch (error) {
    const { status, message } = normalizeError(error)
    if (status === 401) return { kind: 'onboarding' }
    return { kind: 'failed', message }
  }
}
