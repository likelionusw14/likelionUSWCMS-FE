import type { Entity } from './common'

export type ProjectTag = '해커톤' | '아이디어톤'

export interface ProjectParticipant {
  userId: number
  name: string
  cohortId: number
  part: string
  role: string
}

// 프로젝트 목록 API 응답 항목.
export interface ProjectSummaryResponse {
  projectId: number
  title: string
  thumbnailUrl: string
  tags: string[]
  cohortId: number
  developedYear: number
  developedMonth: number
  createdAt: string
}

// 프로젝트 상세 API 응답.
export interface ProjectDetailResponse extends ProjectSummaryResponse {
  description: string
  deployUrl: string
  githubUrl: string
  participants: ProjectParticipant[]
  updatedAt: string
}

export interface ProjectPageResponse {
  content: ProjectSummaryResponse[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}

export interface ProjectQuery {
  page?: number
  size?: number
  cohortId?: number
  tag?: ProjectTag
}

// 컴포넌트가 의존하는 화면용 프로젝트 모델. API 숫자 ID는 경계에서 문자열로 변환한다.
export interface ProjectSummary extends Entity {
  title: string
  thumbnailUrl: string
  tags: string[]
  cohortId: number
  developedYear: number
  developedMonth: number
  createdAt: string
}

export interface ProjectPage {
  content: ProjectSummary[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}

export interface Project extends ProjectSummary {
  description: string
  deployUrl: string
  githubUrl: string
  participants: ProjectParticipant[]
  updatedAt: string
}

// 프로젝트 작성·수정 폼 값. 관리자 폼은 백엔드 쓰기 명세 확정 전 기존 입력 구조를 유지한다.
export interface ProjectFormValues {
  name: string
  cohort: string
  category: string
  startDate: string
  endDate: string
  githubUrl: string
  projectUrl: string
  participants: string
  description: string
}
