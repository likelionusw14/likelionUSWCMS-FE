import { useNavigate } from 'react-router-dom'
import { DataTable } from '@molecules'
import { ListSection } from './ListSection'
import type { Column, Session, SessionListProps } from '@types'

// 세션자료 목록 — Session 라벨 + 건수·등록 + 표(파일명·주차·파트) + 페이지네이션. 행 클릭 시 상세.
const COLUMNS: Column<Session>[] = [
  { id: 'fileName', header: '파일명', accessor: (s) => s.fileName, minWidth: 64 },
  { id: 'week', header: '주차', accessor: (s) => s.week, width: 96, align: 'center' },
  { id: 'part', header: '파트', accessor: (s) => s.part, width: 96, align: 'center' },
]

export function SessionList({
  sessions,
  totalCount,
  page,
  totalPages,
  onPageChange,
}: SessionListProps) {
  const navigate = useNavigate()

  return (
    <ListSection
      header={<p className="text-m-20 text-primary">Session</p>}
      totalCount={totalCount}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onAdd={() => navigate('/admin/sessions/new')}
    >
      <DataTable
        columns={COLUMNS}
        rows={sessions}
        rowKey={(s) => s.id}
        getRowHref={(s) => `/admin/sessions/${s.id}`}
        ariaLabel="세션자료 목록"
      />
    </ListSection>
  )
}
