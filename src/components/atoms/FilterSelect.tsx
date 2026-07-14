import chevronDownSmall from '@/assets/icons/chevron-down-sm.svg'
import { cn } from '@utils'
import type { SelectProps } from '@types'

// 목록 상단 필터용 풀다운. Figma 는 secondary-1 위에 흰색 80% 를 덮은 2겹 채움이라 그대로 재현한다.
export function FilterSelect({ options, placeholder, className, value, ...props }: SelectProps) {
  return (
    <div
      className={cn('relative h-32 rounded-8 border border-primary/20 bg-secondary-1', className)}
    >
      <div className="absolute inset-0 rounded-8 bg-white/80" />
      <select
        value={value}
        className="relative h-full w-full appearance-none bg-transparent pl-16 pr-32 text-m-14 text-black"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <img
        src={chevronDownSmall}
        alt=""
        className="pointer-events-none absolute right-16 top-[14px] h-4 w-8"
      />
    </div>
  )
}
