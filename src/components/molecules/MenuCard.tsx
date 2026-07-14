import { cn } from '@utils'
import type { MenuCardProps } from '@types'

// 관리 메뉴 카드 — 창(window) 모양 헤더(점 3개) + 제목·설명 본문.
export function MenuCard({ title, description, className }: MenuCardProps) {
  return (
    <div className={cn('flex flex-col py-px', className)}>
      <div className="flex h-32 flex-col justify-center overflow-hidden rounded-t-16 bg-primary p-16 shadow-emboss-light">
        <div className="flex items-center gap-8">
          <span className="h-12 w-12 rounded-full bg-secondary-2" />
          <span className="h-12 w-12 rounded-full bg-secondary-1" />
          <span className="h-12 w-12 rounded-full bg-white" />
        </div>
      </div>
      <div className="flex h-[235px] flex-col justify-center gap-8 overflow-hidden rounded-b-16 bg-white p-32 shadow-emboss-light">
        <h2 className="text-sm-22 text-black">{title}</h2>
        <p className="text-m-16-home text-black">{description}</p>
      </div>
    </div>
  )
}
