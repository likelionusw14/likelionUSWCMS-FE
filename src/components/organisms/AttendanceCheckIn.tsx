import { Button } from '@atoms'
import { ResultDialog } from '@molecules'
import type { AttendanceCheckInProps } from '@types'

// mm:ss 포맷.
function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// 출석 코드 입력 카드 — 안내 말풍선 + 6자리 코드 입력 + 유효시간 + 출석 버튼. 성공/실패는 ResultDialog.
export function AttendanceCheckIn({
  code,
  onCodeChange,
  remainingSeconds,
  result,
  errorMessage,
  onSubmit,
  onCloseResult,
}: AttendanceCheckInProps) {
  return (
    <section className="flex flex-col items-center gap-24 rounded-16 bg-white px-16 py-24 shadow-emboss-light sm:px-32 sm:py-32">
      <h2 className="text-sm-22 text-black">출석 코드 입력</h2>
      <div className="flex items-end gap-16">
        <span className="h-[44px] w-[44px] shrink-0 rounded-full bg-secondary-1 shadow-emboss-light" />
        <span className="relative max-w-[230px] rounded-[18px] bg-primary px-24 py-16 text-m-14 text-white/90 sm:max-w-none">
          운영진이 제공한 출석 코드를 입력하여 출석해주세요.
          {/* 말풍선 꼬리 — Figma Tail(23:1027) 벡터 그대로(아래-왼쪽으로 둥글게 꺾이는 곡선). 색은 primary 토큰. */}
          <svg
            aria-hidden
            viewBox="0 0 16.4172 20.3225"
            fill="currentColor"
            className="absolute -left-[5px] top-[calc(100%-20px)] h-[20px] w-[17px] text-primary"
          >
            <path d="M0.112427 20.1846C5.31243 20.9846 10.4458 18.1212 12.1124 16.2879C10.3946 12.1914 21.0003 2.24186 14.0003 2.24148C12.3817 2.24148 10.9993 -1.9986 5.11242 1.1846C5.09122 2.47144 5.11242 6.92582 5.11242 7.6842C5.11242 18.1842 -0.887573 19.5813 0.112427 20.1846Z" />
          </svg>
        </span>
      </div>
      <input
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        inputMode="numeric"
        maxLength={6}
        placeholder="000000"
        aria-label="출석 코드"
        className="h-64 w-full rounded-16 bg-secondary-1 text-center text-h1 font-normal text-white placeholder:text-white focus:outline-none"
      />
      <p className="text-sm-18 text-primary">유효시간 {formatTime(remainingSeconds)}</p>
      <Button variant="primary" onClick={onSubmit} disabled={code.length < 6}>
        출석
      </Button>

      <ResultDialog
        open={result !== 'idle'}
        onConfirm={onCloseResult}
        title={result === 'success' ? '출석 완료' : '출석 실패'}
        description={
          result === 'success'
            ? '출석 처리가 완료되었습니다.'
            : (errorMessage ?? '코드가 올바르지 않거나 유효시간이 지났습니다.')
        }
        confirmLabel="확인"
      />
    </section>
  )
}
