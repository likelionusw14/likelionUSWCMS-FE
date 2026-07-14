import { Link } from 'react-router-dom'
import { WindowPanel } from '@atoms'
import { cn } from '@utils'
import type { MenuCardProps } from '@types'

// 관리 메뉴 카드 — 기본은 제목·설명, 호버하면 본문이 secondary-1 로 바뀌며 이동 안내로 교체된다.
export function MenuCard({ title, description, to, className }: MenuCardProps) {
  return (
    <Link to={to} className={cn('group block py-px', className)}>
      <WindowPanel bodyClassName="flex h-[235px] flex-col justify-center gap-8 group-hover:bg-secondary-1">
        <div className="flex flex-col gap-8 group-hover:hidden">
          <h2 className="text-sm-22 text-black">{title}</h2>
          <p className="text-m-16-home text-black">{description}</p>
        </div>
        <div className="hidden items-center gap-40 group-hover:flex">
          <span className="text-sm-22 text-black">{title}하기</span>
          <span aria-hidden className="text-sm-22 text-black">
            →
          </span>
        </div>
      </WindowPanel>
    </Link>
  )
}
