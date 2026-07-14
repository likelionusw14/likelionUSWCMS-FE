import { PART_OPTIONS, WEEK_OPTIONS } from '@constants'
import type { Session } from '@types'

// 백엔드 연동 전 목데이터. 연동 시 이 훅 안에서 apiClient 호출로 교체한다
// (컴포넌트는 { data, isLoading } 모양에만 의존한다).
const MOCK_FILE_NAME = '34567234567823456789234567892345678234567834567890'

const MOCK_SESSIONS: Session[] = Array.from({ length: 45 }, (_, index) => ({
  id: String(index + 1),
  fileName: MOCK_FILE_NAME,
  week: WEEK_OPTIONS[index % WEEK_OPTIONS.length].value,
  part: PART_OPTIONS[index % PART_OPTIONS.length].value,
  previewUrl: '',
  pageCount: 36,
}))

// 세션자료 목록 조회.
export function useSessions(): { data: Session[]; isLoading: boolean } {
  return { data: MOCK_SESSIONS, isLoading: false }
}

// 세션자료 단건 조회.
export function useSession(id: string | undefined): {
  data: Session | undefined
  isLoading: boolean
} {
  return { data: MOCK_SESSIONS.find((session) => session.id === id), isLoading: false }
}
