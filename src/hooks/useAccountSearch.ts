import { useQuery } from '@tanstack/react-query'
import { fetchAccounts } from '@api'
import { isBackendConnected } from '@config'
import type { ProjectParticipant } from '@types'
import { PART_LABEL } from './useMembers'

// 참여자 선택용 회원 검색 결과 개수. 드롭다운에 한눈에 들어오는 만큼만 받는다.
const SEARCH_SIZE = 8

// 회원 → 프로젝트 참여자 후보.
// role 은 API 상 자유 텍스트라 그 사람의 파트를 기본값으로 채운다 — 사용자 화면이
// '이름(역할)' 로 표시하므로 파트가 들어가는 편이 자연스럽다. 담당자가 '팀장' 등으로 고칠 수 있다.
function toParticipant(response: {
  userId: number
  name: string
  cohort: { cohortId: number }
  part: keyof typeof PART_LABEL
}): ProjectParticipant {
  return {
    userId: response.userId,
    name: response.name,
    cohortId: response.cohort.cohortId,
    part: PART_LABEL[response.part],
    role: PART_LABEL[response.part],
  }
}

// 이름/학번 키워드로 회원을 찾는다. 검색어가 없으면 조회하지 않는다.
export function useAccountSearch(keyword: string): {
  data: ProjectParticipant[]
  isLoading: boolean
} {
  const term = keyword.trim()
  const request = useQuery({
    queryKey: ['admin-account-search', term],
    queryFn: () => fetchAccounts({ keyword: term, size: SEARCH_SIZE }),
    enabled: isBackendConnected && term.length > 0,
  })

  return {
    data: (request.data?.items ?? []).map(toParticipant),
    isLoading: isBackendConnected && term.length > 0 && request.isLoading,
  }
}
