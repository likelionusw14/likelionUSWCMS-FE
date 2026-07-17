import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@utils'
import type { ModalProps } from '@types'

// 공용 모달 셸 — 반투명 오버레이 + 중앙 카드. body 포털로 렌더한다.
// dismissable(기본 true)이면 ESC·바깥클릭으로 닫힌다. 열린 동안 body 스크롤을 잠근다.
export function Modal({
  open,
  onClose,
  children,
  dismissable = true,
  ariaLabel,
  panelClassName = 'rounded-8 bg-white',
}: ModalProps) {
  useEffect(() => {
    if (!open || !dismissable) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, dismissable, onClose])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-24"
      onClick={dismissable ? onClose : undefined}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={cn(panelClassName)}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
