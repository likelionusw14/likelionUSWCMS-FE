import { cn } from '@utils'
import type { InputProps } from '@types'

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-40 rounded-8 border border-secondary-1 bg-white px-16 py-8 text-r-14 text-black placeholder:text-primary/50',
        className,
      )}
      {...props}
    />
  )
}
