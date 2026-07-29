import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { roleHome } from '@constants'
import { restoreSession } from './useAuthSession'

// 카카오 인증 후 백엔드가 쿠키를 심고 되돌려보내는 착지 지점의 처리 로직.
// 화면은 결과에 따라 셋 중 하나로 흘러간다.
//   기존 계정   → 역할 홈 (승인 대기 중이면 대기 안내)
//   미가입자    → 추가정보 입력
//   실패        → 화면에 사유 표시 후 로그인 재시도
export function useAuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  // StrictMode 는 개발 중 effect 를 두 번 실행한다 — 세션 교환은 한 번만 보낸다.
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    // 카카오/백엔드가 실패를 쿼리로 넘겨준 경우 (예: 사용자가 동의 취소).
    const failure = searchParams.get('error')
    if (failure) {
      setError('카카오 로그인이 취소되었거나 실패했습니다.')
      return
    }

    void restoreSession().then((outcome) => {
      if (outcome.kind === 'onboarding') {
        navigate('/signup/profile', { replace: true })
        return
      }
      if (outcome.kind === 'failed') {
        setError(outcome.message)
        return
      }
      // 승인 전 계정은 활동 권한이 없어 역할 홈 대신 대기 안내로 보낸다.
      const target =
        outcome.user.status === 'PENDING' ? '/signup/pending' : roleHome(outcome.user.role)
      navigate(target, { replace: true })
    })
  }, [navigate, searchParams])

  return { error }
}
