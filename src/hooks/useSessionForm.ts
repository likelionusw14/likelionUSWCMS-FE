import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Session, SessionFormValues } from '@types'

const EMPTY_VALUES: SessionFormValues = {
  week: '',
  part: '',
}

function toFormValues(session: Session | undefined): SessionFormValues {
  if (!session) return EMPTY_VALUES
  return { week: session.week, part: session.part }
}

// 세션자료 작성·수정 폼 상태. 백엔드 연동 전이라 저장은 목록으로 돌아가기만 한다.
export function useSessionForm(session?: Session) {
  const navigate = useNavigate()
  const [values, setValues] = useState<SessionFormValues>(() => toFormValues(session))
  const [fileName, setFileName] = useState('')

  function setField(field: keyof SessionFormValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/admin/sessions')
  }
  return {
    values,
    setField,
    handleSubmit,
    fileName,
    setFileName,
  }
}
