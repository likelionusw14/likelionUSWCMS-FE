import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  AUTH_ERROR_FALLBACK,
  AUTH_ERROR_MESSAGE,
  AUTH_INVALID_ENTRY,
  AUTH_SESSION_EXPIRED,
  SIGNUP_STATUS_ROUTE,
  roleHome,
} from '@constants'
import type { AuthErrorCode } from '@types'
import { restoreSession } from './useAuthSession'

// 카카오 인증 후 백엔드가 쿠키를 심고 되돌려보내는 착지 지점의 처리 로직.
//
// 신규·기존 구분은 백엔드가 `?status=` 로 명시한다. 쿠키가 HttpOnly 라 프론트가
// 직접 볼 수 없고, /auth/tokens 의 401 만으로는 "미가입자"와 "카카오를 거치지 않은
// 직접 진입"이 구별되지 않기 때문이다 (후자가 가입 폼으로 새면 안 된다).
//
//   ?status=onboarding → 추가정보 입력 (토큰 호출 불필요)
//   ?status=member     → 토큰·계정 수령 후 역할 홈 (승인 대기면 대기 안내)
//   ?error=<code>      → 사유 표시
//   파라미터 없음       → 정상 진입이 아니므로 안내만 하고 멈춘다
export function useAuthCallback() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  // StrictMode 는 개발 중 effect 를 두 번 실행한다 — 세션 교환은 한 번만 보낸다.
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const failure = searchParams.get('error')
    if (failure) {
      setError(AUTH_ERROR_MESSAGE[failure as AuthErrorCode] ?? AUTH_ERROR_FALLBACK)
      return
    }

    // 백엔드가 아직 status 를 붙이지 않는 전환 기간 동안, 경로 자체가 신호인
    // /onboarding 을 status=onboarding 으로 취급한다. 백엔드가 파라미터를 붙이기
    // 시작하면 이 경로 별칭과 함께 지운다.
    const status = searchParams.get('status') ?? (pathname === '/onboarding' ? 'onboarding' : null)

    if (status === 'onboarding') {
      navigate('/signup/profile', { replace: true })
      return
    }

    if (status !== 'member') {
      setError(AUTH_INVALID_ENTRY)
      return
    }

    void restoreSession().then((result) => {
      if (result.kind === 'expired') {
        setError(AUTH_SESSION_EXPIRED)
        return
      }
      if (result.kind === 'failed') {
        setError(result.message)
        return
      }
      // 승인 전(PENDING)·거절(REJECTED) 계정은 활동 권한이 없다. 역할 홈으로 보내면
      // 게스트 홈에 아무 설명 없이 떨어지므로 각각의 안내 화면으로 보낸다.
      navigate(SIGNUP_STATUS_ROUTE[result.user.status ?? 'ACTIVE'] ?? roleHome(result.user.role), {
        replace: true,
      })
    })
  }, [navigate, pathname, searchParams])

  return { error }
}
