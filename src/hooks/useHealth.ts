import { useQuery } from '@tanstack/react-query'
import { apiClient, endpoints } from '@api'
import { isBackendConnected } from '@config'
import type { QueryResult } from '@types'

interface HealthData {
  status: string
}

// 백엔드 헬스체크. { data, isLoading } seam 패턴 예시 훅.
// 백엔드 미연동(VITE_API_BASE_URL 빈 값)일 때는 쿼리를 끄고 mock 상태를 돌려준다.
export function useHealth(): QueryResult<HealthData> {
  const query = useQuery({
    queryKey: ['health'],
    queryFn: async (): Promise<HealthData> => {
      const { data } = await apiClient.get<HealthData>(endpoints.health)
      return data
    },
    enabled: isBackendConnected,
  })

  return {
    data: query.data ?? { status: isBackendConnected ? 'unknown' : 'mock' },
    isLoading: isBackendConnected && query.isLoading,
  }
}
