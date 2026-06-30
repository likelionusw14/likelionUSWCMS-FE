import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@utils'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variantClass: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-600',
  secondary: 'bg-surface-muted text-content hover:bg-surface-border',
  ghost: 'bg-transparent text-content-muted hover:bg-surface-muted',
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-card px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variantClass[variant],
        className,
      )}
      {...props}
    />
  )
}
