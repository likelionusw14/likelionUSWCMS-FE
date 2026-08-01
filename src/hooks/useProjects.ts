import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import projectMidnight from '@/assets/home/projects/project-1.png'
import projectMealdo from '@/assets/home/projects/project-2.png'
import projectBitemind from '@/assets/home/projects/project-3.jpg'
import {
  createProject,
  deleteProject,
  fetchUserProject,
  fetchUserProjects,
  updateProject,
} from '@api'
import type {
  ApiCreateProjectRequest,
  ApiProjectResponse,
  ApiProjectType,
  ApiUpdateProjectRequest,
} from '@api'
import { isBackendConnected } from '@config'
import type {
  Project,
  ProjectDetailResponse,
  ProjectFormValues,
  ProjectPage,
  ProjectQuery,
  ProjectSummary,
  QueryResult,
} from '@types'

const PROJECTS_KEY = 'admin-projects'

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

// API enum ↔ 한국어 라벨 (프로젝트 유형).
const PROJECT_TYPE_LABEL: Record<ApiProjectType, string> = {
  HACKATHON: '해커톤',
  IDEATHON: '아이디어톤',
}

// 한국어 라벨 → API enum (폼 category 역매핑).
const PROJECT_TYPE_ENUM: Record<string, ApiProjectType> = {
  해커톤: 'HACKATHON',
  아이디어톤: 'IDEATHON',
}

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

// 목 응답(ProjectDetailResponse) → Project. 목 데이터엔 version 이 없어 0 으로 둔다.
function toProject(response: ProjectDetailResponse): Project {
  return {
    ...toProjectSummary(response),
    description: response.description,
    deployUrl: response.deployUrl,
    githubUrl: response.githubUrl,
    participants: response.participants,
    updatedAt: response.updatedAt,
    version: 0,
  }
}

// 실 API 응답(ApiProjectResponse) → Project(관리자 화면모델).
// developedYear/Month 는 startedMonth('YYYY-MM')에서 파싱한다.
function toProjectFromApi(response: ApiProjectResponse): Project {
  const [yearText = '0', monthText = '1'] = response.startedMonth.split('-')
  return {
    id: String(response.projectId),
    title: response.title,
    thumbnailUrl: response.thumbnail?.downloadUrl ?? '',
    tags: [response.cohort.name, PROJECT_TYPE_LABEL[response.projectType]],
    cohortId: response.cohort.cohortId,
    developedYear: Number.parseInt(yearText, 10),
    developedMonth: Number.parseInt(monthText, 10),
    createdAt: response.createdAt,
    description: response.description,
    deployUrl: response.deployUrl ?? '',
    githubUrl: response.githubUrl ?? '',
    // [추정] ProjectParticipantResponse 는 userId/name/role 만 제공한다. 화면모델의 part 는 응답에
    // 없어 빈 문자열, cohortId 는 프로젝트 기수로 대체한다(참여자 상세 스키마 확정 전까지).
    participants: response.participants.map((participant) => ({
      userId: participant.userId,
      name: participant.name,
      cohortId: response.cohort.cohortId,
      part: '',
      role: participant.role,
    })),
    updatedAt: response.updatedAt,
    version: response.version,
  }
}

// 'YYYY.MM' / 'YYYY.MM.DD' / 'YYYY-MM' → 'YYYY-MM'. 구분자를 '-' 로 정규화한 뒤 앞 두 조각만 사용한다.
function toYearMonth(value: string): string {
  const [year = '', month = ''] = value.replace(/\./g, '-').split('-')
  return `${year}-${month.padStart(2, '0')}`
}

