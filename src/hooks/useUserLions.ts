import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUserLions } from '@api'
import type { ApiLionPage, ApiLionResponse, ApiPartType } from '@api'
import { isBackendConnected } from '@config'
import type { Lion, UserLionQuery } from '@types'

// 파트 enum → 한글 라벨. (아기사자 필터는 4종이지만 운영진은 COMMON 도 가능해 5종 모두 매핑.)
const PART_LABEL: Record<ApiPartType, string> = {
  PLANNING: '기획',
  DESIGN: '디자인',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  COMMON: '공통',
}

// mock 전용 — API(ApiLionResponse)에 없는 학과/이미지를 함께 들고 있는다(백엔드 추가 대상).
interface MockLion extends ApiLionResponse {
  department: string
  imageUrl: string | null
}

const MOCK_LIONS: MockLion[] = [
  // 운영진 (activityType: OPERATOR)
  {
    userId: 21017001,
    name: '김운영',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    part: 'PLANNING',
    activityType: 'OPERATOR',
    department: '컴퓨터학부',
    imageUrl: null,
  },
  {
    userId: 21017002,
    name: '이운영',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    part: 'FRONTEND',
    activityType: 'OPERATOR',
    department: '미디어커뮤니케이션학과',
    imageUrl: null,
  },
  {
    userId: 21017003,
    name: '박운영',
    cohort: { cohortId: 13, number: 13, name: '13기' },
    part: 'DESIGN',
    activityType: 'OPERATOR',
    department: '커뮤니케이션디자인과',
    imageUrl: null,
  },
  // 아기사자 (activityType: BABY_LION) — 파트별 최소 2명
  {
    userId: 22017010,
    name: '김기획',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    part: 'PLANNING',
    activityType: 'BABY_LION',
    department: '경영학과',
    imageUrl: null,
  },
  {
    userId: 22017011,
    name: '이기획',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    part: 'PLANNING',
    activityType: 'BABY_LION',
    department: '행정학과',
    imageUrl: null,
  },
  {
    userId: 22017020,
    name: '김디자인',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    part: 'DESIGN',
    activityType: 'BABY_LION',
    department: '커뮤니케이션디자인과',
    imageUrl: null,
  },
  {
    userId: 22017021,
    name: '이디자인',
    cohort: { cohortId: 13, number: 13, name: '13기' },
    part: 'DESIGN',
    activityType: 'BABY_LION',
    department: '패션디자인학과',
    imageUrl: null,
  },
  {
    userId: 22017030,
    name: '김프론트',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    part: 'FRONTEND',
    activityType: 'BABY_LION',
    department: '정보통신학과',
    imageUrl: null,
  },
  {
    userId: 22017031,
    name: '이프론트',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    part: 'FRONTEND',
    activityType: 'BABY_LION',
    department: '컴퓨터학부',
    imageUrl: null,
  },
  {
    userId: 22017040,
    name: '김백엔드',
    cohort: { cohortId: 14, number: 14, name: '14기' },
    part: 'BACKEND',
    activityType: 'BABY_LION',
    department: '컴퓨터학부',
    imageUrl: null,
  },
  {
    userId: 22017041,
    name: '이백엔드',
    cohort: { cohortId: 13, number: 13, name: '13기' },
    part: 'BACKEND',
    activityType: 'BABY_LION',
    department: '전자공학과',
    imageUrl: null,
  },
]

function toLion(response: ApiLionResponse): Lion {
  // department/imageUrl 은 실제 API 엔 없어 mock(MockLion)에서만 값이 온다.
  const extra = response as Partial<MockLion>
  return {
    id: String(response.userId),
    name: response.name,
    cohort: response.cohort.name,
    cohortId: response.cohort.cohortId,
    part: PART_LABEL[response.part],
    // 스펙상 activityType 은 enum 이 아니라 plain string 이라 앱 유니온으로 좁힌다.
    activityType: response.activityType as Lion['activityType'],
    department: extra.department ?? '',
    imageUrl: extra.imageUrl ?? null,
  }
}

function createMockLionPage(query: UserLionQuery): ApiLionPage {
  const size = query.size ?? 100
  const activityType = query.role === 'ADMIN' ? 'OPERATOR' : 'BABY_LION'
  const filtered = MOCK_LIONS.filter((lion) => {
    if (lion.activityType !== activityType) return false
    if (query.cohortId !== undefined && lion.cohort.cohortId !== query.cohortId) return false
    if (query.part && lion.part !== query.part) return false
    return true
  })

  return {
    items: filtered.slice(0, size),
    page: {
      page: 0,
      size,
      totalElements: filtered.length,
      totalPages: 1,
      hasNext: false,
    },
  }
}

export function useUserLions(query: UserLionQuery): { data: Lion[]; isLoading: boolean } {
  const request = useQuery({
    queryKey: ['user-lions', query],
    queryFn: () => fetchUserLions(query),
    enabled: isBackendConnected,
  })
  const response = request.data ?? createMockLionPage(query)

  return {
    data: response.items.map(toLion),
    isLoading: isBackendConnected && request.isLoading,
  }
}

const USER_LION_PART_DEFAULT = 'PLANNING' as const

export function useUserLionListPage() {
  const [cohort, setCohort] = useState('')
  const [part, setPart] = useState<NonNullable<UserLionQuery['part']>>(USER_LION_PART_DEFAULT)
  const cohortId = cohort ? Number.parseInt(cohort, 10) : undefined

  const operators = useUserLions({ role: 'ADMIN', cohortId })
  const babyLions = useUserLions({ role: 'MEMBER', cohortId, part })

  return { operators, babyLions, cohort, part, setCohort, setPart }
}
