import { Link } from 'react-router-dom'
import plusIcon from '@/assets/icons/plus.svg'
import { Checkbox } from '@atoms'
import { Pagination } from '@molecules'
import type { NoticeListProps } from '@types'

// 표 셀 공통 — 제목은 남는 폭(넘치면 말줄임), 태그 48·작성일 96 고정, 필독 체크 37 고정.
const ROW = 'flex w-full items-center justify-between border-b border-secondary-1 px-32 py-8'
const CHECK_CELL = 'flex w-[37px] shrink-0 items-center justify-center'
const TITLE_CELL = 'min-w-64 max-w-[280px] flex-1 truncate text-center'
const TAG_CELL = 'w-48 shrink-0 text-center'
const DATE_CELL = 'w-96 shrink-0 text-center'

// 공지 목록 — Notice 라벨 + 건수·등록 + 표(필독·제목·태그·작성일) + 페이지네이션. Figma 563:8345.
export function NoticeList({ notices, totalCount, page, totalPages, onPageChange }: NoticeListProps) {
  return (
    <div className="flex w-full flex-col gap-24 rounded-16 bg-white px-32 py-24">
      <p className="text-m-20 text-primary">Notice</p>
      <div className="flex w-full items-center justify-between">
        <p className="text-m-14 text-black">
          총 {totalCount}건 ({page}/{totalPages} page)
        </p>
        <Link
          to="/admin/notices/new"
          aria-label="공지 등록"
          className="flex h-24 w-40 items-center justify-center"
        >
          <img src={plusIcon} alt="" className="h-16 w-16" />
        </Link>
      </div>
      <div className="flex w-full flex-col">
        <div className={`${ROW} h-32 border-t text-m-14 text-primary`}>
          <span className={CHECK_CELL} />
          <span className={TITLE_CELL}>제목</span>
          <span className={TAG_CELL}>태그</span>
          <span className={DATE_CELL}>작성일</span>
        </div>
        {notices.map((notice) => (
          <Link
            key={notice.id}
            to={`/admin/notices/${notice.id}`}
            className={`${ROW} h-40 text-m-14 text-black`}
          >
            <span className={`${CHECK_CELL} pointer-events-none`}>
              {notice.mustRead && (
                <Checkbox checked onChange={() => {}} variant="square" ariaLabel="필독" />
              )}
            </span>
            <span className={TITLE_CELL}>{notice.title}</span>
            <span className={TAG_CELL}>{notice.tag}</span>
            <span className={DATE_CELL}>{notice.createdAt}</span>
          </Link>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}
