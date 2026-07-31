import { useQuery } from '@tanstack/react-query'
import { fetchCohorts } from '@api'
import type { ApiCohortSummary } from '@api'
import { isBackendConnected } from '@config'
import { COHORT } from '@constants'
import type { SelectOption } from '@types'

// 백엔드 미연동(데모) 시 선택지 — 현재 기수 하나. id 는 기수 번호로 둔다.
const MOCK_COHORTS: ApiCohortSummary[] = [{ cohortId: COHORT, number: COHORT, name: `${COHORT}기` }]

// 기수 선택지 — value 는 백엔드가 요구하는 cohortId, label 은 표시용 이름("14기").
// 연동 상태에서는 mock 으로 대체하지 않는다. 로딩 중에 임의의 id 를 보여주면
// 그대로 제출돼 엉뚱한 기수로 가입될 수 있어서다 (빈 선택지 → 제출 자체가 막힌다).
export function useCohorts(): { data: SelectOption[]; isLoading: boolean } {
  const request = useQuery({
    queryKey: ['cohorts'],
    queryFn: fetchCohorts,
    enabled: isBackendConnected,
  })
  const items = isBackendConnected ? (request.data?.items ?? []) : MOCK_COHORTS

  return {
    data: items.map((cohort) => ({ value: String(cohort.cohortId), label: cohort.name })),
    isLoading: isBackendConnected && request.isLoading,
  }
}
