import type { Entity } from './common'

// 세션자료 (Entity: id 필수).
export interface Session extends Entity {
  fileName: string
  // 주차 (1~8주차 / 기타).
  week: string
  // 파트 (기획 / 디자인 / 프론트엔드 / 백엔드).
  part: string
  // 자료 미리보기 이미지 (없으면 빈 문자열).
  previewUrl: string
  // 자료 전체 쪽수 — 뷰어의 Page (1/N) 표기에 쓴다.
  pageCount: number
}

// 세션자료 작성·수정 폼 값 (파일은 별도 상태로 다룬다).
export interface SessionFormValues {
  week: string
  part: string
}
