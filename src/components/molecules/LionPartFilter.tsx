import { LION_PART_OPTIONS } from '@constants'
import { cn } from '@utils'
import type { LionPartFilterProps, UserLionQuery } from '@types'

// 아기사자 파트 필터 — 단일 선택 칩(기획/디자인/프론트엔드/백엔드). '전체' 없음, 기본 기획.
export function LionPartFilter({ value, onChange, className }: LionPartFilterProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-8', className)}>
      {LION_PART_OPTIONS.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value as NonNullable<UserLionQuery['part']>)}
            className={cn(
              'flex items-center justify-center whitespace-nowrap rounded-full border-2 px-16 py-8 text-m-14 transition-colors',
              isActive
                ? 'border-primary bg-primary text-white'
                : 'border-secondary-1 bg-white/70 text-primary',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
