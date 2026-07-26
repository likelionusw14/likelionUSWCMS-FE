import { WHEEL_ITEM_H } from '@atoms'
import { cn } from '@utils'
import type { WheelDeckProps } from '@types'

// 휠 데크 — 날짜/시간 피커가 공유하는 3열 휠 스캐폴드.
// 중앙 선택 밴드(bg-black/5) + 상하 흰색 페이드로 중앙 항목을 강조한다. children 은 WheelPicker 열들.
export function WheelDeck({ children, bandClassName = 'w-[300px]', className }: WheelDeckProps) {
  return (
    <div className={cn('relative flex flex-col justify-center touch-pan-y', className)}>
      {/* 중앙 선택 밴드 — Figma 300x40(날짜) · 230x40(시간). 행 피치(36)보다 살짝 큰 40. */}
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-1/2 z-0 h-40 -translate-x-1/2 -translate-y-1/2 rounded-8 bg-black/5',
          bandClassName,
        )}
        aria-hidden
      />
      {/* 휠 열은 237 고정이라 데크가 더 짧으면(시간 선택 220) 위아래로 균등하게 잘려야 중앙이 맞는다 —
          justify-center 로 세로 중앙 정렬한 뒤 overflow-hidden 으로 자른다. */}
      <div className="relative z-10 flex touch-pan-y justify-center gap-32">{children}</div>
      {/* 위/아래 페이드 마스크 — 데크 높이가 아니라 '중앙 행'을 기준으로 잡는다.
          중앙 ± 행 절반만 또렷하게 남기므로 데크가 237(날짜)이든 220(시간)이든 자동으로 맞는다. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-white to-transparent"
        style={{ bottom: `calc(50% + ${WHEEL_ITEM_H / 2}px)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-white to-transparent"
        style={{ top: `calc(50% + ${WHEEL_ITEM_H / 2}px)` }}
      />
    </div>
  )
}
