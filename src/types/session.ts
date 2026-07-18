import type { Entity } from './common'
import type { ApiPartType } from '@api'

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
  // 낙관적 동시성 토큰 — 수정 요청(UpdateLearningResourceRequest.version)에 그대로 전달한다.
  version: number
}

// 세션자료 작성·수정 폼 값 (파일은 별도 상태로 다룬다).
export interface SessionFormValues {
  week: string
  part: string
}

// 사용자 세션자료 조회 화면 모델. 관리자 Session 모델과 분리한다.
export interface UserSessionResource extends Entity {
  title: string
  fileName: string
  week: number
  targetPart: ApiPartType
  partLabel: string
  mimeType: string
  sizeBytes: number
  previewUrl: string
  pageCount: number | null
  createdAt: string
  updatedAt: string
}

export interface UserSessionPage {
  content: UserSessionResource[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}

export interface UserSessionQuery {
  page?: number
  size?: number
  week?: number
  targetPart?: ApiPartType
}
