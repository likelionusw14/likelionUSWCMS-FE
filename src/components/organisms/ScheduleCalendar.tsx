import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Calendar, SchedulePopup } from '@molecules'
import type {
  CalendarEvent,
  ScheduleCalendarProps,
  ScheduleCalendarSelected,
  SchedulePopupEvent,
} from '@types'

const GAP = 8
const EDGE = 24 // 화면 좌우 최소 여백
const BUBBLE_MIN_W = 326 // 말풍선 본문 최소 폭 (SchedulePopup 과 동일)
const TAIL_W = 21 // 좌/우 꼬리 폭
// 측정 전 첫 배치용 추정 높이(버튼 있는 최소 260 + 꼬리 21). 실제 값은 onMeasure 로 곧바로 교정된다.
const POPUP_EST_H = 281

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), Math.max(lo, hi))

// CalendarEvent(칩) → SchedulePopupEvent(상세). 상세 필드가 없으면 날짜/빈값으로 대체.
function toPopupEvent(event: CalendarEvent): SchedulePopupEvent {
  return {
    id: event.id,
    title: event.title,
    dateTime: event.dateTime ?? event.date,
    place: event.place ?? '',
    description: event.description ?? '',
  }
}

// Calendar + SchedulePopup 조합 — 일정 칩을 누르면 그 칩 옆에 상세 말풍선이 뜬다.
// 꼬리는 항상 클릭한 칩을 겨눈다. 그리드가 overflow-hidden 이라 팝업은 포털(position:fixed)로
// 렌더해 잘리지 않게 한다.
export function ScheduleCalendar({
  year,
  month,
  events,
  onMonthChange,
  onDateSelect,
  onRegister,
  onEventEdit,
  onEventDelete,
  mobileTitleLeft = false,
  className,
}: ScheduleCalendarProps) {
  const [selected, setSelected] = useState<ScheduleCalendarSelected | null>(null)
  // 팝업의 실제 크기(꼬리 포함). 측정 전에는 추정값으로 배치하고 첫 레이아웃에서 교정한다(페인트 전).
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)
  const reduce = useReducedMotion()

  const handleMeasure = useCallback((next: { width: number; height: number }) => {
    setSize((prev) =>
      prev && prev.width === next.width && prev.height === next.height ? prev : next,
    )
  }, [])

  function handleEventClick(event: CalendarEvent, target: HTMLElement) {
    // 내용이 달라지면 크기도 달라진다 — 이전 측정값을 물고 배치하지 않도록 버린다.
    setSize(null)
    setSelected({ event, chipRect: target.getBoundingClientRect() })
  }

  // 배치 — 칩 옆에 말풍선(본문 326 + 꼬리 21)이 통째로 들어가면 그 쪽에 붙이고(꼬리 좌/우),
  // 양쪽 다 부족하면 칩 아래(꼬리 위)에, 아래도 모자라고 위가 넉넉하면 칩 위(꼬리 아래)로 뒤집는다.
  const placement = useMemo(() => {
    if (!selected) return null
    const { chipRect } = selected
    const vw = window.innerWidth
    const vh = window.innerHeight
    const popW = size?.width ?? BUBBLE_MIN_W + TAIL_W
    const popH = size?.height ?? POPUP_EST_H

    // 화면 절반 기준으로 반대편을 먼저 시도한다.
    const need = BUBBLE_MIN_W + TAIL_W + GAP + EDGE
    const fitsRight = vw - chipRect.right >= need
    const fitsLeft = chipRect.left >= need
    const preferRight = chipRect.left + chipRect.width / 2 < vw / 2
    const side: 'left' | 'right' | null =
      preferRight && fitsRight
        ? 'left'
        : !preferRight && fitsLeft
          ? 'right'
          : fitsRight
            ? 'left'
            : fitsLeft
              ? 'right'
              : null

    if (side) {
      // 세로는 칩 중앙에 맞추되 화면 안으로 clamp 하고, 꼬리는 offset 으로 칩을 계속 가리킨다.
      const anchorY = chipRect.top + chipRect.height / 2
      const top = clamp(anchorY - popH / 2, EDGE, vh - EDGE - popH)
      return {
        tail: side,
        style: {
          left: side === 'left' ? chipRect.right + GAP : chipRect.left - GAP - popW,
          top,
          transformOrigin: side === 'left' ? 'left center' : 'right center',
        },
        // 긴 제목으로 본문이 늘어나도 화면을 넘지 않도록 그 쪽에 실제로 남은 폭까지만.
        maxWidth: side === 'left' ? vw - EDGE - (chipRect.right + GAP) : chipRect.left - GAP - EDGE,
        tailOffset: anchorY - top,
      }
    }

    const flipUp = chipRect.bottom + GAP + popH > vh - EDGE && chipRect.top - GAP - popH >= EDGE
    const maxWidth = vw - EDGE * 2
    const width = Math.min(maxWidth, popW)
    const anchorX = chipRect.left + chipRect.width / 2
    const left = clamp(anchorX - width / 2, EDGE, vw - EDGE - width)
    return {
      tail: flipUp ? ('bottom' as const) : ('top' as const),
      style: {
        left,
        top: flipUp ? chipRect.top - GAP - popH : chipRect.bottom + GAP,
        transformOrigin: flipUp ? 'bottom center' : 'top center',
      },
      maxWidth,
      tailOffset: anchorX - left,
    }
  }, [selected, size])

  // 닫기 — 바깥 클릭 / Esc / 스크롤·리사이즈(fixed 위치가 어긋나므로).
  useEffect(() => {
    if (!selected) return
    const close = () => setSelected(null)
    function onPointerDown(domEvent: MouseEvent) {
      const el = domEvent.target as HTMLElement
      if (el.closest('[data-schedule-popup]') || el.closest('[data-cell] button')) return
      close()
    }
    function onKeyDown(domEvent: KeyboardEvent) {
      if (domEvent.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [selected])

  return (
    <>
      <Calendar
        year={year}
        month={month}
        events={events}
        onMonthChange={onMonthChange}
        onDateSelect={onDateSelect}
        onRegister={onRegister}
        onEventClick={handleEventClick}
        mobileTitleLeft={mobileTitleLeft}
        className={className}
      />
      {createPortal(
        <AnimatePresence>
          {selected && placement && (
            <motion.div
              key={selected.event.id}
              data-schedule-popup
              className="fixed z-50"
              style={placement.style}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
              transition={{ duration: reduce ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <SchedulePopup
                event={toPopupEvent(selected.event)}
                tail={placement.tail}
                tailOffset={placement.tailOffset}
                maxWidth={placement.maxWidth}
                onMeasure={handleMeasure}
                onEdit={
                  onEventEdit
                    ? () => {
                        onEventEdit(selected.event)
                        setSelected(null)
                      }
                    : undefined
                }
                onDelete={
                  onEventDelete
                    ? () => {
                        onEventDelete(selected.event)
                        setSelected(null)
                      }
                    : undefined
                }
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
