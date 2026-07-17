import { Modal } from '@molecules'
import type { ResultDialogProps } from '@types'

// 결과 팝업(삭제완료 등) — 제목/설명 + 단일 확인 버튼. 버튼으로만 닫힌다(바깥클릭·ESC 무시).
// Figma "삭제완료 팝업": 카드 padding 32/40·gap 16, 버튼 h-48·px-32·SM/18(파랑 채움).
export function ResultDialog({ open, onConfirm, title, description, confirmLabel }: ResultDialogProps) {
  return (
    <Modal open={open} onClose={onConfirm} dismissable={false} ariaLabel={title}>
      <div className="flex flex-col items-center gap-16 px-40 py-32">
        <div className="flex flex-col items-center gap-8">
          <p className="text-center text-sm-20 text-black">{title}</p>
          {description && <p className="text-center text-m-14 text-black">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onConfirm}
          className="flex h-48 min-w-[128px] items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
