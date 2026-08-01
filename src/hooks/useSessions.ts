import { useQuery } from '@tanstack/react-query'
import { fetchUserResource, fetchUserResourceDownloadUrl, fetchUserResources } from '@api'
import type { ApiLearningResourceResponse, ApiPartType, ApiResourcePage } from '@api'
import { isBackendConnected } from '@config'
import type { QueryResult, Session } from '@types'

// 세션자료 조회는 사용자 공용 경로(/resources)를 그대로 쓴다(관리자 전용 조회 엔드포인트 없음).
const PART_LABEL: Record<ApiPartType, string> = {
  PLANNING: '기획',
  DESIGN: '디자인',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  COMMON: '공통',
}

// 목록 client 페이지네이션을 위해 최대치(100)로 한 번에 가져온다.
const ADMIN_SESSION_PAGE_SIZE = 100

const MOCK_PARTS: ApiPartType[] = ['PLANNING', 'DESIGN', 'FRONTEND', 'BACKEND', 'COMMON']
const MOCK_RESOURCES: ApiLearningResourceResponse[] = Array.from({ length: 45 }, (_, index) => {
  const resourceId = index + 1
  const week = (index % 8) + 1
  const targetPart = MOCK_PARTS[index % MOCK_PARTS.length]
  const createdAt = `2026-03-${String((index % 28) + 1).padStart(2, '0')}T10:00:00Z`

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
      createdAt,
    },
    createdBy: 1,
    version: 0,
    createdAt,
    updatedAt: createdAt,
  }
})

// LearningResourceResponse → 관리자 Session 화면모델 변환.
// previewUrl 은 별도 발급인 다운로드 URL 이라 호출부가 넘긴다(목록에서는 필요 없어 빈 문자열).
// pageCount 는 응답에 없다 — 0 이면 'Page (1/0)' 이 되므로 표시하지 않는다는 뜻의 0 으로 둔다.
function toSession(response: ApiLearningResourceResponse, previewUrl = ''): Session {
  return {
    id: String(response.resourceId),
    fileName: response.file.originalFileName,
    week: `${response.week}주차`,
    part: PART_LABEL[response.targetPart],
    previewUrl,
    pageCount: 0,
    version: response.version,
  }
}

function createMockResourcePage(): ApiResourcePage {
  const items = [...MOCK_RESOURCES].sort(
    (left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt),
  )
  return {
    items,
    page: {
      page: 0,
      size: ADMIN_SESSION_PAGE_SIZE,
      totalElements: items.length,
      totalPages: 1,
      hasNext: false,
    },
  }
}

// 세션자료 목록 조회.
export function useSessions(): QueryResult<Session[]> {
  const request = useQuery({
    queryKey: ['admin-sessions'],
    queryFn: () => fetchUserResources({ page: 0, size: ADMIN_SESSION_PAGE_SIZE }),
    enabled: isBackendConnected,
  })
  const response = request.data ?? createMockResourcePage()
  return {
    // map 이 넘기는 index 가 previewUrl 자리로 들어가지 않도록 인자를 명시한다.
    data: response.items.map((resource) => toSession(resource)),
    isLoading: isBackendConnected && request.isLoading,
  }
}

// 세션자료 단건 조회.
// 미리보기 URL 은 본문 응답에 없고 별도 발급(GET /resources/{id}/download-url)이라
// 사용자 상세(useUserSessionDetail)와 같이 함께 받는다 — 이걸 안 받으면 뷰어가 늘 빈 판이다.
export function useSession(id: string | undefined): QueryResult<Session | undefined> {
  const enabled = isBackendConnected && Boolean(id)
  const request = useQuery({
    queryKey: ['admin-session', id],
    queryFn: () => fetchUserResource(id as string),
    enabled,
  })
  const downloadRequest = useQuery({
    queryKey: ['admin-session-download-url', id],
    queryFn: () => fetchUserResourceDownloadUrl(id as string),
    enabled,
    retry: false,
  })
  const response =
    request.data ?? MOCK_RESOURCES.find((resource) => String(resource.resourceId) === id)
  return {
    data: response ? toSession(response, downloadRequest.data?.downloadUrl ?? '') : undefined,
    isLoading: isBackendConnected && (request.isLoading || downloadRequest.isLoading),
  }
}
