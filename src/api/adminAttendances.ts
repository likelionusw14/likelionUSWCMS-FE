import { apiClient, endpoints } from '@api'
import type {
  ApiAttendanceCodeResponse,
  ApiAttendancePage,
  ApiAttendanceResponse,
  ApiAttendanceStatus,
  ApiPartType,
  ApiUpdateAttendanceRequest,
} from '@api'

export interface AdminAttendanceQuery {
  // 대상 일정(필수).
  scheduleId: number
  page?: number
  size?: number
  part?: ApiPartType
  userId?: number
  status?: ApiAttendanceStatus
}

export async function fetchAttendances(query: AdminAttendanceQuery): Promise<ApiAttendancePage> {
  const params = new URLSearchParams()
  params.set('scheduleId', String(query.scheduleId))
  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.size !== undefined) params.set('size', String(query.size))
  if (query.part !== undefined) params.set('part', query.part)
  if (query.userId !== undefined) params.set('userId', String(query.userId))
  if (query.status !== undefined) params.set('status', query.status)

  const { data } = await apiClient.get<ApiAttendancePage>(endpoints.adminAttendances, { params })
  return data
}

export async function updateAttendance(
  attendanceId: string,
  body: ApiUpdateAttendanceRequest,
): Promise<ApiAttendanceResponse> {
  const { data } = await apiClient.patch<ApiAttendanceResponse>(
    endpoints.adminAttendance(attendanceId),
    body,
  )
  return data
}

// 출결 코드 생성/재발급.
export async function createAttendanceCode(scheduleId: string): Promise<ApiAttendanceCodeResponse> {
  const { data } = await apiClient.post<ApiAttendanceCodeResponse>(
    endpoints.adminAttendanceCode(scheduleId),
  )
  return data
}

// 현재 유효한 출결 코드 조회.
export async function fetchAttendanceCode(scheduleId: string): Promise<ApiAttendanceCodeResponse> {
  const { data } = await apiClient.get<ApiAttendanceCodeResponse>(
    endpoints.adminAttendanceCode(scheduleId),
  )
  return data
}
