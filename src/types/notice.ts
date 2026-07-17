import type { Entity } from './common'

// 공지 (Entity: id 필수).
export interface Notice extends Entity {
  title: string
  // 태그 (일반 / 중요 / 행사).
  tag: string
  // 본문.
  content: string
  // 작성일 표시 문자열 ('YYYY.MM.DD').
  createdAt: string
  // 필독 여부 (목록 좌측 체크).
  mustRead: boolean
  // 첨부 파일명 (없으면 빈 문자열).
  fileName: string
}
