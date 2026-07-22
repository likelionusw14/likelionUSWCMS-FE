import type { Entity } from './common'

// 사자 화면모델 (Entity: id 필수, id = String(userId)).
export interface Lion extends Entity {
  name: string
  // 기수 라벨 ("14기").
  cohort: string
  cohortId: number
  // 파트 라벨 ("기획").
  part: string
  // 분류 (운영진 / 아기사자).
  activityType: LionActivityType
  // 학과 — GET /lions 미제공, mock 전용 (백엔드 추가 대상).
  department: string
  // 프로필 이미지 — API 미제공 → null 이면 카드 placeholder.
  imageUrl: string | null
}

// API activityType: ADMIN=OPERATOR, MEMBER=BABY_LION.
export type LionActivityType = 'OPERATOR' | 'BABY_LION'

// 사자 목록 조회 쿼리. role 로 운영진/아기사자를 구분한다.
export interface UserLionQuery {
  role: 'ADMIN' | 'MEMBER'
  cohortId?: number
  part?: 'PLANNING' | 'DESIGN' | 'FRONTEND' | 'BACKEND'
  size?: number
}
