import { apiClient, endpoints } from '@api'
import type { ApiProjectPage, ApiProjectResponse } from '@api'
import type { UserProjectQuery } from '@types'

export async function fetchUserProjects(query: UserProjectQuery): Promise<ApiProjectPage> {
  const params = new URLSearchParams()

  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.size !== undefined) params.set('size', String(query.size))
  if (query.cohortId !== undefined) params.set('cohortId', String(query.cohortId))
  // 운영 서버 파라미터 이름은 projectType(단수)이고 배열이라 같은 키를 반복해 싣는다
  // (openapi/openapi.yaml 은 projectTypes 로 적혀 있으나 /v3/api-docs 기준 단수가 맞다).
  query.projectTypes?.forEach((projectType) => params.append('projectType', projectType))

  const { data } = await apiClient.get<ApiProjectPage>(endpoints.projects, { params })
  return data
}

export async function fetchUserProject(projectId: string): Promise<ApiProjectResponse> {
  const { data } = await apiClient.get<ApiProjectResponse>(endpoints.project(projectId))
  return data
}
