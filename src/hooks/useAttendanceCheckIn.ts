import { useCallback, useEffect, useRef, useState } from 'react'
import { isBackendConnected } from '@config'
import type { AttendanceCheckInResult } from '@types'

// 유효시간 5분.
const VALID_SECONDS = 5 * 60
// mock 정답 코드(로컬 검증용). 연동 시 실 API 로 교체.
const MOCK_VALID_CODE = '123456'

// 출석 코드 인증 — 6자리 입력 + 유효시간 카운트다운 + 제출(성공/실패).
// [보류] 실 API(POST /schedules/{scheduleId}/attendance-check-ins)는 scheduleId 필요 →
// 소스가 명세에 없어 미연동 동안 로컬 검증만. 연동 시 checkInAttendance 로 교체.
export function useAttendanceCheckIn(): {
  code: string
  setCode: (v: string) => void
  remainingSeconds: number
  result: AttendanceCheckInResult
  submit: () => void
  closeResult: () => void
} {
  const [code, setCodeRaw] = useState('')
  const [remainingSeconds, setRemainingSeconds] = useState(VALID_SECONDS)
  const [result, setResult] = useState<AttendanceCheckInResult>('idle')
  const timerRef = useRef<number | undefined>(undefined)

  // 6자리 숫자만 허용.
  const setCode = useCallback((value: string) => {
    setCodeRaw(value.replace(/\D/g, '').slice(0, 6))
  }, [])

  // 페이지 진입 시 유효시간 카운트다운(0 에서 정지).
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setRemainingSeconds((s) => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(timerRef.current)
  }, [])

  const submit = useCallback(() => {
    // 만료 또는 6자리 미만 → 실패. mock 정답 일치 → 성공. (연동 시 이 분기를 실 API 로 교체.)
    if (!isBackendConnected) {
      const ok = remainingSeconds > 0 && code === MOCK_VALID_CODE
      setResult(ok ? 'success' : 'fail')
      return
    }
    setResult(remainingSeconds > 0 && code.length === 6 ? 'success' : 'fail')
  }, [code, remainingSeconds])

  const closeResult = useCallback(() => {
    setResult('idle')
    if (result === 'success') setCodeRaw('')
  }, [result])

  return { code, setCode, remainingSeconds, result, submit, closeResult }
}
