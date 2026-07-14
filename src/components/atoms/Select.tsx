import chevronDown from '@/assets/icons/chevron-down.svg'
import { cn } from '@utils'
import type { SelectProps } from '@types'

// 값이 없을 때는 placeholder 색으로 보이도록 select 자체의 글자색을 바꾼다.
export function Select({ options, placeholder, className, value, ...props }: SelectProps) {
  return (
    <div className={cn('relative', className)}>
      <select
        value={value}
        className={cn(
          'h-40 w-full appearance-none rounded-8 border border-secondary-1 bg-white px-16 py-8 text-r-14',
          value ? 'text-black' : 'text-primary/50',
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
      <img
        src={chevronDown}
        alt=""
        className="pointer-events-none absolute right-16 top-16 h-8 w-12"
      />
    </div>
  )
}
