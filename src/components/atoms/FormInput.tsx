import { cn } from '@utils'
import type { InputProps } from '@types'

// 관리 폼 입력칸 — Figma 작성폼 인풋 (secondary-1 테두리 + background-1 배경, primary/50 placeholder).
export function FormInput({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-32 w-full rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14 text-black placeholder:text-primary/50 focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}
