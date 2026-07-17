import { ApprovalActions } from '@atoms'
import type { PendingMemberListProps } from '@types'

const ROW = 'flex w-full items-center justify-between border-b border-secondary-1 px-32 py-8'
const CELL = 'w-[106px] shrink-0 text-center'

// 승인대기 목록 — 이름·기수·파트 + 승인/취소(ApprovalActions). Figma 248:5421.
export function PendingMemberList({
  members,
  totalCount,
  onApprove,
  onReject,
}: PendingMemberListProps) {
  return (
    <section className="flex w-full flex-col gap-24 rounded-8 bg-white px-32 py-24">
      <h2 className="text-sm-22 text-black">승인대기 목록</h2>
      <p className="text-m-14 text-black">총 {totalCount}건</p>
      <div className="flex w-full flex-col">
        <div className={`${ROW} h-32 border-t text-m-14 text-primary`}>
          <span className={CELL}>이름</span>
          <span className={CELL}>기수</span>
          <span className={CELL}>파트</span>
          <span className={CELL}>승인대기</span>
        </div>
        {members.map((member) => (
          <div key={member.id} className={`${ROW} h-40 text-m-14 text-black`}>
            <span className={CELL}>{member.name}</span>
            <span className={CELL}>{member.cohort}</span>
            <span className={CELL}>{member.part}</span>
            <span className="flex shrink-0 justify-center">
              <ApprovalActions
                onApprove={() => onApprove(member.id)}
                onCancel={() => onReject(member.id)}
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
