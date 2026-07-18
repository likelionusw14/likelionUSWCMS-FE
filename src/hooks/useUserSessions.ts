import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUserResource, fetchUserResourceDownloadUrl, fetchUserResources } from '@api'
import type { ApiLearningResourceResponse, ApiPartType, ApiResourcePage } from '@api'
import { isBackendConnected } from '@config'
import type { UserSessionPage, UserSessionQuery, UserSessionResource } from '@types'

const PART_LABEL: Record<ApiPartType, string> = {
  PLANNING: '기획',
  DESIGN: '디자인',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  COMMON: '공통',
}

const MOCK_PARTS: ApiPartType[] = ['PLANNING', 'DESIGN', 'FRONTEND', 'BACKEND', 'COMMON']
const MOCK_RESOURCES: ApiLearningResourceResponse[] = Array.from({ length: 45 }, (_, index) => {
  const resourceId = index + 1
  const week = (index % 12) + 1
  const targetPart = MOCK_PARTS[index % MOCK_PARTS.length]

  return {
    resourceId,
    title: `${week}주차 ${PART_LABEL[targetPart]} 세션자료`,
    week,
    targetPart,
    file: {
      fileAssetId: 1_000 + resourceId,
      purpose: 'LEARNING_RESOURCE',
      originalFileName: `${week}주차-${PART_LABEL[targetPart]}-세션자료.pdf`,
      mimeType: 'application/pdf',
      sizeBytes: 1_048_576 + index * 1_024,
      createdAt: `2026-03-${String((index % 28) + 1).padStart(2, '0')}T10:00:00Z`,
    },
    createdBy: 1,
    version: 0,
    createdAt: `2026-03-${String((index % 28) + 1).padStart(2, '0')}T10:00:00Z`,
    updatedAt: `2026-03-${String((index % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  }
})

function toUserSessionResource(
  response: ApiLearningResourceResponse,
  previewUrl = '',
  pageCount: number | null = null,
): UserSessionResource {
  return {
    id: String(response.resourceId),
    title: response.title,
    fileName: response.file.originalFileName,
    week: response.week,
    targetPart: response.targetPart,
    partLabel: PART_LABEL[response.targetPart],
    mimeType: response.file.mimeType,
    sizeBytes: response.file.sizeBytes,
    previewUrl,
    pageCount,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  }
}

function createMockResourcePage(query: UserSessionQuery): ApiResourcePage {
  const page = query.page ?? 0
  const size = query.size ?? 20
  const filtered = MOCK_RESOURCES.filter((resource) => {
    if (query.week !== undefined && resource.week !== query.week) return false
    if (query.targetPart !== undefined && resource.targetPart !== query.targetPart) return false
    return true
  }).sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
  const totalPages = Math.ceil(filtered.length / size)

  return {
    items: filtered.slice(page * size, page * size + size),
    page: {
      page,
      size,
      totalElements: filtered.length,
      totalPages,
      hasNext: page + 1 < totalPages,
    },
  }
}

export function useUserSessions(query: UserSessionQuery = {}): {
  data: UserSessionPage
  isLoading: boolean
} {
  const request = useQuery({
    queryKey: ['user-sessions', query],
    queryFn: () => fetchUserResources(query),
    enabled: isBackendConnected,
  })
  const response = request.data ?? createMockResourcePage(query)

  return {
    data: {
      content: response.items.map((resource) =>
        toUserSessionResource(resource, '', isBackendConnected ? null : 36),
      ),
      ...response.page,
    },
    isLoading: isBackendConnected && request.isLoading,
  }
}

export function useUserSessionDetail(resourceId: string | undefined): {
  data: UserSessionResource | undefined
  isLoading: boolean
} {
  const resourceRequest = useQuery({
    queryKey: ['user-session', resourceId],
    queryFn: () => fetchUserResource(resourceId ?? ''),
    enabled: isBackendConnected && resourceId !== undefined,
    retry: false,
  })
  const downloadRequest = useQuery({
    queryKey: ['user-session-download-url', resourceId],
    queryFn: () => fetchUserResourceDownloadUrl(resourceId ?? ''),
    enabled: isBackendConnected && resourceId !== undefined,
    retry: false,
  })
  const mockResource = MOCK_RESOURCES.find((resource) => String(resource.resourceId) === resourceId)
  const response = isBackendConnected ? resourceRequest.data : mockResource

  return {
    data: response
      ? toUserSessionResource(
          response,
          downloadRequest.data?.downloadUrl ?? '',
          isBackendConnected ? null : 36,
        )
      : undefined,
    isLoading: isBackendConnected && (resourceRequest.isLoading || downloadRequest.isLoading),
  }
}

const USER_SESSION_PAGE_SIZE = 20

export function useUserSessionListPage() {
  const [week, setWeek] = useState('')
  const [part, setPart] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useUserSessions({
    page: page - 1,
    size: USER_SESSION_PAGE_SIZE,
    week: week ? Number.parseInt(week, 10) : undefined,
    targetPart: part ? (part as ApiPartType) : undefined,
  })

  function updateWeek(value: string) {
    setWeek(value)
    setPage(1)
  }

  function updatePart(value: string) {
    setPart(value)
    setPage(1)
  }

  return {
    data,
    isLoading,
    week,
    part,
    page,
    setWeek: updateWeek,
    setPart: updatePart,
    setPage,
    resetPage: () => setPage(1),
  }
}
