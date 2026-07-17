import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NoticeFormValues } from '@types'

const EMPTY: NoticeFormValues = { title: '', tag: '', content: '' }

// 공지 작성 폼 상태. 백엔드 연동 전: 저장은 목록으로 돌아가기만 한다.
export function useNoticeForm(initialValues?: Partial<NoticeFormValues>) {
  const navigate = useNavigate()
  const [values, setValues] = useState<NoticeFormValues>({ ...EMPTY, ...initialValues })
  const [pinned, setPinned] = useState(false)
  const [fileName, setFileName] = useState('')

  function setField(field: keyof NoticeFormValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/admin/notices')
  }

  function handleDelete() {
    navigate('/admin/notices')
  }

  return { values, setField, handleSubmit, handleDelete, pinned, setPinned, fileName, setFileName }
}
