import { useState } from 'react'
import projectMidnight from '@/assets/home/projects/project-1.png'
import projectMealdo from '@/assets/home/projects/project-2.png'
import projectBitemind from '@/assets/home/projects/project-3.jpg'
import type {
  Project,
  ProjectDetailResponse,
  ProjectPage,
  ProjectQuery,
  ProjectSummary,
} from '@types'

// 백엔드 연동 전 API 명세와 같은 모양으로 유지하는 목 응답.
const MOCK_PROJECT_RESPONSES: ProjectDetailResponse[] = [
  {
    projectId: 12,
    title: '2026 대동제 웹사이트 제작',
    description:
      '수원대학교 대동제의 공연과 부스 정보를 한눈에 확인할 수 있도록 제작한 반응형 웹 서비스입니다.',
    thumbnailUrl: projectMidnight,
    deployUrl: 'https://project12.example.com',
    githubUrl: 'https://github.com/example/project12',
    cohortId: 14,
    tags: ['14기', '해커톤'],
    developedYear: 2026,
    developedMonth: 3,
    participants: [
      { userId: 21017023, name: '김대머', cohortId: 14, part: '기획', role: '팀장' },
      { userId: 22017055, name: '이대머', cohortId: 14, part: '디자인', role: '팀원' },
      { userId: 22017056, name: '박대머', cohortId: 14, part: '프론트엔드', role: '팀원' },
      { userId: 22017057, name: '최대머', cohortId: 14, part: '백엔드', role: '팀원' },
    ],
    createdAt: '2026-03-02T10:00:00Z',
    updatedAt: '2026-03-10T15:30:00Z',
  },
  {
    projectId: 11,
    title: 'AI 기반 스터디 매칭 서비스',
    description: '관심사가 비슷한 학습자를 매칭해주는 웹 서비스입니다.',
    thumbnailUrl: projectMealdo,
    deployUrl: 'https://project11.example.com',
    githubUrl: 'https://github.com/example/project11',
    cohortId: 14,
    tags: ['14기', '아이디어톤'],
    developedYear: 2026,
    developedMonth: 2,
    participants: [
      { userId: 21017024, name: '김형진', cohortId: 14, part: '백엔드', role: '팀원' },
      { userId: 22017058, name: '신준호', cohortId: 14, part: '기획', role: '팀장' },
    ],
    createdAt: '2026-02-20T09:00:00Z',
    updatedAt: '2026-02-24T11:20:00Z',
  },
  {
    projectId: 10,
    title: '아기사자 활동 기록 서비스',
    description: '동아리 구성원의 활동과 성장을 기록하는 서비스입니다.',
    thumbnailUrl: projectBitemind,
    deployUrl: 'https://project10.example.com',
    githubUrl: 'https://github.com/example/project10',
    cohortId: 13,
    tags: ['13기', '해커톤'],
    developedYear: 2025,
    developedMonth: 8,
    participants: [
      { userId: 21017025, name: '이수원', cohortId: 13, part: '프론트엔드', role: '팀장' },
    ],
    createdAt: '2025-08-15T12:00:00Z',
    updatedAt: '2025-08-20T10:00:00Z',
  },
]

function toProjectSummary(response: ProjectDetailResponse): ProjectSummary {
  return {
    id: String(response.projectId),
    title: response.title,
    thumbnailUrl: response.thumbnailUrl,
    tags: response.tags,
    cohortId: response.cohortId,
    developedYear: response.developedYear,
    developedMonth: response.developedMonth,
    createdAt: response.createdAt,
  }
}

function toProject(response: ProjectDetailResponse): Project {
  return {
    ...toProjectSummary(response),
    description: response.description,
    deployUrl: response.deployUrl,
    githubUrl: response.githubUrl,
    participants: response.participants,
    updatedAt: response.updatedAt,
  }
}

// 관리자 화면 호환용 전체 프로젝트 조회. 실제 연동 시 관리자 전용 API 훅으로 분리한다.
export function useProjects(): { data: Project[]; isLoading: boolean } {
  return { data: MOCK_PROJECT_RESPONSES.map(toProject), isLoading: false }
}

// 사용자 프로젝트 목록 조회. 필터와 0-based 페이지 규칙은 API 명세를 따른다.
export function useProjectCatalog(query: ProjectQuery = {}): {
  data: ProjectPage
  isLoading: boolean
} {
  const page = query.page ?? 0
  const size = query.size ?? 10
  const filtered = MOCK_PROJECT_RESPONSES.filter((project) => {
    if (query.cohortId && project.cohortId !== query.cohortId) return false
    if (query.tag && !project.tags.includes(query.tag)) return false
    return true
  }).sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
  const content = filtered.slice(page * size, page * size + size).map(toProjectSummary)
  const totalPages = Math.ceil(filtered.length / size)

  return {
    data: {
      content,
      page,
      size,
      totalElements: filtered.length,
      totalPages,
      hasNext: page + 1 < totalPages,
    },
    isLoading: false,
  }
}

// 프로젝트 단건 조회.
export function useProject(id: string | undefined): {
  data: Project | undefined
  isLoading: boolean
} {
  const response = MOCK_PROJECT_RESPONSES.find((project) => String(project.projectId) === id)
  return { data: response ? toProject(response) : undefined, isLoading: false }
}

const USER_PROJECT_PAGE_SIZE = 4

// 사용자 목록의 필터·페이지 상태와 API 조회 조건을 한곳에서 관리한다.
export function useUserProjectList() {
  const [cohort, setCohort] = useState('')
  const [tag, setTag] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useProjectCatalog({
    page: page - 1,
    size: USER_PROJECT_PAGE_SIZE,
    cohortId: cohort ? Number.parseInt(cohort, 10) : undefined,
    tag: tag ? (tag as ProjectQuery['tag']) : undefined,
  })

  function updateCohort(value: string) {
    setCohort(value)
    setPage(1)
  }

  function updateTag(value: string) {
    setTag(value)
    setPage(1)
  }

  return {
    data,
    isLoading,
    cohort,
    tag,
    page,
    setCohort: updateCohort,
    setTag: updateTag,
    setPage,
    resetPage: () => setPage(1),
  }
}
