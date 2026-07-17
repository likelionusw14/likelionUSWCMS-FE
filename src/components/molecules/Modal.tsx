import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@utils'
import type { ModalProps } from '@types'

// 열려 있는 모달 스택 — 중첩 시 최상위 모달만 ESC 를 처리하도록 순서를 추적한다.
const modalStack: symbol[] = []

// 포커스 가능한 요소 셀렉터 (Tab 순환 가드용).
const FOCUSABLE =
  'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex]:not([tabindex="-1"])'

// 공용 모달 셸 — 반투명 오버레이 + 중앙 카드. body 포털로 렌더한다.
// dismissable(기본 true)이면 ESC·바깥클릭으로 닫힌다. 열린 동안 body 스크롤을 잠근다.
// 중첩 모달에서 ESC 는 최상위 하나만 닫고(모달 스택), 열릴 때 패널로 포커스를 옮겨 트리거로 복원한다.
export function Modal({
  open,
  onClose,
  children,
  dismissable = true,
  ariaLabel,
  panelClassName = 'rounded-8 bg-white',
}: ModalProps) {
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  // 모달 스택 등록 — 열려 있는 동안 고유 토큰을 스택에 올리고, 닫히면 제거한다.
  const idRef = useRef<symbol>(Symbol('modal'))
  useEffect(() => {
    if (!open) return
    const id = idRef.current
    modalStack.push(id)
    return () => {
      const index = modalStack.indexOf(id)
      if (index !== -1) modalStack.splice(index, 1)
    }
  }, [open])

  // ESC + Tab 순환 가드 — 최상위 모달만 반응한다.
  useEffect(() => {
    if (!open) return
    const id = idRef.current

    function handleKeyDown(event: KeyboardEvent) {
      if (modalStack[modalStack.length - 1] !== id) return

      if (event.key === 'Escape' && dismissable) {
        onClose()
        return
      }
      if (event.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return
        const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
        if (focusables.length === 0) {
          event.preventDefault()
          return
        }
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, dismissable, onClose])

  // body 스크롤 잠금.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // 열릴 때 패널로 포커스 이동, 닫힐 때 직전 활성 요소로 복원.
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE)
    ;(firstFocusable ?? panel)?.focus()
    return () => previouslyFocused?.focus?.()
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
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            className={cn('outline-none', panelClassName)}
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
