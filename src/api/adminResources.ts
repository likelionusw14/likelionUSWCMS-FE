import { apiClient, endpoints } from '@api'
import type {
  ApiCreateLearningResourceRequest,
  ApiLearningResourceResponse,
  ApiUpdateLearningResourceRequest,
} from '@api'

export async function createResource(
  body: ApiCreateLearningResourceRequest,
): Promise<ApiLearningResourceResponse> {
  const { data } = await apiClient.post<ApiLearningResourceResponse>(endpoints.adminResources, body)
  return data
}

export async function updateResource(
  resourceId: string,
  body: ApiUpdateLearningResourceRequest,
): Promise<ApiLearningResourceResponse> {
  const { data } = await apiClient.patch<ApiLearningResourceResponse>(
    endpoints.adminResource(resourceId),
    body,
  )
  return data
}
