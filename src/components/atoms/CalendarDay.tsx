import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@utils'
import type { CalendarDayProps } from '@types'

// 캘린더 한 칸 — 날짜 숫자 + 일정 칩(세로 스택).
// Figma 실측(캘린더 일 131.7×119.6 ≈ 11:10): 폭은 그리드 열이 채우고 높이는 aspect-ratio 로
// 비율을 유지한 채 가변한다. 일정이 넘치면 이벤트 영역이 셀 안에서 스크롤(스크롤바 미표시)되고,
// 넘치는 방향(위/아래)만 페이드된다. 이웃 달 칸은 60% 흐리게.
export function CalendarDay({ day, inMonth = true, events, onEventClick }: CalendarDayProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [fade, setFade] = useState({ top: false, bottom: false })

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const compute = () =>
      setFade({ top: el.scrollTop > 0, bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 1 })
    compute()
    el.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      el.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [events])

  const fadeClass =
    fade.top && fade.bottom
      ? 'scroll-fade-y'
      : fade.top
        ? 'scroll-fade-top'
        : fade.bottom
          ? 'scroll-fade-bottom'
          : ''

  return (
    <div
      data-cell
      className={cn(
        'flex aspect-[11/10] w-full flex-col gap-8 overflow-hidden bg-white p-8',
        !inMonth && 'opacity-60',
      )}
    >
      <span className="shrink-0 text-m-14 text-black">{day}</span>
      <div
        ref={scrollRef}
        className={cn('no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto', fadeClass)}
      >
        {events.map((event) => {
          const chipClass =
            'w-full shrink-0 truncate rounded-8 bg-primary px-8 py-4 text-left text-r-14 text-white'
          return onEventClick ? (
            <motion.button
              key={event.id}
              type="button"
              onClick={(domEvent) => onEventClick(event, domEvent.currentTarget)}
              className={cn(chipClass, 'origin-center cursor-pointer')}
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
            >
              {event.title}
            </motion.button>
          ) : (
            <span key={event.id} className={chipClass}>
              {event.title}
            </span>
          )
        })}
      </div>
    </div>
  )
}
