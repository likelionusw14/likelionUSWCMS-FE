import { cn } from '@utils'
import type { MobileMenuButtonProps } from '@types'

// 햄버거 버튼 — 3줄 막대가 열리면 X 로 바뀐다.
// 막대는 bg-current 라 버튼의 text-* 색을 그대로 따라간다(관리자=검정, 사용자=secondary-2).
// 크기·막대 길이는 className/barClassName 으로 화면별 사양에 맞춘다.
export function MobileMenuButton({
  open,
  onToggle,
  controls,
  className,
  barClassName,
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
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
          'h-[2px] bg-current transition-transform',
          barClassName,
          open && 'translate-y-[6px] rotate-45',
        )}
      />
      <span
        className={cn('h-[2px] bg-current transition-opacity', barClassName, open && 'opacity-0')}
      />
      <span
        className={cn(
          'h-[2px] bg-current transition-transform',
          barClassName,
          open && '-translate-y-[6px] -rotate-45',
        )}
      />
    </button>
  )
}
