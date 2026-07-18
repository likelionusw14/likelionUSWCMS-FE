import { apiClient, endpoints } from '@api'
import type { ApiProjectPage, ApiProjectResponse } from '@api'
import type { UserProjectQuery } from '@types'

export async function fetchUserProjects(query: UserProjectQuery): Promise<ApiProjectPage> {
  const params = new URLSearchParams()

  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.size !== undefined) params.set('size', String(query.size))
  if (query.cohortId !== undefined) params.set('cohortId', String(query.cohortId))
  query.projectTypes?.forEach((projectType) => params.append('projectTypes', projectType))

  const { data } = await apiClient.get<ApiProjectPage>(endpoints.projects, { params })
  return data
}

export async function fetchUserProject(projectId: string): Promise<ApiProjectResponse> {
  const { data } = await apiClient.get<ApiProjectResponse>(endpoints.project(projectId))
  return data
}
