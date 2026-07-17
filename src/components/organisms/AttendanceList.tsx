import { Checkbox } from '@atoms'
import { Pagination } from '@molecules'
import type { AttendanceListProps } from '@types'

// 표 셀 — 6열 모두 74px 고정, 행 사이 secondary-1 구분선.
const ROW = 'flex w-full items-center justify-between border-b border-secondary-1 px-32 py-8'
const CELL = 'w-[74px] shrink-0 text-center'

// 출석 내역 카드 — 건수 + 표(날짜·이름·학번·파트·출석상태 체크·비고) + 페이지네이션.
// 흰 카드 rounded-16 + 파란 엠보. 출석상태는 체크박스 토글, 비고는 RemarkModal(검정 밑줄). Figma 563:8947.
export function AttendanceList({
  records,
  totalCount,
  page,
  totalPages,
  onPageChange,
  onTogglePresent,
  onEditRemark,
}: AttendanceListProps) {
  return (
    <section className="flex w-full flex-col gap-24 overflow-hidden rounded-16 bg-white px-32 py-24 shadow-emboss-light">
      <p className="text-m-14 text-black">
        총 {totalCount}건 ({page}/{totalPages} page)
      </p>
      <div className="flex w-full flex-col">
        <div className={`${ROW} h-32 border-t text-m-14 text-primary`}>
          <span className={CELL}>날짜</span>
          <span className={CELL}>이름</span>
          <span className={CELL}>학번</span>
          <span className={CELL}>파트</span>
          <span className={CELL}>출석상태</span>
          <span className={CELL}>비고</span>
        </div>
        {records.map((record) => (
          <div key={record.id} className={`${ROW} h-40 text-m-14 text-black`}>
            <span className={CELL}>{record.date}</span>
            <span className={CELL}>{record.name}</span>
            <span className={CELL}>{record.studentId}</span>
            <span className={CELL}>{record.part}</span>
            <span className="flex w-[74px] shrink-0 items-center justify-center">
              <Checkbox
                checked={record.present}
                onChange={() => onTogglePresent(record.id)}
                variant="square"
                ariaLabel="출석 여부"
              />
            </span>
            <button
              type="button"
              onClick={() => onEditRemark(record)}
              aria-label="비고"
              className={`${CELL} truncate text-black ${record.remark ? 'underline' : ''}`}
            >
              {record.remark}
            </button>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  )
}
