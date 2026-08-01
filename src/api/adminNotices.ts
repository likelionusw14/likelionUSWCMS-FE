import { apiClient, endpoints } from '@api'
import type { ApiCreateNoticeRequest, ApiNoticeResponse, ApiUpdateNoticeRequest } from '@api'

// 공지 등록. Idempotency-Key 는 스펙상 필수 헤더이므로 호출부에서 제출 1건당 하나를 만들어 넘긴다.
export async function createNotice(
  body: ApiCreateNoticeRequest,
  idempotencyKey: string,
): Promise<ApiNoticeResponse> {
  const { data } = await apiClient.post<ApiNoticeResponse>(endpoints.adminNotices, body, {
    headers: { 'Idempotency-Key': idempotencyKey },
  })
  return data
}

export async function updateNotice(
  noticeId: string,
  body: ApiUpdateNoticeRequest,
): Promise<ApiNoticeResponse> {
  const { data } = await apiClient.patch<ApiNoticeResponse>(endpoints.adminNotice(noticeId), body)
  return data
}
