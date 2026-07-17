import type { Entity } from './common'

// 회원 (Entity: id 필수).
export interface Member extends Entity {
  name: string
  // 분류 (아기사자 / 운영진).
  role: string
  // 기수 (14기 ...).
  cohort: string
  // 파트 (기획 / 디자인 / 프론트엔드 / 백엔드).
  part: string
  // 가입상태 (PENDING / ACTIVE).
  status: string
}

// 승인대기 회원 (가입 승인 전).
export interface PendingMember extends Entity {
  name: string
  cohort: string
  part: string
}
