import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import projectMidnight from '@/assets/home/projects/project-1.png'
import projectMealdo from '@/assets/home/projects/project-2.png'
import projectBitemind from '@/assets/home/projects/project-3.jpg'
import { fetchUserProject, fetchUserProjects } from '@api'
import type { ApiProjectPage, ApiProjectResponse, ApiProjectType } from '@api'
import { isBackendConnected } from '@config'
import type { UserProject, UserProjectPage, UserProjectQuery } from '@types'

const MOCK_PROJECTS: ApiProjectResponse[] = [
  {
    projectId: 12,
    title: '2026 대동제 웹사이트 제작',
    description:
      '수원대학교 대동제의 공연과 부스 정보를 한눈에 확인할 수 있도록 제작한 반응형 웹 서비스입니다.',
    projectType: 'HACKATHON',
    thumbnail: {
      file: {
        fileAssetId: 101,
        purpose: 'PROJECT_THUMBNAIL',
        originalFileName: 'project-1.png',
        mimeType: 'image/png',
        sizeBytes: 391_160,
        createdAt: '2026-03-02T10:00:00Z',
      },
      downloadUrl: projectMidnight,
      expiresAt: '2099-12-31T23:59:59Z',
    },
    deployUrl: 'https://project12.example.com',
    githubUrl: 'https://github.com/example/project12',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    startedMonth: '2026-02',
    endedMonth: '2026-03',
    participants: [
      { userId: 21017023, name: '김대머', role: '기획' },
      { userId: 22017055, name: '이대머', role: '디자인' },
      { userId: 22017056, name: '박대머', role: '프론트엔드' },
      { userId: 22017057, name: '최대머', role: '백엔드' },
    ],
    version: 0,
    createdAt: '2026-03-02T10:00:00Z',
    updatedAt: '2026-03-10T15:30:00Z',
  },
  {
    projectId: 11,
    title: 'AI 기반 스터디 매칭 서비스',
    description: '관심사가 비슷한 학습자를 매칭해주는 웹 서비스입니다.',
    projectType: 'IDEATHON',
    thumbnail: {
      file: {
        fileAssetId: 102,
        purpose: 'PROJECT_THUMBNAIL',
        originalFileName: 'project-2.png',
        mimeType: 'image/png',
        sizeBytes: 290_850,
        createdAt: '2026-02-20T09:00:00Z',
      },
      downloadUrl: projectMealdo,
      expiresAt: '2099-12-31T23:59:59Z',
    },
    deployUrl: 'https://project11.example.com',
    githubUrl: 'https://github.com/example/project11',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    startedMonth: '2026-01',
    endedMonth: '2026-02',
    participants: [
      { userId: 21017024, name: '김형진', role: '백엔드' },
      { userId: 22017058, name: '신준호', role: '기획' },
    ],
    version: 0,
    createdAt: '2026-02-20T09:00:00Z',
    updatedAt: '2026-02-24T11:20:00Z',
  },
  {
    projectId: 10,
    title: '아기사자 활동 기록 서비스',
    description: '동아리 구성원의 활동과 성장을 기록하는 서비스입니다.',
    projectType: 'HACKATHON',
    thumbnail: {
      file: {
        fileAssetId: 103,
        purpose: 'PROJECT_THUMBNAIL',
        originalFileName: 'project-3.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 66_100,
        createdAt: '2025-08-15T12:00:00Z',
      },
      downloadUrl: projectBitemind,
      expiresAt: '2099-12-31T23:59:59Z',
    },
    deployUrl: null,
    githubUrl: 'https://github.com/example/project10',
    cohort: { cohortId: 13, number: 13, name: '13기' },
    startedMonth: '2025-07',
    endedMonth: '2025-08',
    participants: [{ userId: 21017025, name: '이수원', role: '프론트엔드' }],
    version: 0,
    createdAt: '2025-08-15T12:00:00Z',
    updatedAt: '2025-08-20T10:00:00Z',
  },
]

const PROJECT_TYPE_LABEL: Record<ApiProjectType, string> = {
  HACKATHON: '해커톤',
  IDEATHON: '아이디어톤',
}

function toUserProject(response: ApiProjectResponse): UserProject {
  const [, endedMonth = '1'] = response.endedMonth.split('-')

  return {
    id: String(response.projectId),
    title: response.title,
    thumbnailUrl: response.thumbnail?.downloadUrl ?? '',
    tags: [`${response.cohort.number}기`, PROJECT_TYPE_LABEL[response.projectType]],
    cohortId: response.cohort.cohortId,
    developedYear: Number.parseInt(response.endedMonth.slice(0, 4), 10),
    developedMonth: Number.parseInt(endedMonth, 10),
    createdAt: response.createdAt,
    projectType: response.projectType,
    cohortName: response.cohort.name,
    startedMonth: response.startedMonth,
    endedMonth: response.endedMonth,
    description: response.description,
    deployUrl: response.deployUrl ?? null,
    githubUrl: response.githubUrl ?? null,
    participants: response.participants,
    version: response.version,
    updatedAt: response.updatedAt,
  }
}

function createMockPage(query: UserProjectQuery): ApiProjectPage {
  const page = query.page ?? 0
  const size = query.size ?? 20
  const filtered = MOCK_PROJECTS.filter((project) => {
    if (query.cohortId !== undefined && project.cohort.cohortId !== query.cohortId) return false
    if (query.projectTypes?.length && !query.projectTypes.includes(project.projectType))
      return false
    return true
  }).sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
  const totalPages = Math.ceil(filtered.length / size)

  return {
    items: filtered.slice(page * size, page * size + size),
    page: {
      page,
      size,
      totalElements: filtered.length,
      totalPages,
      hasNext: page + 1 < totalPages,
    },
  }
}

export function useUserProjects(query: UserProjectQuery = {}): {
  data: UserProjectPage
  isLoading: boolean
} {
  const request = useQuery({
    queryKey: ['user-projects', query],
    queryFn: () => fetchUserProjects(query),
    enabled: isBackendConnected,
  })
  const response = request.data ?? createMockPage(query)

  return {
    data: {
      content: response.items.map(toUserProject),
      ...response.page,
    },
    isLoading: isBackendConnected && request.isLoading,
  }
}

export function useUserProjectDetail(projectId: string | undefined): {
  data: UserProject | undefined
  isLoading: boolean
} {
  const request = useQuery({
    queryKey: ['user-project', projectId],
    queryFn: () => fetchUserProject(projectId ?? ''),
    enabled: isBackendConnected && projectId !== undefined,
    retry: false,
  })
  const mockProject = MOCK_PROJECTS.find((project) => String(project.projectId) === projectId)
  const response = isBackendConnected ? request.data : mockProject

  return {
    data: response ? toUserProject(response) : undefined,
    isLoading: isBackendConnected && request.isLoading,
  }
}

const USER_PROJECT_PAGE_SIZE = 4

export function useUserProjectListPage() {
  const [cohort, setCohort] = useState('')
  const [projectType, setProjectType] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useUserProjects({
    page: page - 1,
    size: USER_PROJECT_PAGE_SIZE,
    cohortId: cohort ? Number.parseInt(cohort, 10) : undefined,
    projectTypes: projectType ? [projectType as ApiProjectType] : undefined,
  })

  function updateCohort(value: string) {
    setCohort(value)
    setPage(1)
  }

  function updateProjectType(value: string) {
    setProjectType(value)
    setPage(1)
  }

  return {
    data,
    isLoading,
    cohort,
    projectType,
    page,
    setCohort: updateCohort,
    setProjectType: updateProjectType,
    setPage,
    resetPage: () => setPage(1),
  }
}
