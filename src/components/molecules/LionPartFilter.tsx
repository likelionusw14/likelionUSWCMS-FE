import { LION_PART_OPTIONS } from '@constants'
import { cn } from '@utils'
import type { LionPartFilterProps, UserLionQuery } from '@types'

// 아기사자 파트 필터 — 세그먼트 버튼(기획/디자인/프론트엔드/백엔드). '전체' 없음, 기본 기획.
export function LionPartFilter({ value, onChange, className }: LionPartFilterProps) {
  return (
    <div className={cn('flex overflow-hidden rounded-8', className)}>
      {LION_PART_OPTIONS.map((option, index) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value as NonNullable<UserLionQuery['part']>)}
            className={cn(
              'flex items-center justify-center whitespace-nowrap border px-24 py-12 text-m-18 transition-colors',
              index > 0 && '-ml-px',
              isActive
                ? 'z-10 border-secondary-2 bg-secondary-2 text-white'
                : 'border-gray-300 bg-white text-gray-500/50',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
