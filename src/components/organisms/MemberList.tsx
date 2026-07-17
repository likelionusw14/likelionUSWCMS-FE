import { Pagination } from '@molecules'
import type { MemberListProps } from '@types'

const ROW = 'flex w-full items-center justify-between border-b border-secondary-1 px-32 py-8'
const CELL = 'w-64 shrink-0 text-center'
const NAME_CELL = 'w-64 shrink-0 truncate text-center'

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
  return (
    <section className="flex w-full flex-col gap-24 rounded-8 bg-white px-32 py-24">
      <h2 className="text-sm-22 text-black">회원 목록</h2>
      <p className="text-m-14 text-black">
        총 {totalCount}건 ({page}/{totalPages} page)
      </p>
      <div className="flex w-full flex-col">
        <div className={`${ROW} h-32 border-t text-m-14 text-primary`}>
          <span className={CELL}>이름</span>
          <span className={CELL}>분류</span>
          <span className={CELL}>기수</span>
          <span className={CELL}>파트</span>
          <span className={CELL}>가입상태</span>
          <span className={CELL} />
        </div>
        {members.map((member) => (
          <div key={member.id} className={`${ROW} h-40 text-m-14 text-black`}>
            <span className={NAME_CELL}>{member.name}</span>
            <button
              type="button"
              onClick={() => onEditRole(member)}
              className={`${CELL} text-primary underline`}
            >
              {member.role}
            </button>
            <span className={CELL}>{member.cohort}</span>
            <span className={CELL}>{member.part}</span>
            <span className={CELL}>{member.status}</span>
            <button
              type="button"
              onClick={() => onEditMember(member)}
              className={`${CELL} text-primary underline`}
            >
              수정
            </button>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  )
}
