import { LION_PART_OPTIONS } from '@constants'
import { cn } from '@utils'
import type { LionPartFilterProps, UserLionQuery } from '@types'

// 아기사자 파트 필터 — 세그먼트 버튼(기획/디자인/프론트엔드/백엔드). '전체' 없음, 기본 기획.
export function LionPartFilter({ value, onChange, className }: LionPartFilterProps) {
  return (
    // 세그먼트 컨트롤 — 바깥 테두리 1겹(gray-300)으로 일관. 칸은 Figma 처럼 글자에 맞춰 hug
    // (기획 좁고 프론트엔드 넓음). 데스크탑 스펙(px-24·py-10·text-18, 합 396)으로 만들고
    // 태블릿/모바일은 zoom 으로 통째 축소해 Figma 폭(288/265)·버튼 비율을 그대로 재현.
    <div
      className={cn(
        'inline-flex overflow-hidden rounded-8 border border-gray-300 [zoom:0.669] md:[zoom:0.727] xl:[zoom:1]',
        className,
      )}
    >
      {LION_PART_OPTIONS.map((option, index) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value as NonNullable<UserLionQuery['part']>)}
            className={cn(
              'flex items-center justify-center whitespace-nowrap px-24 py-[10px] text-m-18 transition-colors',
              index > 0 && 'border-l border-gray-300',
              isActive ? 'bg-secondary-2 text-white' : 'bg-white text-gray-500/50',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
