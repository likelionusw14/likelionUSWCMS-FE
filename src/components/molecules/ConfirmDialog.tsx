import { Modal } from './Modal'
import type { ConfirmDialogProps } from '@types'

// 확인 팝업(삭제 등) — 96px 원형 경고 아이콘 + 제목/설명 + 취소/확인 버튼.
// Figma "삭제 팝업": 카드 padding 24/32·gap 32, 버튼 h-48·px-32·SM/18(취소=회색 border, 확인=파랑 채움).
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel={title}>
      <div className="flex flex-col items-center gap-32 px-32 py-24">
        <span
          aria-hidden
          className="flex h-96 w-96 items-center justify-center rounded-full border-2 border-error"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 12V22M20 28H20.02"
              stroke="#EF4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="flex flex-col items-center gap-8">
          <p className="text-center text-sm-20 text-black">{title}</p>
          {description && <p className="text-center text-m-14 text-black">{description}</p>}
        </div>
        <div className="flex gap-24">
          <button
            type="button"
            onClick={onClose}
            className="flex h-48 items-center justify-center rounded-8 border border-gray-500 px-32 text-sm-18 text-gray-500"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-48 items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
