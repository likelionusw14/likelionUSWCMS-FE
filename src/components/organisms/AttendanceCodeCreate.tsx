import { Button } from '@atoms'
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

      {/* 모바일: 코드 박스 좌우 패딩 16으로 줄이고 min-w-0 으로 40px 코드가 카드를 밀지 않게 한다. */}
      <div className="flex h-64 w-full min-w-0 items-center justify-center rounded-16 bg-secondary-1 px-16 sm:px-24">
        <span
          className={cn(
            // 코드 숫자 표시(40px). text-h1 토큰은 fontWeight 700 을 강제 번들하는데,
            // 여기선 발급 전/후로 weight(normal/medium)를 바꿔야 해 임의값을 유지한다.
            'min-w-0 flex-1 truncate text-center text-[40px] leading-none',
            code ? 'font-medium text-black' : 'font-normal text-white',
          )}
        >
          {/* 발급 전 자리표시자도 실제 코드와 같은 6자리 (인증 API 제약 ^\d{6}$). */}
          {code ?? '000000'}
        </span>
      </div>

      <p className="text-sm-18 text-primary/90">유효시간 {formatTime(remainingSeconds)}</p>

      {/* 시안(1203:14334)은 버튼이 131x48 로 내용폭 가운데 정렬이다 — 모바일에서도 전폭으로 늘리지 않는다. */}
      <Button variant="primary" onClick={onGenerate}>
        코드 생성
      </Button>
    </div>
  )
}
