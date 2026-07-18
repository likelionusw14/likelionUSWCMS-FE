import { apiClient, endpoints } from '@api'
import type { ApiNoticePage, ApiNoticeResponse } from '@api'
import type { UserNoticeQuery } from '@types'

export async function fetchUserNotices(query: UserNoticeQuery): Promise<ApiNoticePage> {
  const params = new URLSearchParams()

  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.size !== undefined) params.set('size', String(query.size))
  if (query.tag !== undefined) params.set('tag', query.tag)

  const { data } = await apiClient.get<ApiNoticePage>(endpoints.notices, { params })
  return data
}

export async function fetchUserNotice(noticeId: string): Promise<ApiNoticeResponse> {
  const { data } = await apiClient.get<ApiNoticeResponse>(endpoints.notice(noticeId))
  return data
}
