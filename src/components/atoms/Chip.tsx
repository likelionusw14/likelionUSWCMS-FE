import { cn } from '@utils'
import type { ChipProps } from '@types'

// 해시태그 칩.
export function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-full border-2 border-secondary-1 bg-white/70 px-16 py-8 text-m-14 text-primary',
        className,
      )}
    >
      {label}
    </span>
  )
}
