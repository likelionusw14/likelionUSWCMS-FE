import type { SelectOption } from '@types'

// 아기사자 파트 필터 선택지 — Figma 분류 칩(기획/디자인/프론트엔드/백엔드). COMMON 제외.
export const LION_PART_OPTIONS: SelectOption[] = [
  { value: 'PLANNING', label: '기획' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
]
