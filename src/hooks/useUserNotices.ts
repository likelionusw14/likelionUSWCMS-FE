import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUserNotice, fetchUserNotices } from '@api'
import type { ApiNoticeResponse, ApiNoticeTag } from '@api'
import { isBackendConnected } from '@config'
import type { UserNotice, UserNoticePage, UserNoticeQuery } from '@types'

const TAG_LABEL: Record<ApiNoticeTag, string> = {
  SCHEDULE: '일정',
  PROJECT: '프로젝트',
  PROMOTION_EVENT: '홍보/이벤트',
  OTHER: '기타',
}

const MOCK_TAGS: ApiNoticeTag[] = ['SCHEDULE', 'PROJECT', 'PROMOTION_EVENT', 'OTHER']
const MOCK_NOTICES: ApiNoticeResponse[] = Array.from({ length: 45 }, (_, index) => {
  const noticeId = index + 1
  const day = String((index % 28) + 1).padStart(2, '0')
  const tag = MOCK_TAGS[index % MOCK_TAGS.length]

  return {
    noticeId,
    title: `${TAG_LABEL[tag]} 관련 안내사항 ${noticeId}`,
    content:
      '공지 내용을 안내드립니다.\n\n자세한 내용을 확인하고 활동에 참고해 주세요.\n문의사항은 운영진에게 전달해 주세요.',
    tag,
    isFixed: index < 3,
    externalUrl: null,
    image: null,
    createdBy: 1,
    publishedAt: `2026-05-${day}T14:30:00Z`,
    version: 0,
    createdAt: `2026-05-${day}T14:30:00Z`,
    updatedAt: `2026-05-${day}T14:30:00Z`,
  }
})

function toUserNotice(response: ApiNoticeResponse): UserNotice {
  return {
    id: String(response.noticeId),
    title: response.title,
    content: response.content,
    tag: response.tag,
    tagLabel: TAG_LABEL[response.tag],
    isFixed: response.isFixed,
    externalUrl: response.externalUrl ?? null,
    publishedAt: response.publishedAt,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  }
}

function createMockNoticePage(query: UserNoticeQuery) {
  const page = query.page ?? 0
  const size = query.size ?? 20
  const filtered = MOCK_NOTICES.filter((notice) => !query.tag || notice.tag === query.tag).sort(
    (left, right) =>
      Number(right.isFixed) - Number(left.isFixed) ||
      Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
  )
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

export function useUserNotices(query: UserNoticeQuery = {}): {
  data: UserNoticePage
  isLoading: boolean
} {
  const request = useQuery({
    queryKey: ['user-notices', query],
    queryFn: () => fetchUserNotices(query),
    enabled: isBackendConnected,
  })
  const response = request.data ?? createMockNoticePage(query)

  return {
    data: {
      content: response.items.map(toUserNotice),
      ...response.page,
    },
    isLoading: isBackendConnected && request.isLoading,
  }
}

export function useUserNoticeDetail(noticeId: string | undefined): {
  data: UserNotice | undefined
  isLoading: boolean
} {
  const request = useQuery({
    queryKey: ['user-notice', noticeId],
    queryFn: () => fetchUserNotice(noticeId ?? ''),
    enabled: isBackendConnected && noticeId !== undefined,
    retry: false,
  })
  const mockNotice = MOCK_NOTICES.find((notice) => String(notice.noticeId) === noticeId)
  const response = isBackendConnected ? request.data : mockNotice

  return {
    data: response ? toUserNotice(response) : undefined,
    isLoading: isBackendConnected && request.isLoading,
  }
}

const USER_NOTICE_PAGE_SIZE = 20

export function useUserNoticeListPage() {
  const [tag, setTag] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useUserNotices({
    page: page - 1,
    size: USER_NOTICE_PAGE_SIZE,
    tag: tag ? (tag as ApiNoticeTag) : undefined,
  })

  function updateTag(value: string) {
    setTag(value)
    setPage(1)
  }

  return {
    data,
    isLoading,
    tag,
    page,
    setTag: updateTag,
    setPage,
    resetPage: () => setPage(1),
  }
}
