import { apiClient, endpoints } from '@api'
import type { ApiLionPage } from '@api'
import type { UserLionQuery } from '@types'

export async function fetchUserLions(query: UserLionQuery): Promise<ApiLionPage> {
  const params = new URLSearchParams()

  params.set('role', query.role)
  if (query.cohortId !== undefined) params.set('cohortId', String(query.cohortId))
  if (query.part) params.set('part', query.part)
  // 디자인상 페이저가 없어 큰 size 로 전체를 한 번에 받는다.
  params.set('size', String(query.size ?? 100))

  const { data } = await apiClient.get<ApiLionPage>(endpoints.lions, { params })
  return data
}
