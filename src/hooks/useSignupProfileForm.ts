import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SignupProfile } from '@types'

const EMPTY_PROFILE: SignupProfile = {
  name: '',
  department: '',
  studentId: '',
  cohort: '',
  part: '',
}

// 가입 추가정보 폼 상태·제출. 백엔드 연동 전이라 저장 없이 가입 대기 화면으로 넘긴다.
export function useSignupProfileForm() {
  const navigate = useNavigate()
  const [values, setValues] = useState<SignupProfile>(EMPTY_PROFILE)

  function setField(field: keyof SignupProfile, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/signup/pending')
  }

  return { values, setField, handleSubmit }
}
