import type { SelectOption } from '@types'

// 세션 주차 — Figma 주차 드롭다운의 선택지 (1~8주차 + 기타).
export const WEEK_OPTIONS: SelectOption[] = [
  ...Array.from({ length: 8 }, (_, index) => {
    const week = `${index + 1}주차`
    return { value: week, label: week }
  }),
  { value: '기타', label: '기타' },
]
