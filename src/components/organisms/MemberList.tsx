import { DataTable } from '@molecules'
import { ListSection } from '@organisms'
import type { Column, Member, MemberListProps } from '@types'

// 회원 목록 — 이름·분류(권한수정 링크)·기수·파트·가입상태·수정 링크 + 페이지네이션. Figma 15:12626.
export function MemberList({
  members,
  totalCount,
  page,
  totalPages,
  onPageChange,
  onEditRole,
  onEditMember,
}: MemberListProps) {
  const columns: Column<Member>[] = [
    { id: 'name', header: '이름', accessor: (m) => m.name, width: 64, align: 'center' },
    {
      id: 'role',
      header: '분류',
      width: 64,
      align: 'center',
      cell: (m) => (
        <button type="button" onClick={() => onEditRole(m)} className="text-primary underline">
          {m.role}
        </button>
      ),
    },
    { id: 'cohort', header: '기수', accessor: (m) => m.cohort, width: 64, align: 'center' },
    { id: 'part', header: '파트', accessor: (m) => m.part, width: 64, align: 'center' },
    { id: 'status', header: '가입상태', accessor: (m) => m.status, width: 64, align: 'center' },
    {
      id: 'edit',
      width: 64,
      align: 'center',
      cell: (m) => (
        <button type="button" onClick={() => onEditMember(m)} className="text-primary underline">
          수정
        </button>
      ),
    },
  ]

  return (
    <ListSection
      header={<h2 className="text-sm-22 text-black">회원 목록</h2>}
      totalCount={totalCount}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      className="rounded-8"
    >
      <DataTable columns={columns} rows={members} rowKey={(m) => m.id} ariaLabel="회원 목록" />
    </ListSection>
  )
}
