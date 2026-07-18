import type { Entity } from './common'
import type { ApiNoticeTag } from '@api'

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

// 사용자 공지 조회 화면 모델. 관리자 작성 모델과 API 응답 모델을 분리한다.
export interface UserNotice extends Entity {
  title: string
  content: string
  tag: ApiNoticeTag
  tagLabel: string
  isFixed: boolean
  externalUrl: string | null
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface UserNoticePage {
  content: UserNotice[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}

export interface UserNoticeQuery {
  page?: number
  size?: number
  tag?: ApiNoticeTag
}
