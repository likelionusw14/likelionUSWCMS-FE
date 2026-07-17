import type { AttendanceRecord } from '@types'

// 백엔드 연동 전 목데이터. 연동 시 이 훅 안에서 apiClient 호출로 교체한다
// (컴포넌트는 { data, isLoading } 모양에만 의존한다).
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

// 출석 내역 조회.
export function useAttendance(): { data: AttendanceRecord[]; isLoading: boolean } {
  return { data: MOCK_ATTENDANCE, isLoading: false }
}
