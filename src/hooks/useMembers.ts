import type { Member, PendingMember, QueryResult } from '@types'

// 백엔드 연동 전 목데이터. 연동 시 이 훅 안에서 apiClient 호출로 교체한다
// (컴포넌트는 { data, isLoading } 모양에만 의존한다).
const ROLES = ['아기사자', '운영진']
const COHORTS = ['14기', '15기', '16기', '17기']
const PARTS = ['기획', '디자인', '프론트엔드', '백엔드']
const NAMES = ['김멋사', '이사자', '박수원', '최운영', '정기획', '한디자', '오프론', '서백엔']

const MOCK_MEMBERS: Member[] = Array.from({ length: 27 }, (_, index) => ({
  id: String(index + 1),
  name: NAMES[index % NAMES.length],
  role: ROLES[index % ROLES.length],
  cohort: COHORTS[index % COHORTS.length],
  part: PARTS[index % PARTS.length],
  status: index % 5 === 0 ? 'PENDING' : 'ACTIVE',
}))

const MOCK_PENDING: PendingMember[] = Array.from({ length: 3 }, (_, index) => ({
  id: `p${index + 1}`,
  name: NAMES[index % NAMES.length],
  cohort: COHORTS[index % COHORTS.length],
  part: PARTS[index % PARTS.length],
}))

// 회원 목록 조회.
export function useMembers(): QueryResult<Member[]> {
  return { data: MOCK_MEMBERS, isLoading: false }
}

// 승인대기 회원 목록 조회.
export function usePendingMembers(): QueryResult<PendingMember[]> {
  return { data: MOCK_PENDING, isLoading: false }
}
