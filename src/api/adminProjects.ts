import { apiClient, endpoints } from '@api'
import type { ApiCreateProjectRequest, ApiProjectResponse, ApiUpdateProjectRequest } from '@api'

// 프로젝트 등록. Idempotency-Key 는 스펙상 필수 헤더이므로 호출부에서 제출 1건당 하나를 만들어 넘긴다.
export async function createProject(
  body: ApiCreateProjectRequest,
  idempotencyKey: string,
): Promise<ApiProjectResponse> {
  const { data } = await apiClient.post<ApiProjectResponse>(endpoints.adminProjects, body, {
    headers: { 'Idempotency-Key': idempotencyKey },
  })
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
