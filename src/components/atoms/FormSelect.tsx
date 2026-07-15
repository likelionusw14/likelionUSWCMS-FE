import chevronDownSmall from '@/assets/icons/chevron-down-sm.svg'
import { cn } from '@utils'
import type { SelectProps } from '@types'

// 관리 폼 선택칸 — FormInput 과 같은 높이(32px)에 회색 테두리 + 작은 화살표.
// 값이 없을 때는 placeholder 색으로 보이도록 select 자체의 글자색을 바꾼다.
export function FormSelect({ options, placeholder, className, value, ...props }: SelectProps) {
  return (
    <div className={cn('relative w-[172px]', className)}>
      <select
        value={value}
        className={cn(
          'h-32 w-full appearance-none rounded-8 border border-gray-500/50 bg-white pl-16 pr-32 text-m-14',
          value ? 'text-black' : 'text-gray-500/50',
        )}
        {...props}
      >
        {/* placeholder 는 선택지가 아니라 안내 문구다 (파트의 '기획' 처럼 실제 옵션과 겹칠 수 있어 목록에서 숨긴다). */}
        <option value="" hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
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
