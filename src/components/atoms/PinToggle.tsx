import { cn } from '@utils'
import type { PinToggleProps } from '@types'

// 고정여부 토글 (48×24) — off: background-1 트랙 / on: primary 트랙, 20px 흰 노브가 좌우 이동.
// Figma 754:5243: 트랙 rounded-full + inset 그림자, 노브 흰 원(그림자 없음).
export function PinToggle({ pinned, onChange, disabled, ariaLabel, className }: PinToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pinned}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!pinned)}
      className={cn(
        'relative h-24 w-48 shrink-0 rounded-full shadow-[inset_0_1px_1px_0_rgba(4,16,45,0.15)] transition-colors',
        pinned ? 'bg-primary' : 'bg-background-1',
        disabled && 'opacity-50',
        className,
      )}
    >
      <span
        className={cn(
          'absolute top-[2px] h-[20px] w-[20px] rounded-full bg-white transition-[left]',
          pinned ? 'left-[26px]' : 'left-[2px]',
        )}
      />
    </button>
  )
}
