import { cn } from '@utils'
import type { AttendanceCodeCreateProps } from '@types'

// 초 → mm:ss.
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// 출석 코드 생성 — 흰 카드(엠보) 안에 제목 + 코드 박스 + 유효시간 + 생성 버튼.
// Figma 741:2981: rounded-16 px-24 py-40 shadow-emboss-light, 내부 gap-24 중앙정렬.
// 코드 박스: secondary-1 배경·h-64·rounded-16. 발급 전 40px 흰 Regular('0000000'),
// 발급 후 40px 검정 Medium(실제 코드). 유효시간: SM/18 primary/90.
export function AttendanceCodeCreate({
  code,
  remainingSeconds,
  onGenerate,
}: AttendanceCodeCreateProps) {
  return (
    <div className="flex w-full flex-col items-center gap-24 rounded-16 bg-white px-24 py-40 shadow-emboss-light">
      <h2 className="text-sm-22 text-black">출석 코드 생성</h2>

      <div className="flex h-64 w-full items-center justify-center rounded-16 bg-secondary-1 px-24">
        <span
          className={cn(
            'flex-1 text-center text-[40px] leading-none',
            code ? 'font-medium text-black' : 'font-normal text-white',
          )}
        >
          {code ?? '0000000'}
        </span>
      </div>

      <p className="text-sm-18 text-primary/90">유효시간 {formatTime(remainingSeconds)}</p>

      <button
        type="button"
        onClick={onGenerate}
        className="flex h-48 min-w-[128px] items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
      >
        코드 생성
      </button>
    </div>
  )
}
