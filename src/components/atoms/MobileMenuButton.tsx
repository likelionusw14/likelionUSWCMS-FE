import { cn } from '@utils'
import type { MobileMenuButtonProps } from '@types'

// 햄버거 버튼 — 3줄 막대가 열리면 X 로 바뀐다.
// 막대는 bg-current 라 버튼의 text-* 색을 그대로 따라간다(관리자=secondary-2, 사용자=secondary-2).
// 크기·막대 길이는 className/barClassName 으로 화면별 사양에 맞춘다.
// label 을 주면 그 문구로 고정한다(관리자 상단바처럼 '여는' 용도로만 쓰는 버튼).
export function MobileMenuButton({
  open,
  onToggle,
  controls,
  label,
  className,
  barClassName,
}: MobileMenuButtonProps) {
  const bar = 'h-[2px] rounded-full bg-current'

  return (
    <button
      type="button"
      aria-label={label ?? (open ? '메뉴 닫기' : '메뉴 열기')}
      title={label}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-8 outline-none focus-visible:ring-2 focus-visible:ring-current',
        className,
      )}
    >
      <span
        className={cn(
          bar,
          'transition-transform',
          barClassName,
          open && 'translate-y-[6px] rotate-45',
        )}
      />
      <span className={cn(bar, 'transition-opacity', barClassName, open && 'opacity-0')} />
      <span
        className={cn(
          bar,
          'transition-transform',
          barClassName,
          open && '-translate-y-[6px] -rotate-45',
        )}
      />
    </button>
  )
}
