import { cn } from '@utils'
import type { CheckboxProps } from '@types'

// 공용 체크박스 — 미체크는 primary 테두리, 체크는 primary 채움 + 흰 체크(✓).
// round = 공지 필독(원형 32px), square = 출결 Checkpoint(사각 24px, rounded-8).
export function Checkbox({ checked, onChange, variant = 'square', disabled, ariaLabel, className }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'flex shrink-0 items-center justify-center border border-primary transition-colors',
        variant === 'round' ? 'h-32 w-32 rounded-full' : 'h-24 w-24 rounded-8',
        checked ? 'bg-primary' : 'bg-white',
        disabled && 'opacity-50',
        className,
      )}
    >
      {checked && (
        <svg
          viewBox="0 0 15 10"
          fill="none"
          aria-hidden
          className={cn('text-white', variant === 'round' ? 'h-[12px] w-[18px]' : 'h-[10px] w-[15px]')}
        >
          <path
            d="M1 5l4.5 4L14 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
