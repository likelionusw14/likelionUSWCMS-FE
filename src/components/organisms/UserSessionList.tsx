import { DataTable } from '@molecules'
import { ListSection } from '@organisms'
import type { Column, UserSessionListProps, UserSessionResource } from '@types'

const COLUMNS: Column<UserSessionResource>[] = [
  { id: 'fileName', header: '파일명', accessor: (session) => session.fileName, minWidth: 240 },
  {
    id: 'week',
    header: '주차',
    accessor: (session) => `${session.week}주차`,
    width: 120,
    align: 'center',
  },
  {
    id: 'part',
    header: '파트',
    accessor: (session) => session.partLabel,
    width: 120,
    align: 'center',
  },
]

export function UserSessionList({
  sessions,
  totalCount,
  page,
  totalPages,
  isLoading,
  onPageChange,
}: UserSessionListProps) {
  return (
    <ListSection
      header={<p className="text-m-20 text-primary">Session</p>}
      totalCount={totalCount}
      page={page}
      totalPages={Math.max(1, totalPages)}
      onPageChange={onPageChange}
    >
      <DataTable
        columns={COLUMNS}
        rows={sessions}
        rowKey={(session) => session.id}
        getRowHref={(session) => `/app/sessions/${session.id}`}
        isLoading={isLoading}
        loadingRowCount={20}
        emptyMessage="조건에 맞는 세션자료가 없습니다."
        ariaLabel="세션자료 목록"
      />
    </ListSection>
  )
}
