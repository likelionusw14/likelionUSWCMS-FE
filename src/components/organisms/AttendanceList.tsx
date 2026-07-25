import { Checkbox } from '@atoms'
import { DataTable } from '@molecules'
import { ListSection } from '@organisms'
import { cn } from '@utils'
import type { AttendanceListProps, AttendanceRecord, Column } from '@types'

// 출석 내역 카드 — 건수 + 표(날짜·이름·학번·파트·출석상태 체크·비고) + 페이지네이션.
// 흰 카드 rounded-16 + 파란 엠보. 출석상태는 체크박스 토글, 비고는 RemarkModal(검정 밑줄). Figma 563:8947.
// 모바일(375) 대응 — 74px 고정 열(이름·학번·파트)의 긴 값이 여러 줄로 감싸져 40px 행 높이를 넘으므로 말줄임 처리. Figma 모바일(1203:15090) 셀도 ellipsis.
export function AttendanceList({
  records,
  totalCount,
  page,
  totalPages,
  onPageChange,
  onTogglePresent,
  onEditRemark,
}: AttendanceListProps) {
  const columns: Column<AttendanceRecord>[] = [
    { id: 'date', header: '날짜', accessor: (r) => r.date, width: 74, align: 'center' },
    {
      id: 'name',
      header: '이름',
      accessor: (r) => r.name,
      width: 74,
      align: 'center',
      truncate: true,
    },
    {
      id: 'studentId',
      header: '학번',
      accessor: (r) => r.studentId,
      width: 74,
      align: 'center',
      truncate: true,
    },
    {
      id: 'part',
      header: '파트',
      accessor: (r) => r.part,
      width: 74,
      align: 'center',
      truncate: true,
    },
    {
      id: 'present',
      header: '출석상태',
      width: 74,
      align: 'center',
      cell: (r) => (
        <Checkbox
          checked={r.present}
          onChange={() => onTogglePresent(r.id)}
          variant="square"
          ariaLabel="출석 여부"
        />
      ),
    },
    {
      id: 'remark',
      header: '비고',
      width: 74,
      align: 'center',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onEditRemark(r)}
          aria-label="비고"
          className={cn('truncate text-black', r.remark && 'underline')}
        >
          {r.remark}
        </button>
      ),
    },
  ]

  return (
    <ListSection
      totalCount={totalCount}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      className="overflow-hidden shadow-emboss-light"
    >
      <DataTable columns={columns} rows={records} rowKey={(r) => r.id} ariaLabel="출석 내역" />
    </ListSection>
  )
}
