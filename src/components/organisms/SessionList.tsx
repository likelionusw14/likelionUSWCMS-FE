import { Link } from 'react-router-dom'
import plusIcon from '@/assets/icons/plus.svg'
import { Pagination } from '@molecules'
import type { SessionListProps } from '@types'

// 표 셀 공통 — 파일명은 남는 폭을 쓰고(넘치면 말줄임) 주차·파트는 96px 고정이다.
const ROW = 'flex w-full items-center justify-between border-b border-secondary-1 px-32 py-8'
const NAME_CELL = 'min-w-64 max-w-[280px] flex-1 truncate'
const META_CELL = 'w-96 shrink-0 text-center'

// 세션자료 목록 — 건수 + 등록 버튼 + 파일 표 + 페이지네이션.
export function SessionList({
  sessions,
  totalCount,
  page,
  totalPages,
  onPageChange,
}: SessionListProps) {
  return (
    <div className="flex w-full flex-col gap-24 rounded-16 bg-white px-32 py-24">
      <p className="text-m-20 text-primary">Session</p>
      <div className="flex w-full items-center justify-between">
        <p className="text-m-14 text-black">
          총 {totalCount}건 ({page}/{totalPages} page)
        </p>
        <Link
          to="/admin/sessions/new"
          aria-label="세션자료 등록"
          className="flex h-24 w-40 items-center justify-center"
        >
          <img src={plusIcon} alt="" className="h-16 w-16" />
        </Link>
      </div>
      <div className="flex w-full flex-col">
        <div className={`${ROW} h-32 border-t text-m-14 text-primary`}>
          <span className={NAME_CELL}>파일명</span>
          <span className={META_CELL}>주차</span>
          <span className={META_CELL}>파트</span>
        </div>
        {sessions.map((session) => (
          <Link
            key={session.id}
            to={`/admin/sessions/${session.id}`}
            className={`${ROW} h-40 text-m-14 text-black`}
          >
            <span className={NAME_CELL}>{session.fileName}</span>
            <span className={META_CELL}>{session.week}</span>
            <span className={META_CELL}>{session.part}</span>
          </Link>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}
