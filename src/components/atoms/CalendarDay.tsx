import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@utils'
import type { CalendarDayProps } from '@types'

// 캘린더 한 칸 — 날짜 숫자 + 일정 칩(세로 스택).
// Figma 실측(캘린더 일 131.7×119.6 ≈ 11:10): 폭은 그리드 열이 채우고 높이는 aspect-ratio 로
// 비율을 유지한 채 가변한다. 일정이 넘치면 이벤트 영역이 셀 안에서 스크롤(스크롤바 미표시)되고,
// 넘치는 방향(위/아래)만 페이드된다. 이웃 달 칸은 60% 흐리게.
export function CalendarDay({
  day,
  inMonth = true,
  events,
  onEventClick,
  responsiveVariant,
}: CalendarDayProps) {
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
      data-cell
      className={cn(
        'flex aspect-[11/10] w-full flex-col gap-8 overflow-hidden bg-white p-8',
        responsiveVariant === 'user' &&
          'max-[1023px]:gap-[2px] max-[1023px]:p-4 max-[639px]:min-h-[80px] max-[639px]:aspect-auto max-[639px]:p-8',
        !inMonth && 'opacity-60',
      )}
    >
      <span
        className={cn(
          'shrink-0 text-m-14 text-black',
          responsiveVariant === 'user' && 'max-[1023px]:text-r-12 max-[1023px]:leading-none',
        )}
      >
        {day}
      </span>
      <div
        ref={scrollRef}
        className={cn(
          'no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto',
          responsiveVariant === 'user' &&
            'max-[1023px]:gap-[2px] max-[375px]:hidden',
          fadeClass,
        )}
      >
        {events.map((event) => {
          const chipClass = cn(
            'w-full shrink-0 truncate rounded-8 bg-primary px-8 py-4 text-left text-r-14 text-white',
            responsiveVariant === 'user' &&
              'max-[1023px]:px-[clamp(2px,0.8vw,8px)] max-[1023px]:py-[clamp(1px,0.2vw,2px)] max-[1023px]:text-[clamp(8px,1.4vw,14px)] max-[1023px]:leading-none',
          )
          return onEventClick ? (
            <button
              key={event.id}
              type="button"
              onClick={(domEvent) => onEventClick(event, domEvent.currentTarget)}
              className={cn(chipClass, 'cursor-pointer transition hover:brightness-110 active:brightness-95')}
            >
              {event.title}
            </button>
          ) : (
            <span key={event.id} className={chipClass}>
              {event.title}
            </span>
          )
        })}
      </div>
      {responsiveVariant === 'user' && events.length > 0 && (
        <div className="hidden min-h-0 w-full flex-1 flex-col items-start gap-8 max-[375px]:flex">
          {events.map((event) =>
            onEventClick ? (
              <button
                key={event.id}
                type="button"
                aria-label={event.title}
                onClick={(domEvent) => onEventClick(event, domEvent.currentTarget)}
                className="h-8 w-8 shrink-0 rounded-full bg-primary"
              />
            ) : (
              <span
                key={event.id}
                aria-label={event.title}
                className="h-8 w-8 shrink-0 rounded-full bg-primary"
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}
