import { useEntityForm } from '@hooks'
import type { Session, SessionFormValues } from '@types'

const EMPTY_VALUES: SessionFormValues = {
  week: '',
  part: '',
}

// 엔티티 → 폼 값 매핑. useEntityForm 의 useEffect 재실행을 막기 위해 모듈 상수 함수로 둔다.
function toSessionValues(session: Session | undefined): SessionFormValues {
  if (!session) return EMPTY_VALUES
  return { week: session.week, part: session.part }
}

// 엔티티 → 첨부 파일명. edit 진입 시 기존 파일명을 하이드레이트한다.
function toSessionFileName(session: Session | undefined): string {
  return session?.fileName ?? ''
}

// 세션자료 작성·수정 폼 상태.
export function useSessionForm(session?: Session) {
  return useEntityForm<Session, SessionFormValues>({
    entity: session,
    toValues: toSessionValues,
    toFileName: toSessionFileName,
    redirectTo: '/admin/sessions',
  })
}
