import { useState } from 'react'
import { COHORT_OPTIONS, PART_OPTIONS } from '@constants'
import { useMembers, usePendingMembers } from '@hooks'
import { MemberEditModal, RoleEditModal } from '@molecules'
import { MemberList, PendingMemberList } from '@organisms'
import type { Member } from '@types'

const PAGE_SIZE = 20

// 사자(회원) 관리 — 승인대기 목록(승인/취소) + 회원 목록(권한 수정·회원정보 수정). Figma 15:11837.
export function MemberPage() {
  const { data: members } = useMembers()
  const { data: pending } = usePendingMembers()
  const [page, setPage] = useState(1)
  const [editMember, setEditMember] = useState<Member | null>(null)
  const [roleMember, setRoleMember] = useState<Member | null>(null)

  const totalPages = Math.max(1, Math.ceil(members.length / PAGE_SIZE))
  const visible = members.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <PendingMemberList
          members={pending}
          totalCount={pending.length}
          onApprove={() => {}}
          onReject={() => {}}
        />
        <MemberList
          members={visible}
          totalCount={members.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onEditRole={setRoleMember}
          onEditMember={setEditMember}
        />
      </div>

      <MemberEditModal
        open={!!editMember}
        onClose={() => setEditMember(null)}
        onSubmit={() => setEditMember(null)}
        onDelete={() => setEditMember(null)}
        initialValues={
          editMember
            ? { name: editMember.name, cohort: editMember.cohort, part: editMember.part }
            : undefined
        }
        cohortOptions={COHORT_OPTIONS}
        partOptions={PART_OPTIONS}
      />
      <RoleEditModal
        open={!!roleMember}
        onClose={() => setRoleMember(null)}
        onSubmit={() => setRoleMember(null)}
        value={roleMember?.role}
      />
    </>
  )
}
