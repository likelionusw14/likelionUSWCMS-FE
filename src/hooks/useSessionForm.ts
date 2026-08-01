import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createResource, updateResource } from '@api'
import type {
  ApiCreateLearningResourceRequest,
  ApiPartType,
  ApiUpdateLearningResourceRequest,
} from '@api'
import { isBackendConnected } from '@config'
import { useEntityForm } from '@hooks'
import type { Session, SessionFormValues } from '@types'

const EMPTY_VALUES: SessionFormValues = {
  week: '',
  part: '',
}

// 한국어 파트 라벨 → API enum. useSessions 의 PART_LABEL 역매핑.
const PART_ENUM: Record<string, ApiPartType> = {
  기획: 'PLANNING',
  디자인: 'DESIGN',
  프론트엔드: 'FRONTEND',
  백엔드: 'BACKEND',
  공통: 'COMMON',
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

// '1주차' → 1. 숫자를 못 뽑으면 0(예: '기타').
function parseWeek(week: string): number {
  const parsed = Number.parseInt(week, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

// 세션자료 등록 mutation.
export function useCreateSession() {
  const queryClient = useQueryClient()
  return useMutation({
    // Idempotency-Key 는 제출 1건당 새로 만든다 (같은 키는 24시간 동안 첫 응답을 재생한다).
    mutationFn: (body: ApiCreateLearningResourceRequest) =>
      createResource(body, crypto.randomUUID()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-sessions'] }),
  })
}

// 세션자료 수정 mutation. version 은 낙관적 동시성 토큰으로 필수.
export function useUpdateSession(resourceId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: ApiUpdateLearningResourceRequest) => updateResource(resourceId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sessions'] })
      queryClient.invalidateQueries({ queryKey: ['admin-session', resourceId] })
    },
  })
}

// 세션자료 작성·수정 폼 상태 + 저장 배선.
export function useSessionForm(session?: Session) {
  const navigate = useNavigate()
  const form = useEntityForm<Session, SessionFormValues>({
    entity: session,
    toValues: toSessionValues,
    toFileName: toSessionFileName,
    redirectTo: '/admin/sessions',
  })
  const createSession = useCreateSession()
  const updateSession = useUpdateSession(session?.id ?? '')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // 백엔드 미연동 데모: 실제 저장 없이 목록으로 돌아간다.
    if (!isBackendConnected) {
      navigate('/admin/sessions')
      return
    }

    if (session) {
      // 수정: fileAssetId 미전달 = 기존 파일 유지. targetPart/week/title 만 갱신.
      // title 은 스펙상 required 이나 폼엔 입력이 없어 '{주차} {파트} 자료'로 생성한다.
      await updateSession.mutateAsync({
        version: session.version,
        title: `${form.values.week} ${form.values.part} 자료`.trim(),
        week: parseWeek(form.values.week),
        targetPart: PART_ENUM[form.values.part],
      })
      navigate('/admin/sessions')
      return
    }

    // 신규 등록: CreateLearningResourceRequest 는 fileAssetId 가 필수다.
    // TODO(파일 업로드): FileUploadField 가 파일명 문자열만 다뤄 실제 File 객체가 없다.
    //   폼이 File 객체를 넘기도록 확장한 뒤 uploadFile('LEARNING_RESOURCE', file) 로
    //   fileAssetId 를 획득해 아래 create 요청에 전달해야 한다.
    //   현재는 fileAssetId 를 확보할 수 없어 방어적으로 등록을 건너뛰고 목록으로 이동한다.
    navigate('/admin/sessions')
  }

  return { ...form, handleSubmit, createSession, updateSession }
}
