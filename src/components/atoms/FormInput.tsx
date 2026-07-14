import { cn } from '@utils'
import type { InputProps } from '@types'

// 관리 폼 입력칸 — 회색 테두리 + 8px 모서리.
export function FormInput({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-32 w-full rounded-8 border border-gray-500 px-16 text-m-14 text-black placeholder:text-gray-500',
        className,
      )}
      {...props}
    />
  )
}
