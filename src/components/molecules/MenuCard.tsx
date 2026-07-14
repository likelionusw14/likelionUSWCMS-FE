import { WindowPanel } from '@atoms'
import { cn } from '@utils'
import type { MenuCardProps } from '@types'

// 관리 메뉴 카드 — 창 패널 안에 제목·설명.
export function MenuCard({ title, description, className }: MenuCardProps) {
  return (
    <WindowPanel
      className={cn('py-px', className)}
      bodyClassName="flex h-[235px] flex-col justify-center gap-8"
    >
      <h2 className="text-sm-22 text-black">{title}</h2>
      <p className="text-m-16-home text-black">{description}</p>
    </WindowPanel>
  )
}
