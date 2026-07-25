import { useEffect, useMemo, useState } from 'react'
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

// Calendar + SchedulePopup 조합 — 일정 칩을 누르면 그 셀 옆에 상세 말풍선이 뜬다.
// 왼쪽 칸이면 오른쪽에(꼬리 left), 오른쪽 칸이면 왼쪽에(꼬리 right). 그리드가 overflow-hidden 이라
// 팝업은 포털(position:fixed)로 렌더해 잘리지 않게 한다.
export function ScheduleCalendar({
  year,
  month,
  events,
  onMonthChange,
  onDateSelect,
  onRegister,
  onEventEdit,
  onEventDelete,
  className,
}: ScheduleCalendarProps) {
  const [selected, setSelected] = useState<ScheduleCalendarSelected | null>(null)
  const reduce = useReducedMotion()

  function handleEventClick(event: CalendarEvent, target: HTMLElement) {
    const cell = (target.closest('[data-cell]') as HTMLElement | null) ?? target
    const cellRect = cell.getBoundingClientRect()
    const chipRect = target.getBoundingClientRect()
    // 셀 옆에 말풍선(본문 326 + 꼬리 21)이 통째로 들어가는 쪽을 고른다.
    // 화면 절반 기준으로 반대편을 먼저 시도하고, 양쪽 다 부족하면 셀 아래(꼬리 위)로 내린다.
    const need = BUBBLE_MIN_W + TAIL_W + GAP + EDGE
    const fitsRight = window.innerWidth - cellRect.right >= need
    const fitsLeft = cellRect.left >= need
    const preferRight = cellRect.left + cellRect.width / 2 < window.innerWidth / 2
    const tail: ScheduleCalendarSelected['tail'] =
      preferRight && fitsRight
        ? 'left'
        : !preferRight && fitsLeft
          ? 'right'
          : fitsRight
            ? 'left'
            : fitsLeft
              ? 'right'
              : 'top'
    setSelected({ event, cellRect, chipRect, tail })
  }

  // 배치 — 좌/우 꼬리는 셀 옆에 붙이고, 상단 꼬리는 셀 아래에서 좌우를 화면 안으로 clamp 한다.
  const placement = useMemo(() => {
    if (!selected) return null
    const { cellRect, chipRect, tail } = selected
    if (tail !== 'top') {
      return {
        style: {
          left: tail === 'left' ? cellRect.right + GAP : cellRect.left - GAP,
          top: chipRect.top + chipRect.height / 2,
          transformOrigin: tail === 'left' ? 'left center' : 'right center',
        },
        shift: { x: tail === 'left' ? 0 : '-100%', y: '-50%' },
        maxWidth: undefined,
        tailOffset: undefined,
      }
    }
    const width = Math.min(window.innerWidth - EDGE * 2, BUBBLE_MIN_W)
    const center = cellRect.left + cellRect.width / 2
    const left = Math.min(Math.max(center - width / 2, EDGE), window.innerWidth - EDGE - width)
    return {
      style: { left, top: cellRect.bottom + GAP, transformOrigin: 'top center' },
      shift: { x: 0, y: 0 },
      maxWidth: window.innerWidth - EDGE * 2,
      tailOffset: center - left,
    }
  }, [selected])

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
              initial={{ opacity: 0, scale: reduce ? 1 : 0.95, ...placement.shift }}
              animate={{ opacity: 1, scale: 1, ...placement.shift }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.95, ...placement.shift }}
              transition={{ duration: reduce ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <SchedulePopup
                event={toPopupEvent(selected.event)}
                tail={selected.tail}
                tailOffset={placement.tailOffset}
                maxWidth={placement.maxWidth}
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
