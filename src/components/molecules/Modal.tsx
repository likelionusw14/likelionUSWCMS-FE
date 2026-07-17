import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@utils'
import type { ModalProps } from '@types'

// 공용 모달 셸 — 반투명 오버레이 + 중앙 카드. body 포털로 렌더한다.
// dismissable(기본 true)이면 ESC·바깥클릭으로 닫힌다. 열린 동안 body 스크롤을 잠근다.
// 등장/퇴장: 오버레이 페이드 + 카드 페이드·스케일(아래→제자리). prefers-reduced-motion 이면 페이드만.
export function Modal({
  open,
  onClose,
  children,
  dismissable = true,
  ariaLabel,
  panelClassName = 'rounded-8 bg-white',
}: ModalProps) {
  const reduce = useReducedMotion()

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

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-24"
          onClick={dismissable ? onClose : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={cn(panelClassName)}
            onClick={(event) => event.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
