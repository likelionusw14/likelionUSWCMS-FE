import { apiClient, endpoints } from '@api'
import type { ApiCohortListResponse, ApiCohortSummary } from '@api'

// 기수 선택지 조회 — 프로젝트/일정/회원 필터의 기수 드롭다운 공용 소스.
// 명세는 { items: [...] } 인데 운영 서버는 배열을 그대로 돌려준다(2026-07-31 확인).
// 어느 쪽이 와도 같은 모양으로 정규화해 호출부가 한 형태만 다루게 한다.
export async function fetchCohorts(): Promise<ApiCohortListResponse> {
  const { data } = await apiClient.get<ApiCohortListResponse | ApiCohortSummary[]>(
    endpoints.cohorts,
  )
  return Array.isArray(data) ? { items: data } : data
}
