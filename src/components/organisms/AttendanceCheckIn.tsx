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
  onSubmit,
  onCloseResult,
}: AttendanceCheckInProps) {
  return (
    <section className="flex flex-col items-center gap-24 rounded-16 bg-white px-32 py-32 shadow-emboss-light">
      <h2 className="text-sm-20 text-black">출석 코드 입력</h2>
      <div className="flex items-center gap-16">
        <span className="h-40 w-40 shrink-0 rounded-full bg-secondary-1" />
        <span className="rounded-16 bg-primary px-24 py-12 text-m-16 text-white">
          운영진이 제공한 출석 코드를 입력하여 출석해주세요.
        </span>
      </div>
      <input
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        inputMode="numeric"
        maxLength={6}
        placeholder="000000"
        aria-label="출석 코드"
        className="h-[56px] w-full rounded-16 bg-secondary-1/40 text-center text-h1 tracking-[0.3em] text-black placeholder:text-primary/40 focus:outline-none"
      />
      <p className="text-m-14 text-primary">유효시간 {formatTime(remainingSeconds)}</p>
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
            : '코드가 올바르지 않거나 유효시간이 지났습니다.'
        }
        confirmLabel="확인"
      />
    </section>
  )
}
