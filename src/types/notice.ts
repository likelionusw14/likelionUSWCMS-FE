import type { Entity } from './common'
import type { ApiNoticeTag } from '@api'

// 공지 (Entity: id 필수).
export interface Notice extends Entity {
  title: string
  // 태그 표시 라벨 (한국어: 일정 / 프로젝트 / 홍보·이벤트 / 기타).
  tag: string
  // 태그 원본 enum 값 (SCHEDULE / PROJECT / PROMOTION_EVENT / OTHER). 폼·필터에서 사용.
  tagValue: ApiNoticeTag
  // 본문.
  content: string
  // 작성일 표시 문자열 ('YYYY.MM.DD').
  createdAt: string
  // 필독 여부 (목록 좌측 체크) = isFixed.
  mustRead: boolean
  // 첨부 파일명 (없으면 빈 문자열).
  fileName: string
  // 낙관적 동시성 버전 (수정 요청에 그대로 전달).
  version: number
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
