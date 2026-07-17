import { Link } from 'react-router-dom'
import type { DetailActionsProps } from '@types'

// 상세 화면 헤더의 목록/수정 버튼 쌍 — 프로젝트·세션·공지 상세가 공유한다.
export function DetailActions({ listHref, editHref }: DetailActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-8">
      <Link
        to={listHref}
        className="flex h-32 items-center rounded-8 border border-primary px-16 text-m-14 text-primary"
      >
        목록
      </Link>
      <Link
        to={editHref}
        className="flex h-32 items-center rounded-8 bg-primary px-16 text-m-14 text-white"
      >
        수정
      </Link>
    </div>
  )
}
