import { apiClient, endpoints } from '@api'
import type { ApiScheduleResponse } from '@api'

export async function fetchUserSchedules(
  yearMonth: string,
  cohortId?: number,
): Promise<ApiScheduleResponse[]> {
  const params = new URLSearchParams({ yearMonth })
  if (cohortId !== undefined) params.set('cohortId', String(cohortId))

  const { data } = await apiClient.get<ApiScheduleResponse[]>(endpoints.schedules, { params })
  return data
}
