import { apiClient, endpoints } from '@api'
import type { ApiCreateNoticeRequest, ApiNoticeResponse, ApiUpdateNoticeRequest } from '@api'

export async function createNotice(body: ApiCreateNoticeRequest): Promise<ApiNoticeResponse> {
  const { data } = await apiClient.post<ApiNoticeResponse>(endpoints.adminNotices, body)
  return data
}

export async function updateNotice(
  noticeId: string,
  body: ApiUpdateNoticeRequest,
): Promise<ApiNoticeResponse> {
  const { data } = await apiClient.patch<ApiNoticeResponse>(endpoints.adminNotice(noticeId), body)
  return data
}
