import { DataTable } from '@molecules'
import { ListSection } from '@organisms'
import type { Column, UserNotice, UserNoticeListProps } from '@types'

function formatDate(value: string) {
  return value.slice(0, 10).replaceAll('-', '.')
}

const COLUMNS: Column<UserNotice>[] = [
  {
    id: 'fixed',
    header: '',
    cell: (notice) =>
      notice.isFixed ? (
        <span
          aria-label="필독 공지"
          className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-sm-20 text-white"
        >
          ✓
        </span>
      ) : null,
    width: 37,
    align: 'center',
  },
  { id: 'title', header: '제목', accessor: (notice) => notice.title, minWidth: 280 },
  {
    id: 'tag',
    header: '태그',
    accessor: (notice) => notice.tagLabel,
    width: 96,
    align: 'center',
  },
  {
    id: 'date',
    header: '작성일',
    accessor: (notice) => formatDate(notice.publishedAt),
    width: 96,
    align: 'center',
  },
]

export function UserNoticeList({
  notices,
  totalCount,
  page,
  totalPages,
  isLoading,
  onPageChange,
  detailBasePath,
}: UserNoticeListProps) {
  return (
    <ListSection
      header={<p className="text-m-20 text-primary">Notice</p>}
      totalCount={totalCount}
      page={page}
      totalPages={Math.max(1, totalPages)}
      onPageChange={onPageChange}
    >
      <DataTable
        columns={COLUMNS}
        rows={notices}
        rowKey={(notice) => notice.id}
        getRowHref={(notice) => `${detailBasePath}/${notice.id}`}
        isLoading={isLoading}
        loadingRowCount={20}
        emptyMessage="조건에 맞는 공지가 없습니다."
        ariaLabel="공지 목록"
        tightMobileEdge
      />
    </ListSection>
  )
}
