import axios from 'axios'
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
