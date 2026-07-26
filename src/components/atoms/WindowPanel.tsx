import { cn } from '@utils'
import type { WindowPanelProps } from '@types'

// 창(window) 모양 패널 — primary 헤더 바(점 3개) + 흰 본문. 공통·관리자 화면에서 공유한다.
export function WindowPanel({
  children,
  className,
  bodyClassName,
  headerClassName,
}: WindowPanelProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className={cn(
          'flex flex-col justify-center overflow-hidden rounded-t-16 bg-primary p-16 shadow-emboss-light',
          headerClassName ?? 'h-40',
        )}
      >
        <div className="flex items-center gap-8">
          <span className="h-12 w-12 rounded-full bg-secondary-2" />
          <span className="h-12 w-12 rounded-full bg-secondary-1" />
          <span className="h-12 w-12 rounded-full bg-white" />
        </div>
      </div>
      <div
        className={cn(
          'overflow-hidden rounded-b-16 bg-white p-24 shadow-emboss-light sm:p-32',
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
