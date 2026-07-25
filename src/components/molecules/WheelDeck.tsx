import { WHEEL_SPACER } from '@atoms'
import { cn } from '@utils'
import type { WheelDeckProps } from '@types'

// 휠 데크 — 날짜/시간 피커가 공유하는 3열 휠 스캐폴드.
// 중앙 선택 밴드(bg-black/5) + 상하 흰색 페이드로 중앙 항목을 강조한다. children 은 WheelPicker 열들.
export function WheelDeck({ children, bandClassName = 'w-[300px]', className }: WheelDeckProps) {
  return (
    <div className={cn('relative touch-pan-y', className)}>
      {/* 중앙 선택 밴드 — 행 피치(36)와 같은 높이 */}
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-1/2 z-0 h-[36px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-black/5',
          bandClassName,
        )}
        aria-hidden
      />
      <div className="relative z-10 flex touch-pan-y justify-center gap-32">{children}</div>
      {/* 위/아래 페이드 마스크 — 중앙 행 위/아래를 흐리게. 휠 스페이서와 같은 높이라야 중앙만 또렷하다. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-white to-transparent"
        style={{ height: WHEEL_SPACER }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-white to-transparent"
        style={{ height: WHEEL_SPACER }}
      />
    </div>
  )
}
