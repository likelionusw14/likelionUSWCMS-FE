import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@utils'
import type { ButtonProps } from '@types'

// 공용 버튼 아톰 — Figma 저장/취소/삭제 버튼 규격을 담는다.
// variant: primary(채움) · outline(흰 배경 + primary 테두리) · danger(흰 배경 + error 테두리).
// size: md(모달 기본 h-48 min-w-128) · block(폼 전체폭 h-48) · sm(소형 h-32 w-56).
const VARIANT_CLASS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-white',
  outline: 'border border-primary bg-white text-primary',
  danger: 'border border-error bg-white text-error',
}

const SIZE_CLASS: Record<NonNullable<ButtonProps['size']>, string> = {
  md: 'h-48 min-w-[128px] px-32 text-sm-18',
  block: 'h-48 w-full px-32 text-sm-18',
  sm: 'h-32 w-[56px] text-m-14',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-8 transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        className,
      )}
      {...props}
    />
  )
}
