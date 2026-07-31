import { apiClient, endpoints } from '@api'
import type { ApiDownloadUrlResponse, ApiLearningResourceResponse, ApiResourcePage } from '@api'
import type { UserSessionQuery } from '@types'

export async function fetchUserResources(query: UserSessionQuery): Promise<ApiResourcePage> {
  const params = new URLSearchParams()

  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.size !== undefined) params.set('size', String(query.size))
  if (query.week !== undefined) params.set('week', String(query.week))
  if (query.targetPart !== undefined) params.set('targetPart', query.targetPart)

  const { data } = await apiClient.get<ApiResourcePage>(endpoints.resources, { params })
  return data
}

export async function fetchUserResource(resourceId: string): Promise<ApiLearningResourceResponse> {
  const { data } = await apiClient.get<ApiLearningResourceResponse>(endpoints.resource(resourceId))
  return data
}

export async function fetchUserResourceDownloadUrl(
  resourceId: string,
): Promise<ApiDownloadUrlResponse> {
  const { data } = await apiClient.get<ApiDownloadUrlResponse>(
    endpoints.resourceDownloadUrl(resourceId),
  )
  return data
}
