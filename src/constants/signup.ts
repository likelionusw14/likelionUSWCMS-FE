import type { SelectOption } from '@types'
import { COHORT } from './brand'

// 기수·파트 선택지 — Figma 기수·파트 드롭다운의 선택지.
// 기수는 현재 기수 하나뿐이다 (지난 기수까지 다루게 되면 백엔드 값으로 채운다).
export const COHORT_OPTIONS: SelectOption[] = [{ value: `${COHORT}기`, label: `${COHORT}기` }]

export const PART_OPTIONS: SelectOption[] = [
  { value: '기획', label: '기획' },
  { value: '디자인', label: '디자인' },
  { value: '프론트엔드', label: '프론트엔드' },
  { value: '백엔드', label: '백엔드' },
]
