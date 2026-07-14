import type { Entity } from './common'

// 프로젝트 (Entity: id 필수).
export interface Project extends Entity {
  name: string
  // 태그 — 프로젝트 / 해커톤 등 분류.
  category: string
  // 제작기간 (YYYY.MM).
  startDate: string
  endDate: string
  githubUrl: string
  projectUrl: string
  // 참여자 표기 문자열 (예: 김ㅇㅇ(14기,기획)).
  participants: string[]
  description: string
  // 카드에 붙는 해시태그.
  tags: string[]
  imageUrls: string[]
}

// 프로젝트 작성·수정 폼 값 (참여자는 쉼표로 구분한 한 줄 입력).
export interface ProjectFormValues {
  name: string
  category: string
  startDate: string
  endDate: string
  githubUrl: string
  projectUrl: string
  participants: string
  description: string
}
