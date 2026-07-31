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
  // Figma 6열 등폭 가변 — 1280 컨테이너 1088 / 800 672(무스크롤) / 375 720(스크롤).
  // 고정 width 를 쓰면 합(660+32)이 800 컨테이너 672 를 넘겨 시안에 없는 가로 스크롤이 생긴다.
  // minWidth 로 두면 넓은 폭에서는 늘어나 채우고, 375 에서만 스크롤된다(합 606 + 여백 64 = 670 ≤ 672).
  const COL = { minWidth: 101, align: 'center' } as const
  const columns: Column<AttendanceRecord>[] = [
    { id: 'date', header: '날짜', accessor: (r) => r.date, ...COL },
    { id: 'name', header: '이름', accessor: (r) => r.name, ...COL },
    { id: 'studentId', header: '학번', accessor: (r) => r.studentId, ...COL },
    { id: 'part', header: '파트', accessor: (r) => r.part, ...COL },
    {
      id: 'present',
      header: '출석상태',
      ...COL,
      cell: (r) => (
        <Checkbox checked={r.present} onChange={() => {}} variant="square" ariaLabel="출석 여부" />
      ),
    },
    { id: 'remark', header: '비고', accessor: (r) => r.remark, ...COL },
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
