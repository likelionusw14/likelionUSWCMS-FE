import { apiClient, endpoints } from '@api'
import type { ApiAttendancePage, ApiAttendanceResponse } from '@api'
import type { MyAttendanceQuery } from '@types'

// 본인 출결 목록 조회 (JWT userId 기준, 다른 사용자 ID 안 받음).
export async function fetchMyAttendances(query: MyAttendanceQuery): Promise<ApiAttendancePage> {
  const params = new URLSearchParams()
  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.size !== undefined) params.set('size', String(query.size))
  const { data } = await apiClient.get<ApiAttendancePage>(endpoints.attendances, { params })
  return data
}

// 6자리 출석 코드 인증. scheduleId 소스는 백엔드 연동 시 확정(현재 mock 미사용).
export async function checkInAttendance(
  scheduleId: string,
  code: string,
): Promise<ApiAttendanceResponse> {
  const { data } = await apiClient.post<ApiAttendanceResponse>(
    endpoints.attendanceCheckIn(scheduleId),
    { code },
  )
  return data
}
