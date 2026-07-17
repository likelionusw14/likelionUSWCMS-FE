import { Button } from '@atoms'
import { Modal } from '@molecules'
import type { ConfirmDialogProps } from '@types'

// 확인 팝업(삭제 등) — 96px 원형 쓰레기통 아이콘 + 제목/설명 + 취소/확인 버튼.
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
        <svg
          aria-hidden
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-error"
        >
          <rect x="1" y="1" width="94" height="94" rx="47" stroke="currentColor" strokeWidth="2" />
          <path d="M51 47V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M45 47V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M39 41V60C39 61.1046 39.8954 62 41 62H55C56.1046 62 57 61.1046 57 60V41"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M36 41H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M41 41L44 35H53L56 41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col items-center gap-8">
          <p className="text-center text-sm-20 text-black">{title}</p>
          {description && <p className="text-center text-m-14 text-black">{description}</p>}
        </div>
        <div className="flex gap-24">
          <Button variant="outline" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
