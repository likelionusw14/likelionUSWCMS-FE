import { useQuery } from '@tanstack/react-query'
import { fetchMyAttendances } from '@api'
import type { ApiAttendanceResponse, ApiPartType } from '@api'
import { isBackendConnected } from '@config'
import type { AttendanceRecord, MyAttendanceQuery } from '@types'
import { usePagination } from './usePagination'

const PART_LABEL: Record<ApiPartType, string> = {
  PLANNING: '기획',
  DESIGN: '디자인',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  COMMON: '공통',
}

// 본인 정보(로그인 사용자) — mock 전용. 학번은 GET /attendances 응답에 없어 mock 에서 채운다(백엔드 추가 대상).
const MOCK_ME = { name: '김멋사', studentId: '23099009', part: '기획' as const }
const MOCK_REMARKS = ['', '배탈', '', '개인사정', '', '지각(교통)']

// 본인 출결 24건(세션 날짜 내림차순 가정).
const MOCK_MY_ATTENDANCE: AttendanceRecord[] = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  date: `2026.07.${String(24 - i).padStart(2, '0')}`,
  name: MOCK_ME.name,
  studentId: MOCK_ME.studentId,
  part: MOCK_ME.part,
  present: i % 3 !== 0,
  remark: MOCK_REMARKS[i % MOCK_REMARKS.length],
}))

// AttendanceResponse → 화면모델. studentId 는 응답에 없어 '' (연동 시 프로필에서 보완).
function toRecord(response: ApiAttendanceResponse): AttendanceRecord {
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

const PAGE_SIZE = 10

// 본인 출결 목록 + 페이지네이션. 미연동 시 mock, 연동 시 서버 페이지.
export function useMyAttendanceList(): {
  records: AttendanceRecord[]
  totalCount: number
  page: number
  setPage: (p: number) => void
  totalPages: number
  isLoading: boolean
} {
  // 로컬 페이지네이션(1-based) — mock 전체를 slice. 연동 시 query.page 로 교체 가능.
  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: MOCK_MY_ATTENDANCE.length,
    pageSize: PAGE_SIZE,
  })

  const query: MyAttendanceQuery = { page: page - 1, size: PAGE_SIZE }
  const request = useQuery({
    queryKey: ['my-attendances', query],
    queryFn: () => fetchMyAttendances(query),
    enabled: isBackendConnected,
  })

  if (!isBackendConnected) {
    return {
      records: slice(MOCK_MY_ATTENDANCE),
      totalCount: MOCK_MY_ATTENDANCE.length,
      page,
      setPage,
      totalPages,
      isLoading: false,
    }
  }

  const records = request.data?.items.map(toRecord) ?? []
  const meta = request.data?.page
  return {
    records,
    totalCount: meta?.totalElements ?? 0,
    page: (meta?.page ?? 0) + 1,
    setPage,
    // 기록이 없으면 서버가 0 을 주는데 화면에는 '1/0 page' 로 보인다. 최소 1쪽으로 맞춘다.
    totalPages: Math.max(1, meta?.totalPages ?? 1),
    isLoading: request.isLoading,
  }
}
