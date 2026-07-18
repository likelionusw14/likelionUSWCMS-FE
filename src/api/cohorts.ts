import { apiClient, endpoints } from '@api'
import type { ApiCohortListResponse } from '@api'

// 기수 선택지 조회 — 프로젝트/일정/회원 필터의 기수 드롭다운 공용 소스.
export async function fetchCohorts(): Promise<ApiCohortListResponse> {
  const { data } = await apiClient.get<ApiCohortListResponse>(endpoints.cohorts)
  return data
}
