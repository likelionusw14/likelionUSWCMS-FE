import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@utils'
import type { CalendarDayProps } from '@types'

// 캘린더 한 칸 — 날짜 숫자 + 일정 칩(세로 스택).
// Figma 실측: 셀 높이 120px 고정(폭은 그리드 열이 채움). 일정이 넘치면 이벤트 영역이 셀 안에서
// 스크롤(스크롤바 미표시)되고, 넘치는 방향(위/아래)만 페이드된다. 이웃 달 칸은 60% 흐리게.
export function CalendarDay({ day, inMonth = true, events }: CalendarDayProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
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
      className={cn(
        'flex h-[120px] w-full flex-col gap-8 overflow-hidden bg-white p-8',
        !inMonth && 'opacity-60',
      )}
    >
      <span className="shrink-0 text-m-14 text-black">{day}</span>
      <div
        ref={scrollRef}
        className={cn('no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto', fadeClass)}
      >
        {events.map((event) => (
          <span
            key={event.id}
            className="w-full shrink-0 truncate rounded-8 bg-primary px-8 py-4 text-r-14 text-white"
          >
            {event.title}
          </span>
        ))}
      </div>
    </div>
  )
}
