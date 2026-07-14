import { cn } from '@utils'
import type { FormFieldProps } from '@types'

// 가로 배치 폼 행 — 라벨 + 입력 요소.
export function FormField({ label, htmlFor, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex items-center gap-16', className)}>
      <label htmlFor={htmlFor} className="w-32 shrink-0 text-m-18 text-black">
        {label}
      </label>
      {children}
    </div>
  )
}
