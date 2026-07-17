import { useCallback, useEffect, useRef, useState } from 'react'

// 유효시간 5분.
const VALID_SECONDS = 5 * 60

// 7자리 숫자 코드.
function randomCode(): string {
  return String(Math.floor(Math.random() * 10_000_000)).padStart(7, '0')
}

// 출석 코드 생성 — 코드 발급 + 유효시간 카운트다운.
// 백엔드 연동 전: 로컬에서 난수 코드 발급. 연동 시 generate 안에서 apiClient 호출로 교체한다.
export function useAttendanceCode(): {
  code: string | null
  remainingSeconds: number
  generate: () => void
} {
  const [code, setCode] = useState<string | null>(null)
  const [remainingSeconds, setRemainingSeconds] = useState(VALID_SECONDS)
  const timerRef = useRef<number | undefined>(undefined)

  // 코드가 있을 때만 1초마다 카운트다운. 만료되면 코드 무효 + 유효시간 초기화.
  useEffect(() => {
    if (!code) return
    timerRef.current = window.setInterval(() => {
      setRemainingSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(timerRef.current)
          setCode(null)
          return VALID_SECONDS
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(timerRef.current)
  }, [code])

  const generate = useCallback(() => {
    setCode(randomCode())
    setRemainingSeconds(VALID_SECONDS)
  }, [])

  return { code, remainingSeconds, generate }
}
