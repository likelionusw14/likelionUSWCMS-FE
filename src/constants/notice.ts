import type { SelectOption } from '@types'

// 공지 태그 — Figma 공지 태그 드롭다운의 선택지. value 는 API NoticeTag enum, label 은 한국어 표기.
export const NOTICE_TAG_OPTIONS: SelectOption[] = [
  { value: 'SCHEDULE', label: '일정' },
  { value: 'PROJECT', label: '프로젝트' },
  { value: 'PROMOTION_EVENT', label: '홍보·이벤트' },
  { value: 'OTHER', label: '기타' },
]
