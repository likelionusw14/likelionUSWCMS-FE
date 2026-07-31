import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAttendances, updateAttendance } from '@api'
import type {
  AdminAttendanceQuery,
  ApiAttendanceResponse,
  ApiAttendanceStatus,
  ApiPartType,
  ApiUpdateAttendanceRequest,
} from '@api'
import { isBackendConnected } from '@config'
import type { AttendanceRecord } from '@types'

// PartType enum → 한국어 라벨.
const PART_LABEL: Record<ApiPartType, string> = {
  PLANNING: '기획',
  DESIGN: '디자인',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  COMMON: '공통',
}

// [추정] admin 출결 목록은 scheduleId 필수(스펙). 현 UI 는 scheduleId 개념 없이
// 날짜 필터만 있어 스펙과 구조가 다르다. 데모 단계이므로 mock fallback 으로 화면을
// 유지하고 실 API 경로만 준비해 둔다. scheduleId 가 주어지고 백엔드 연동 시에만 실 조회.
const NAMES = ['김멋사', '이사자', '박수원', '최운영', '정기획', '한디자']
const PARTS = ['기획', '디자인', '프론트엔드', '백엔드']

const MOCK_ATTENDANCE: AttendanceRecord[] = Array.from({ length: 24 }, (_, index) => ({
  id: String(index + 1),
  date: `2026.07.${String((index % 28) + 1).padStart(2, '0')}`,
  name: NAMES[index % NAMES.length],
  studentId: `2309${String(9000 + index).padStart(4, '0')}`,
  part: PARTS[index % PARTS.length],
  present: index % 3 !== 0,
  remark: index % 4 === 0 ? '지각(교통)' : '',
}))

// AttendanceResponse → 화면모델(AttendanceRecord) 변환.
// date=scheduleDate('YYYY.MM.DD'), name=userName, studentId(응답에 없음)='',
// part=enum→한국어, present=status==='PRESENT', remark=memo ?? '', version 보존.
function toAttendanceRecord(response: ApiAttendanceResponse): AttendanceRecord {
  return {
    id: String(response.attendanceId),
    date: response.scheduleDate ? response.scheduleDate.replace(/-/g, '.') : '',
    name: response.userName ?? '',
    studentId: '',
    part: response.part ? PART_LABEL[response.part] : '',
    present: response.status === 'PRESENT',
    remark: response.memo ?? '',
    version: response.version,
  }
}

// 출석 내역 조회. scheduleId 가 있고 백엔드 연동 시 실 API, 그 외 mock.
export function useAttendance(query?: AdminAttendanceQuery): {
  data: AttendanceRecord[]
  isLoading: boolean
} {
  const enabled = isBackendConnected && query?.scheduleId !== undefined
  const request = useQuery({
    queryKey: ['admin-attendances', query],
    // enabled 가 false 일 때는 실행되지 않으므로 non-null 단언 안전.
    queryFn: () => fetchAttendances(query as AdminAttendanceQuery),
    enabled,
  })

  if (!enabled) {
    // 미연동 데모: mock 유지.
    return { data: MOCK_ATTENDANCE, isLoading: false }
  }

  const data = request.data?.items.map(toAttendanceRecord) ?? []
  return { data, isLoading: request.isLoading }
}

export interface UpdateAttendanceVariables {
  attendanceId: string
  status: ApiAttendanceStatus
  memo: string
  version: number
}

// 출결 상태/비고 수정. 미연동이면 no-op(성공 처리)로 데모 유지.
export function useUpdateAttendance() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (variables: UpdateAttendanceVariables) => {
      if (!isBackendConnected) return
      const body: ApiUpdateAttendanceRequest = {
        // UpdateAttendanceRequest.status 는 PRESENT | LATE | ABSENT 만 허용.
        status: variables.status === 'NOT_CHECKED' ? 'ABSENT' : variables.status,
        memo: variables.memo,
        version: variables.version,
      }
      await updateAttendance(variables.attendanceId, body)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-attendances'] }),
  })
}
