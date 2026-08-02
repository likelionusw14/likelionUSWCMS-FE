import { useCallback, useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { checkInAttendance, normalizeError } from '@api'
import { isBackendConnected } from '@config'
import type { AttendanceCheckInResult } from '@types'
import { useSchedules } from './useSchedules'

// 유효시간 5분.
const VALID_SECONDS = 5 * 60
// mock 정답 코드(로컬 검증용).
const MOCK_VALID_CODE = '123456'

// 오늘 날짜를 일정 응답과 같은 'YYYY-MM-DD' 로.
function todayIso(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

// 출석 코드 인증 — 6자리 입력 + 유효시간 카운트다운 + 제출(성공/실패).
// 출석은 일정(scheduleId)에 종속인데 화면에는 코드 입력만 있다. 그래서 이번 달 일정에서
// 오늘 날짜의 일정을 찾아 그 scheduleId 로 인증한다(관리자 출결 목록과 같은 방식).
export function useAttendanceCheckIn(): {
  code: string
  setCode: (v: string) => void
  remainingSeconds: number
  result: AttendanceCheckInResult
  errorMessage: string | undefined
  submit: () => void
  closeResult: () => void
} {
  const [code, setCodeRaw] = useState('')
  const [remainingSeconds, setRemainingSeconds] = useState(VALID_SECONDS)
  const [result, setResult] = useState<AttendanceCheckInResult>('idle')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const timerRef = useRef<number | undefined>(undefined)
  const queryClient = useQueryClient()

  // useSchedules 의 month 는 0-11(JS Date 월 인덱스).
  const now = new Date()
  const { data: monthEvents } = useSchedules(now.getFullYear(), now.getMonth())
  const scheduleId = monthEvents.find((event) => event.date === todayIso())?.id

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
    // 미연동: mock 정답 코드와 대조한다.
    if (!isBackendConnected) {
      const ok = remainingSeconds > 0 && code === MOCK_VALID_CODE
      setErrorMessage(undefined)
      setResult(ok ? 'success' : 'fail')
      return
    }
    // 서버에 보내기 전에 확실히 걸러지는 경우는 먼저 사유를 붙여 알린다.
    if (remainingSeconds <= 0) {
      setErrorMessage('유효시간이 지났습니다. 새 코드를 받아 다시 시도해주세요.')
      setResult('fail')
      return
    }
    if (scheduleId === undefined) {
      setErrorMessage('오늘 예정된 일정이 없어 출석할 수 없습니다.')
      setResult('fail')
      return
    }
    // 코드 검증은 서버가 한다 — 길이만 보고 성공으로 처리하면 안 된다.
    checkInAttendance(scheduleId, code)
      .then(() => {
        setErrorMessage(undefined)
        setResult('success')
        // 방금 출석이 내역에 바로 보이도록 목록을 다시 받는다.
        queryClient.invalidateQueries({ queryKey: ['my-attendances'] })
      })
      .catch((error) => {
        setErrorMessage(normalizeError(error).message)
        setResult('fail')
      })
  }, [code, remainingSeconds, scheduleId, queryClient])

  const closeResult = useCallback(() => {
    setResult('idle')
    setErrorMessage(undefined)
    if (result === 'success') setCodeRaw('')
  }, [result])

  return { code, setCode, remainingSeconds, result, errorMessage, submit, closeResult }
}
