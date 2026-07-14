import { cn } from '@utils'
import type { FormRowProps } from '@types'

// 관리 폼의 표 형태 행 — 라벨 셀(secondary-1) + 입력 셀.
export function FormRow({ label, children, className, labelClassName }: FormRowProps) {
  return (
    <div className={cn('flex min-w-px flex-1 items-stretch', className)}>
      <span
        className={cn(
          'flex w-[152px] shrink-0 items-center bg-secondary-1 px-24 text-m-14 text-black',
          labelClassName,
        )}
      >
        {label}
      </span>
      <div className="flex min-w-px flex-1 items-center px-24 py-8">{children}</div>
    </div>
  )
}
