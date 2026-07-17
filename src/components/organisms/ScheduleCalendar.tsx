import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Calendar, SchedulePopup } from '@molecules'
import type { CalendarEvent, ScheduleCalendarProps, SchedulePopupEvent } from '@types'

type Selected = {
  event: CalendarEvent
  // 가로 배치·꼬리 방향은 셀 기준, 세로 중심은 클릭한 칩 기준.
  cellRect: DOMRect
  chipRect: DOMRect
  tail: 'left' | 'right'
}

const GAP = 8

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
  onRegister,
  onEventEdit,
  onEventDelete,
  className,
}: ScheduleCalendarProps) {
  const [selected, setSelected] = useState<Selected | null>(null)
  const reduce = useReducedMotion()

  function handleEventClick(event: CalendarEvent, target: HTMLElement) {
    const cell = (target.closest('[data-cell]') as HTMLElement | null) ?? target
    const cellRect = cell.getBoundingClientRect()
    const chipRect = target.getBoundingClientRect()
    const tail: 'left' | 'right' =
      cellRect.left + cellRect.width / 2 < window.innerWidth / 2 ? 'left' : 'right'
    setSelected({ event, cellRect, chipRect, tail })
  }

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
        onRegister={onRegister}
        onEventClick={handleEventClick}
        className={className}
      />
      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.event.id}
              data-schedule-popup
              className="fixed z-50"
              style={{
                left:
                  selected.tail === 'left'
                    ? selected.cellRect.right + GAP
                    : selected.cellRect.left - GAP,
                top: selected.chipRect.top + selected.chipRect.height / 2,
                transformOrigin: selected.tail === 'left' ? 'left center' : 'right center',
              }}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.95, x: selected.tail === 'left' ? 0 : '-100%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: selected.tail === 'left' ? 0 : '-100%', y: '-50%' }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.95, x: selected.tail === 'left' ? 0 : '-100%', y: '-50%' }}
              transition={{ duration: reduce ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <SchedulePopup
                event={toPopupEvent(selected.event)}
                tail={selected.tail}
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
