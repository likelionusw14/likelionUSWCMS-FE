import { Checkbox } from '@atoms'
import { DataTable } from '@molecules'
import { ListSection } from '@organisms'
import type { AttendanceRecord, Column, UserAttendanceListProps } from '@types'

// 본인 출석 내역 카드(읽기 전용) — 날짜·이름·학번·파트·출석상태·비고 + 페이지네이션.
// 출석상태는 읽기 전용 체크박스(토글 없음), 비고는 텍스트. Figma 14:551.
export function UserAttendanceList({
  records,
  totalCount,
  page,
  totalPages,
  onPageChange,
}: UserAttendanceListProps) {
  const columns: Column<AttendanceRecord>[] = [
    { id: 'date', header: '날짜', accessor: (r) => r.date, width: 120, align: 'center' },
    { id: 'name', header: '이름', accessor: (r) => r.name, width: 100, align: 'center' },
    { id: 'studentId', header: '학번', accessor: (r) => r.studentId, width: 120, align: 'center' },
    { id: 'part', header: '파트', accessor: (r) => r.part, width: 100, align: 'center' },
    {
      id: 'present',
      header: '출석상태',
      width: 100,
      align: 'center',
      cell: (r) => (
        <Checkbox checked={r.present} onChange={() => {}} variant="square" ariaLabel="출석 여부" />
      ),
    },
    { id: 'remark', header: '비고', accessor: (r) => r.remark, minWidth: 120, align: 'center' },
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
