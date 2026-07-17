import { cn } from '@utils'
import type { ApprovalActionsProps } from '@types'

// 승인/취소 버튼 쌍 (승인대기 목록 행 액션 등). Figma 1000:1550.
// 승인 = primary 배경·흰 글자, 취소 = secondary-1 테두리·primary 글자. 둘 다 px-12 py-4 rounded-8 M/14.
export function ApprovalActions({ onApprove, onCancel, disabled, className }: ApprovalActionsProps) {
  return (
    <div className={cn('flex items-center gap-8', className)}>
      <button
        type="button"
        onClick={onApprove}
        disabled={disabled}
        className="flex items-center justify-center rounded-8 bg-primary px-12 py-4 text-m-14 text-white disabled:opacity-50"
      >
        승인
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={disabled}
        className="flex items-center justify-center rounded-8 border border-secondary-1 px-12 py-4 text-m-14 text-primary disabled:opacity-50"
      >
        취소
      </button>
    </div>
  )
}
