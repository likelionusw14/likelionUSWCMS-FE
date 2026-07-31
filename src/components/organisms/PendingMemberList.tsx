import { ApprovalActions } from '@atoms'
import { DataTable } from '@molecules'
import { ListSection } from '@organisms'
import type { Column, PendingMember, PendingMemberListProps } from '@types'

// 승인대기 목록 — 이름·기수·파트 + 승인/취소(ApprovalActions). Figma 248:5421.
// 모바일(375) 대응 — 이름 열은 106px 고정이라 긴 이름이 여러 줄로 감싸져 40px 행 높이를 넘고 아래 행과 겹친다. Figma 모바일(1203:16917) 이름 셀처럼 말줄임 처리.
export function PendingMemberList({
  members,
  totalCount,
  onApprove,
  onReject,
}: PendingMemberListProps) {
  const columns: Column<PendingMember>[] = [
    {
      id: 'name',
      header: '이름',
      accessor: (m) => m.name,
      width: 106,
      align: 'center',
    },
    { id: 'cohort', header: '기수', accessor: (m) => m.cohort, width: 106, align: 'center' },
    { id: 'part', header: '파트', accessor: (m) => m.part, width: 106, align: 'center' },
    {
      id: 'actions',
      header: '승인대기',
      width: 160,
      align: 'center',
      cell: (m) => (
        <ApprovalActions
          onApprove={() => onApprove(m.id)}
          onCancel={() => onReject(m.id)}
          className="whitespace-nowrap"
        />
      ),
    },
  ]

  return (
    <ListSection
      header={<h2 className="text-sm-22 text-black">승인대기 목록</h2>}
      totalCount={totalCount}
      className="rounded-8"
    >
      <DataTable columns={columns} rows={members} rowKey={(m) => m.id} ariaLabel="승인대기 목록" />
    </ListSection>
  )
}
