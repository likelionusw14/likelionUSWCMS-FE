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
  // 첫 포커스 요소가 아니라 패널(tabIndex=-1)에 준다 - 프로그램 포커스는 Chromium 이 :focus-visible 로 처리해
  // 열자마자 첫 버튼에 UA 기본 검은 아웃라인이 그려진다(시안에 없는 테두리). 패널은 아웃라인이 없고
  // aria-modal + aria-label 로 다이얼로그가 그대로 읽히며, Tab 가드가 있어 포커스는 패널 안에서만 돈다.
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()
    return () => previouslyFocused?.focus?.()
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/40"
          onClick={dismissable ? onClose : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
        >
          {/* 오버레이가 스크롤을 갖고, 가운데 정렬은 안쪽 래퍼가 맡는다.
              오버레이에 직접 items-center 를 걸면 내용이 화면보다 길 때 위쪽이 잘려 나가고
              body 스크롤도 잠겨 있어 접근 자체가 불가능해진다(375x600 일정 작성에서 위아래 12px 손실).
              min-h-full + py-24 라 짧은 모달은 그대로 가운데, 긴 모달은 여백을 두고 스크롤된다.
              좌우 여백 16 — Figma 모바일 팝업은 375 화면에서 320~336px 이라 여백이 19.5~27.5px 다.
              px-24(=327px 상한)로 잡으면 336 짜리 팝업이 9px 좁아지므로, 최소 여백만 16 으로 두고
              실제 폭은 각 모달이 panelClassName 에 시안 값으로 건다:
              w-full max-w-[모바일 시안]px sm:max-w-[데스크탑 시안]px. */}
          <div className="flex min-h-full items-center justify-center px-16 py-24">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
