import type { ApiAccountStatus } from '@api'
import type { Entity } from './common'

// 회원 (Entity: id 필수). id = String(userId).
export interface Member extends Entity {
  name: string
  // 분류 라벨 (아기사자 / 운영진).
  role: string
  // 기수 라벨 (14기 ...).
  cohort: string
  // 파트 라벨 (기획 / 디자인 / 프론트엔드 / 백엔드 / 공통).
  part: string
  // 가입상태 라벨 (승인대기 / 활동중 / 거절).
  status: string
  // 낙관적 동시성 토큰 (수정/상태변경 시 필요).
  version: number
  // 원본 학과.
  department: string
  // 학번.
  studentId: string
  // 기수 식별자 (수정 시 필요).
  cohortId: number
  // 원본 가입상태 enum.
  statusCode: ApiAccountStatus
}

// 승인대기 회원 (가입 승인 전).
export interface PendingMember extends Entity {
  name: string
  cohort: string
  part: string
  // 승인/거절 시 필요한 동시성 토큰.
  version: number
}

// 회원 목록 페이지 (서버 페이지네이션 응답 화면모델).
export interface MemberPage {
  content: Member[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}
