import type { Notice, QueryResult } from '@types'

// 백엔드 연동 전 목데이터. 연동 시 이 훅 안에서 apiClient 호출로 교체한다
// (컴포넌트는 { data, isLoading } 모양에만 의존한다).
const TAGS = ['일반', '중요', '행사']

const MOCK_NOTICES: Notice[] = Array.from({ length: 23 }, (_, index) => {
  const n = index + 1
  return {
    id: String(n),
    title: `${n}차 정기 공지 - 이번 주 활동 안내 및 준비물 공지`,
    tag: TAGS[index % TAGS.length],
    content:
      '안녕하세요, 멋쟁이사자처럼 수원대입니다.\n이번 주 활동 안내드립니다.\n자세한 내용은 첨부 링크를 확인해주세요.',
    createdAt: `2026.05.${String((index % 28) + 1).padStart(2, '0')}`,
    mustRead: index % 4 === 0,
    fileName: index % 3 === 0 ? '활동안내.pdf' : '',
  }
})

// 공지 목록 조회.
export function useNotices(): QueryResult<Notice[]> {
  return { data: MOCK_NOTICES, isLoading: false }
}

// 공지 단건 조회.
export function useNotice(id: string | undefined): QueryResult<Notice | undefined> {
  return { data: MOCK_NOTICES.find((notice) => notice.id === id), isLoading: false }
}
