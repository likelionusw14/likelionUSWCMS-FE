import type { SelectOption } from '@types'

// 프로젝트 태그. 디자인에 나온 값만 넣었다 (백엔드 연동 시 API 값으로 교체).
export const PROJECT_CATEGORY_OPTIONS: SelectOption[] = [
  { value: '아이디어톤', label: '아이디어톤' },
  { value: '해커톤', label: '해커톤' },
]

// 사용자 조회 API의 ProjectType enum과 일치하는 필터 값.
export const USER_PROJECT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'IDEATHON', label: '아이디어톤' },
  { value: 'HACKATHON', label: '해커톤' },
]

// 사용자 프로젝트 기수 필터. 실제 연동 시 기수 조회 API 결과로 교체한다.
export const PROJECT_COHORT_OPTIONS: SelectOption[] = [
  { value: '14', label: '14기' },
  { value: '13', label: '13기' },
]
