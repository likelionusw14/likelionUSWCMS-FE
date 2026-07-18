import type { Entity } from './common'

// 출석 내역 한 건 (Entity: id 필수).
export interface AttendanceRecord extends Entity {
  // 표시용 날짜 ('YYYY.MM.DD').
  date: string
  name: string
  // 학번.
  studentId: string
  part: string
  // 출석 여부(체크박스 토글).
  present: boolean
  // 비고(없으면 빈 문자열).
  remark: string
  // 낙관적 동시성 버전(실 API 응답의 version). mock 은 undefined.
  version?: number
}
