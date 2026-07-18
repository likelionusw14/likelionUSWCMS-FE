import type { SelectOption } from '@types'

// 세션 주차 — Figma 주차 드롭다운의 선택지 (1~8주차 + 기타).
export const WEEK_OPTIONS: SelectOption[] = [
  ...Array.from({ length: 8 }, (_, index) => {
    const week = `${index + 1}주차`
    return { value: week, label: week }
  }),
  { value: '기타', label: '기타' },
]

// 사용자 세션자료 API 필터는 1~52 정수 주차와 PartType enum을 사용한다.
export const USER_SESSION_WEEK_OPTIONS: SelectOption[] = Array.from({ length: 52 }, (_, index) => ({
  value: String(index + 1),
  label: `${index + 1}주차`,
}))

export const USER_SESSION_PART_OPTIONS: SelectOption[] = [
  { value: 'PLANNING', label: '기획' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
  { value: 'COMMON', label: '공통' },
]
