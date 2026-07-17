import { useState } from 'react'
import type { FormEvent } from 'react'
import type { NoticeFormValues } from '@types'

const EMPTY: NoticeFormValues = { title: '', tag: '', content: '' }

// 공지 작성 폼 상태. 백엔드 연동 전: 제출은 no-op. 연동 시 handleSubmit 에서 apiClient 호출로 교체.
export function useNoticeForm(initialValues?: Partial<NoticeFormValues>) {
  const [values, setValues] = useState<NoticeFormValues>({ ...EMPTY, ...initialValues })
  const [pinned, setPinned] = useState(false)
  const [fileName, setFileName] = useState('')

  function setField(field: keyof NoticeFormValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // 저장 처리(백엔드 연동 시 구현).
  }

  return { values, setField, handleSubmit, pinned, setPinned, fileName, setFileName }
}
