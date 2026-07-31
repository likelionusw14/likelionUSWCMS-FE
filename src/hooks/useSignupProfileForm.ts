import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createAccount, normalizeError } from '@api'
import type { ApiPartType } from '@api'
import { isBackendConnected } from '@config'
import { SIGNUP_COHORT_UNAVAILABLE, SIGNUP_ERROR_FALLBACK, SIGNUP_ERROR_MESSAGE } from '@constants'
import type { SignupProfile } from '@types'
import { useCohorts } from './useCohorts'

const EMPTY_PROFILE: SignupProfile = {
  name: '',
  department: '',
  studentId: '',
  cohortId: '',
  part: '',
}

// 가입 추가정보 폼 상태·제출.
// 제출은 POST /accounts — 카카오 인증 후 심긴 onboarding_session 쿠키에 이 입력값을 붙여
// PENDING 계정을 만든다. 성공하면 가입 대기 안내로 보낸다(뒤로가기로 폼에 돌아오지 않도록 replace).
export function useSignupProfileForm() {
  const navigate = useNavigate()
  const [values, setValues] = useState<SignupProfile>(EMPTY_PROFILE)
  const [error, setError] = useState<string | null>(null)
  const cohorts = useCohorts()

  const canSubmit = Object.values(values).every((value) => value.trim().length > 0)

  const submission = useMutation({
    mutationFn: async (profile: SignupProfile) => {
      if (!isBackendConnected) return
      // Idempotency-Key 는 제출 1건당 새로 만든다. 같은 키는 24시간 동안 첫 응답을 그대로
      // 재생하므로, 422 를 고쳐 다시 낼 때 옛 결과가 돌아오면 안 된다.
      // (중복 가입은 백엔드가 onboarding 세션 기준 409 로 막는다.)
      await createAccount(
        {
          name: profile.name.trim(),
          department: profile.department.trim(),
          studentId: profile.studentId.trim(),
          cohortId: Number(profile.cohortId),
          // 선택지(SIGNUP_PART_OPTIONS)의 value 가 곧 PartType enum 이다.
          part: profile.part as ApiPartType,
        },
        crypto.randomUUID(),
      )
    },
    onSuccess: () => navigate('/signup/pending', { replace: true }),
    onError: (cause) => {
      const { status } = normalizeError(cause)
      setError((status !== null && SIGNUP_ERROR_MESSAGE[status]) || SIGNUP_ERROR_FALLBACK)
    },
  })

  function setField(field: keyof SignupProfile, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
    // 값을 고치는 순간 이전 실패 안내는 지운다.
    setError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit || submission.isPending) return
    setError(null)
    submission.mutate(values)
  }

  // 기수를 못 받아오면 선택지가 비어 제출 조건을 영영 못 채운다 —
  // 제출 실패 안내가 없을 때 그 사정을 대신 보여준다.
  const cohortsUnavailable = !cohorts.isLoading && cohorts.data.length === 0

  return {
    values,
    setField,
    handleSubmit,
    cohortOptions: cohorts.data,
    canSubmit,
    isSubmitting: submission.isPending,
    error: error ?? (cohortsUnavailable ? SIGNUP_COHORT_UNAVAILABLE : null),
  }
}
