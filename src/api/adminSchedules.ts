import { apiClient, endpoints } from '@api'
import type {
  ApiCreateScheduleRequest,
  ApiScheduleResponse,
  ApiUpdateScheduleRequest,
} from '@api'

export interface AdminScheduleQuery {
  // 'YYYY-MM' 형식.
  yearMonth: string
  cohortId?: number
}

// 월별 일정 조회 (사용자/관리자 공용 조회 경로 /schedules). 배열로 반환된다.
export async function fetchSchedules(query: AdminScheduleQuery): Promise<ApiScheduleResponse[]> {
  const params = new URLSearchParams()
  params.set('yearMonth', query.yearMonth)
  if (query.cohortId !== undefined) params.set('cohortId', String(query.cohortId))

  const { data } = await apiClient.get<ApiScheduleResponse[]>(endpoints.schedules, { params })
  return data
}

export async function fetchSchedule(scheduleId: string): Promise<ApiScheduleResponse> {
  const { data } = await apiClient.get<ApiScheduleResponse>(endpoints.schedule(scheduleId))
  return data
}

export async function createSchedule(
  body: ApiCreateScheduleRequest,
): Promise<ApiScheduleResponse> {
  const { data } = await apiClient.post<ApiScheduleResponse>(endpoints.adminSchedules, body)
  return data
}

export async function updateSchedule(
  scheduleId: string,
  body: ApiUpdateScheduleRequest,
): Promise<ApiScheduleResponse> {
  const { data } = await apiClient.patch<ApiScheduleResponse>(
    endpoints.adminSchedule(scheduleId),
    body,
  )
  return data
}

export async function deleteSchedule(scheduleId: string): Promise<void> {
  await apiClient.delete(endpoints.adminSchedule(scheduleId))
}
