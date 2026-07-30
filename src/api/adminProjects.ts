import { apiClient, endpoints } from '@api'
import type { ApiCreateProjectRequest, ApiProjectResponse, ApiUpdateProjectRequest } from '@api'

export async function createProject(body: ApiCreateProjectRequest): Promise<ApiProjectResponse> {
  const { data } = await apiClient.post<ApiProjectResponse>(endpoints.adminProjects, body)
  return data
}

export async function updateProject(
  projectId: string,
  body: ApiUpdateProjectRequest,
): Promise<ApiProjectResponse> {
  const { data } = await apiClient.patch<ApiProjectResponse>(
    endpoints.adminProject(projectId),
    body,
  )
  return data
}

export async function deleteProject(projectId: string): Promise<void> {
  await apiClient.delete(endpoints.adminProject(projectId))
}
