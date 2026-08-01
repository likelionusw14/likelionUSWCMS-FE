import { apiClient, endpoints } from '@api'
import type {
  ApiCreateLearningResourceRequest,
  ApiLearningResourceResponse,
  ApiUpdateLearningResourceRequest,
} from '@api'

// 세션자료 등록. Idempotency-Key 는 스펙상 필수 헤더이므로 호출부에서 제출 1건당 하나를 만들어 넘긴다.
export async function createResource(
  body: ApiCreateLearningResourceRequest,
  idempotencyKey: string,
): Promise<ApiLearningResourceResponse> {
  const { data } = await apiClient.post<ApiLearningResourceResponse>(
    endpoints.adminResources,
    body,
    { headers: { 'Idempotency-Key': idempotencyKey } },
  )
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