// ProjectFormValues → CreateProjectRequest.
export function toCreateProjectRequest(values: ProjectFormValues): ApiCreateProjectRequest {
  return {
    title: values.name.trim(),
    description: values.description.trim(),
    projectType: PROJECT_TYPE_ENUM[values.category] ?? 'HACKATHON',
    // thumbnailAssetId 미전달: FileUploadField 가 파일명 문자열만 다뤄 실제 File 객체가 없다.
    // TODO(파일 업로드): 폼이 File 을 넘기도록 확장 후 uploadFile('PROJECT_THUMBNAIL', file) 로
    //   fileAssetId 를 획득해 thumbnailAssetId 로 전달해야 한다.
    deployUrl: values.projectUrl.trim() || null,
    githubUrl: values.githubUrl.trim() || null,
    cohortId: Number.parseInt(values.cohort, 10) || 0,
    startedMonth: toYearMonth(values.startDate),
    endedMonth: toYearMonth(values.endDate),
    // [추정] 관리자 폼 참여자는 자유 텍스트라 userId(필수)를 신뢰성 있게 추출할 수 없다.
    // 구조화된 참여자 편집 UI 도입 전까지 빈 배열로 전달한다(잘못된 userId 전송 방지).
    participants: [],
  }
}

// ProjectFormValues → UpdateProjectRequest. version 은 수정 대상(useProject 응답)의 값을 필수 전달.
export function toUpdateProjectRequest(
  values: ProjectFormValues,
  version: number,
): ApiUpdateProjectRequest {
  return {
    version,
    title: values.name.trim(),
    description: values.description.trim(),
    projectType: PROJECT_TYPE_ENUM[values.category] ?? 'HACKATHON',
    deployUrl: values.projectUrl.trim() || null,
    githubUrl: values.githubUrl.trim() || null,
    cohortId: Number.parseInt(values.cohort, 10) || 0,
    startedMonth: toYearMonth(values.startDate),
    endedMonth: toYearMonth(values.endDate),
    // [추정] 참여자는 create 와 동일 이유로 빈 배열 전달(구조화된 편집 UI 도입 전까지).
    participants: [],
  }
}

// 관리자 전체 프로젝트 조회. 스펙상 admin 전용 목록이 없어 공용 조회(/projects)를 사용한다.
// 백엔드 미연동이면 목데이터를 반환한다(데모 유지).
export function useProjects(): QueryResult<Project[]> {
  const request = useQuery({
    queryKey: [PROJECTS_KEY],
    queryFn: () => fetchUserProjects({}),
    enabled: isBackendConnected,
  })
  const data = request.data
    ? request.data.items.map(toProjectFromApi)
    : MOCK_PROJECT_RESPONSES.map(toProject)
  return { data, isLoading: isBackendConnected && request.isLoading }
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

// 프로젝트 단건 조회. 백엔드 미연동이면 목데이터에서 찾는다.
export function useProject(id: string | undefined): QueryResult<Project | undefined> {
  const request = useQuery({
    queryKey: [PROJECTS_KEY, id],
    queryFn: () => fetchUserProject(id ?? ''),
    enabled: isBackendConnected && id !== undefined,
    retry: false,
  })
  const mock = MOCK_PROJECT_RESPONSES.find((project) => String(project.projectId) === id)
  const data = isBackendConnected
    ? request.data
      ? toProjectFromApi(request.data)
      : undefined
    : mock
      ? toProject(mock)
      : undefined
  return { data, isLoading: isBackendConnected && request.isLoading }
}

// 프로젝트 등록.
export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: ApiCreateProjectRequest) => {
      // 미연동 데모: 서버 호출 없이 성공 처리.
      if (!isBackendConnected) return
      // Idempotency-Key 는 제출 1건당 새로 만든다 (같은 키는 24시간 동안 첫 응답을 재생한다).
      await createProject(body, crypto.randomUUID())
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] }),
  })
}

// 프로젝트 수정. version 필수(낙관적 동시성).
export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      projectId,
      body,
    }: {
      projectId: string
      body: ApiUpdateProjectRequest
    }) => {
      if (!isBackendConnected) return
      await updateProject(projectId, body)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] }),
  })
}

// 프로젝트 삭제.
export function useDeleteProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (projectId: string) => {
      if (!isBackendConnected) return
      await deleteProject(projectId)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] }),
  })
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
