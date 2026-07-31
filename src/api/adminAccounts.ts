import { apiClient, endpoints } from '@api'
import type {
  ApiAccountPage,
  ApiAccountResponse,
  ApiAccountStatus,
  ApiPartType,
  ApiSystemRole,
  ApiUpdateAccountRequest,
  ApiUpdateAccountStatusRequest,
  ApiUpdateRoleRequest,
} from '@api'

export interface AdminAccountQuery {
  page?: number
  size?: number
  status?: ApiAccountStatus
  role?: ApiSystemRole
  cohortId?: number
  part?: ApiPartType
  keyword?: string
}

export async function fetchAccounts(query: AdminAccountQuery): Promise<ApiAccountPage> {
  const params = new URLSearchParams()
  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.size !== undefined) params.set('size', String(query.size))
  if (query.status !== undefined) params.set('status', query.status)
  if (query.role !== undefined) params.set('role', query.role)
  if (query.cohortId !== undefined) params.set('cohortId', String(query.cohortId))
  if (query.part !== undefined) params.set('part', query.part)
  if (query.keyword !== undefined) params.set('keyword', query.keyword)

  const { data } = await apiClient.get<ApiAccountPage>(endpoints.adminAccounts, { params })
  return data
}

export async function fetchAccount(userId: string): Promise<ApiAccountResponse> {
  const { data } = await apiClient.get<ApiAccountResponse>(endpoints.adminAccount(userId))
  return data
}

export async function updateAccount(
  userId: string,
  body: ApiUpdateAccountRequest,
): Promise<ApiAccountResponse> {
  const { data } = await apiClient.patch<ApiAccountResponse>(endpoints.adminAccount(userId), body)
  return data
}

export async function updateAccountStatus(
  userId: string,
  body: ApiUpdateAccountStatusRequest,
): Promise<ApiAccountResponse> {
  const { data } = await apiClient.patch<ApiAccountResponse>(
    endpoints.adminAccountStatus(userId),
    body,
  )
  return data
}

export async function updateAccountRole(
  userId: string,
  body: ApiUpdateRoleRequest,
): Promise<ApiAccountResponse> {
  const { data } = await apiClient.patch<ApiAccountResponse>(
    endpoints.adminAccountRole(userId),
    body,
  )
  return data
}

export async function deleteAccount(userId: string): Promise<void> {
  await apiClient.delete(endpoints.adminAccount(userId))
}
