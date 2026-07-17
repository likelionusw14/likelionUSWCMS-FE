import { Checkbox } from '@atoms'
import { Pagination } from '@molecules'
import type { AttendanceListProps } from '@types'

const ROW = 'flex w-full items-center justify-between border-b border-secondary-1 px-32 py-8'
const CELL = 'w-[74px] shrink-0 text-center'

// 출석 내역 — 날짜·이름·학번·파트·출석상태(체크박스 토글)·비고(RemarkModal) + 페이지네이션. Figma 563:8945.
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
    <section className="flex w-full flex-col gap-24 rounded-8 bg-white px-32 py-24">
      <h2 className="text-sm-22 text-black">출석 내역</h2>
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
            <span className="flex w-[74px] shrink-0 justify-center">
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
              className={`${CELL} truncate text-primary underline`}
            >
              {record.remark || '비고'}
            </button>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  )
}
