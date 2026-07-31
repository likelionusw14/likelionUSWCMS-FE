import { normalizeError, reissueAccessToken, toAuthUser } from '@api'
import { useAuthStore } from '@store'
import type { AuthSessionResult } from '@types'

// 세션 복원 seam — refresh_session 쿠키로 Access JWT 를 받아 인증 상태를 채운다.
// 쿠키가 없거나 만료면 401 이 오는데, 이건 통신 실패가 아니라 "로그인 상태가 아님"이므로
// expired 로 따로 구분해 호출자가 다른 문구를 쓸 수 있게 한다.
export async function restoreSession(): Promise<AuthSessionResult> {
  try {
    const data = await reissueAccessToken()
    const user = toAuthUser(data.account)
    useAuthStore.getState().login({ token: data.accessToken, user })
    return { kind: 'ok', user }
  } catch (error) {
    const { status, message } = normalizeError(error)
    if (status === 401) return { kind: 'expired' }
    return { kind: 'failed', message }
  }
}
