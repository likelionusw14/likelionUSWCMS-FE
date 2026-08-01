import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createAttendanceCode, fetchAttendanceCode } from '@api'
import type { ApiAttendanceCodeResponse } from '@api'
import { isBackendConnected } from '@config'

// 유효시간 5분(로컬 폴백용).
const VALID_SECONDS = 5 * 60

// 6자리 숫자 코드(로컬 폴백용). 자릿수는 인증 API 의 제약(^\d{6}$)과 맞춘다 —
// 폴백만 7자리면 데모 코드를 그대로 입력해도 6자리 입력창에서 잘려 절대 맞지 않는다.
function randomCode(): string {
  return String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0')
}

// 출석 코드 생성 — 코드 발급 + 유효시간 카운트다운.
// [추정] 실 API 는 scheduleId 필수(POST/GET /admin/schedules/{scheduleId}/attendance-code).
// scheduleId 를 옵셔널로 받아, 주어지고 연동 시에만 실 API. 그 외에는 기존 로컬 난수 유지.
export function useAttendanceCode(scheduleId?: string): {
  code: string | null
  remainingSeconds: number
  generate: () => void
} {
  const useApi = isBackendConnected && scheduleId !== undefined

  const [code, setCode] = useState<string | null>(null)
  const [remainingSeconds, setRemainingSeconds] = useState(VALID_SECONDS)
  const timerRef = useRef<number | undefined>(undefined)

  // 연동 모드: 현재 유효한 코드 조회.
  const codeQuery = useQuery({
    queryKey: ['admin-attendance-code', scheduleId],
    queryFn: () => fetchAttendanceCode(scheduleId as string),
    enabled: useApi,
  })

  // 조회/발급 응답을 로컬 상태로 반영(연동 모드). expiresAt 기준 남은 초(0 미만은 0).
  const applyResponse = useCallback((response: ApiAttendanceCodeResponse) => {
    const remaining = Math.floor((Date.parse(response.expiresAt) - Date.now()) / 1000)
    setCode(response.code)
    setRemainingSeconds(remaining > 0 ? remaining : 0)
  }, [])

  useEffect(() => {
    if (useApi && codeQuery.data) applyResponse(codeQuery.data)
  }, [useApi, codeQuery.data, applyResponse])

  // 코드가 있고 남은 시간이 있을 때만 1초마다 카운트다운. 만료 시 코드 무효.
  useEffect(() => {
    if (!code) return
    timerRef.current = window.setInterval(() => {
      setRemainingSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(timerRef.current)
          setCode(null)
          return useApi ? 0 : VALID_SECONDS
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(timerRef.current)
  }, [code, useApi])

  const generate = useCallback(() => {
    if (useApi) {
      // 실 API: 코드 생성/재발급.
      createAttendanceCode(scheduleId as string)
        .then(applyResponse)
        .catch(() => {
          setCode(null)
        })
      return
    }
    // 로컬 폴백: 난수 발급.
    setCode(randomCode())
    setRemainingSeconds(VALID_SECONDS)
  }, [useApi, scheduleId, applyResponse])

  return { code, remainingSeconds, generate }
}
