import { cn } from '@utils'
import type { InputProps } from '@types'

// 입력 아톰 — variant 로 스타일 프리셋을 고른다.
// default: 회원가입 폼(h-40, 흰 배경, R/14). form: 관리 폼(h-32, background-1, M/14, outline 제거).
const VARIANT_CLASS: Record<NonNullable<InputProps['variant']>, string> = {
  default: 'h-40 bg-white px-16 py-8 text-r-14',
  form: 'h-32 w-full bg-background-1 px-16 text-m-14 focus:outline-none',
}

export function Input({ variant = 'default', className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'rounded-8 border border-secondary-1 text-black placeholder:text-primary/50',
        VARIANT_CLASS[variant],
        className,
      )}
      {...props}
    />
  )
}
