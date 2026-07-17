import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COHORT_OPTIONS, PART_OPTIONS } from '@constants'
import { useMembers, usePendingMembers, usePagination } from '@hooks'
import { MemberEditModal, ResultDialog, RoleEditModal } from '@molecules'
import { MemberList, PendingMemberList } from '@organisms'
import type { Member } from '@types'


// 회원 관리 — 승인대기 목록(승인/취소) + 회원 목록(권한 수정·회원정보 수정). Figma 15:11837.
export function MemberPage() {
  const navigate = useNavigate()
  const { data: members } = useMembers()
  const { data: pending } = usePendingMembers()
  const [editMember, setEditMember] = useState<Member | null>(null)
  const [roleMember, setRoleMember] = useState<Member | null>(null)
  const [deleteDoneOpen, setDeleteDoneOpen] = useState(false)

  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: members.length,
    pageSize: 20,
  })

  const visible = slice(members)

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
        onDelete={() => {
          setEditMember(null)
          setDeleteDoneOpen(true)
        }}
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
      <ResultDialog
        open={deleteDoneOpen}
        onConfirm={() => {
          setDeleteDoneOpen(false)
          navigate('/admin/members')
        }}
        title="삭제 완료"
        description="삭제처리가 완료되었습니다."
        confirmLabel="회원 관리로 이동"
      />
    </>
  )
}
