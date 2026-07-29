import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { credentialedConfig } from './csrf'
import { endpoints } from './endpoints'
import type { ApiAccessTokenResponse } from './types'
import { env } from '@config'
import { useAuthStore } from '@store'

// 공용 axios 인스턴스. 모든 API 호출은 이 클라이언트를 통해 나간다.
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

// 요청 인터셉터: 인증 토큰이 있으면 Authorization 헤더 주입.
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 재시도 1회 표시 — 갱신 후 재요청이 또 401 이면 무한 루프에 빠지지 않도록 한다.
type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean }

// 동시에 401 이 여러 개 떠도 재발급은 한 번만 (single-flight). 나머지는 같은 약속을 기다린다.
let refreshInFlight: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
  refreshInFlight ??= apiClient
    .post<ApiAccessTokenResponse>(endpoints.authTokens, undefined, credentialedConfig())
    .then(({ data }) => {
      // 재발급 응답에 계정이 동봉되지만 토큰만 갈아끼운다
      // (역할·상태 변경은 다음 로그인/부트스트랩에서 반영된다).
      useAuthStore.getState().setToken(data.accessToken)
      return data.accessToken
    })
    .finally(() => {
      refreshInFlight = null
    })
  return refreshInFlight
}

// 응답 인터셉터: Access JWT 는 만료가 짧다. 401 이면 refresh_session 쿠키로 한 번 갱신하고 재시도한다.
// 갱신까지 실패하면 세션이 끝난 것이므로 인증 상태를 비운다 (가드가 로그인 화면으로 보낸다).
apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) throw error

    const config = error.config as RetriableConfig | undefined
    const isAuthEndpoint =
      config?.url === endpoints.authTokens || config?.url === endpoints.authSession

    if (error.response?.status !== 401 || !config || config._retried || isAuthEndpoint) {
      throw error
    }

    config._retried = true
    try {
      const token = await refreshAccessToken()
      config.headers.Authorization = `Bearer ${token}`
      return await apiClient.request(config)
    } catch {
      useAuthStore.getState().logout()
      throw error
    }
  },
)
