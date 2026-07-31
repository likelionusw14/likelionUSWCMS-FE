import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createNotice, fetchUserNotice, fetchUserNotices, updateNotice } from '@api'
import type {
  ApiCreateNoticeRequest,
  ApiNoticeResponse,
  ApiNoticeTag,
  ApiUpdateNoticeRequest,
} from '@api'
import { isBackendConnected } from '@config'
import type { Notice, QueryResult } from '@types'

// NoticeTag enum → 한국어 표시 라벨. NOTICE_TAG_OPTIONS 의 label 과 일치시킨다.
const TAG_LABEL: Record<ApiNoticeTag, string> = {
  SCHEDULE: '일정',
  PROJECT: '프로젝트',
  PROMOTION_EVENT: '홍보·이벤트',
  OTHER: '기타',
}

const MOCK_TAGS: ApiNoticeTag[] = ['SCHEDULE', 'PROJECT', 'PROMOTION_EVENT', 'OTHER']

// 백엔드 미연동 데모용 목데이터. 조회 경로(/notices)는 user 와 공용이라 응답 모양도 동일하게 유지한다.
// 건수는 페이지네이션(페이지당 20건) 접힘 동작을 확인할 수 있게 20페이지 분량으로 둔다 —
// Figma 목록 시안도 '1/19 page' 에 `1 2 3 ... 17 18 19` 형태라 같은 규모다. 연동 시 서버 응답으로 대체된다.
const MOCK_NOTICES: ApiNoticeResponse[] = Array.from({ length: 393 }, (_, index) => {
  const noticeId = index + 1
  const day = String((index % 28) + 1).padStart(2, '0')
  const tag = MOCK_TAGS[index % MOCK_TAGS.length]

  return {
    noticeId,
    title: `${noticeId}차 정기 공지 - 이번 주 활동 안내 및 준비물 공지`,
    content:
      '안녕하세요, 멋쟁이사자처럼 수원대입니다.\n이번 주 활동 안내드립니다.\n자세한 내용은 첨부 링크를 확인해주세요.',
    tag,
    isFixed: index % 4 === 0,
    externalUrl: null,
    image:
      index % 3 === 0
        ? {
            file: {
              fileAssetId: noticeId,
              purpose: 'NOTICE_IMAGE',
              originalFileName: '활동안내.pdf',
              mimeType: 'application/pdf',
              sizeBytes: 1024,
              createdAt: `2026-05-${day}T14:30:00Z`,
            },
            downloadUrl: 'https://example.com/notice.pdf',
            expiresAt: `2026-05-${day}T15:30:00Z`,
          }
        : null,
    createdBy: 1,
    publishedAt: `2026-05-${day}T14:30:00Z`,
    version: 0,
    createdAt: `2026-05-${day}T14:30:00Z`,
    updatedAt: `2026-05-${day}T14:30:00Z`,
  }
})

// API 응답 → 관리자 화면 모델. tag 는 라벨(한국어), tagValue 는 enum 원본을 함께 보존한다.
function toNotice(response: ApiNoticeResponse): Notice {
  return {
    id: String(response.noticeId),
    title: response.title,
    tag: TAG_LABEL[response.tag],
    tagValue: response.tag,
    content: response.content,
    // publishedAt('YYYY-MM-DDT...') → 'YYYY.MM.DD' 표시 포맷.
    createdAt: response.publishedAt.slice(0, 10).replace(/-/g, '.'),
    mustRead: response.isFixed,
    fileName: response.image?.file.originalFileName ?? '',
    version: response.version,
  }
}

// 관리자 공지 목록 조회. 조회 경로 /notices 는 user 와 공용. 백엔드 미연동이면 mock 반환.
export function useNotices(): QueryResult<Notice[]> {
  const request = useQuery({
    queryKey: ['admin-notices'],
    queryFn: () => fetchUserNotices({ size: 100 }),
    enabled: isBackendConnected,
  })
  const items = request.data?.items ?? MOCK_NOTICES

  return {
    data: items.map(toNotice),
    isLoading: isBackendConnected && request.isLoading,
  }
}

// 관리자 공지 단건 조회. 백엔드 미연동이면 mock fallback.
export function useNotice(id: string | undefined): QueryResult<Notice | undefined> {
  const request = useQuery({
    queryKey: ['admin-notice', id],
    queryFn: () => fetchUserNotice(id ?? ''),
    enabled: isBackendConnected && id !== undefined,
    retry: false,
  })
  const mockNotice = MOCK_NOTICES.find((notice) => String(notice.noticeId) === id)
  const response = isBackendConnected ? request.data : mockNotice

  return {
    data: response ? toNotice(response) : undefined,
    isLoading: isBackendConnected && request.isLoading,
  }
}

// 공지 등록 mutation. 미연동이면 no-op 성공 처리(데모).
export function useCreateNotice() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: ApiCreateNoticeRequest) => {
      if (!isBackendConnected) return
      await createNotice(body)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-notices'] }),
  })
}

// 공지 수정 mutation. version 을 포함한 UpdateNoticeRequest 를 전달한다. 미연동이면 no-op.
export function useUpdateNotice() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: ApiUpdateNoticeRequest }) => {
      if (!isBackendConnected) return
      await updateNotice(id, body)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-notices'] })
      queryClient.invalidateQueries({ queryKey: ['admin-notice', variables.id] })
    },
  })
}
