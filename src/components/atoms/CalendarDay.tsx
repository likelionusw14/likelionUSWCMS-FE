import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@utils'
import type { CalendarDayProps } from '@types'

// 캘린더 한 칸 — 날짜 숫자 + 일정(세로 스택).
// Figma 실측 셀 높이는 375=78 / 500 이상=132. 높이를 고정해야 일정이 넘칠 때 셀 안에서
// 스크롤되고 scroll-fade-*(mask-image 그래디언트)가 걸린다 — min-height 로 두면 칸이 계속 늘어나
// 넘침 자체가 없어져 그래디언트가 사라진다. aspect-ratio 는 폭에 끌려가 800=88 / 1280=122 로 어긋난다.
// 일정은 640 이상에서 칩, 미만에서 8x8 점으로 보이지만 같은 스크롤 목록 하나를 쓴다 —
// 목록을 브레이크포인트별로 나누면 모바일 쪽에 mask-image 페이드(scroll-fade-*)가 걸리지 않는다.
// 넘치면 넘치는 방향(위/아래)만 페이드된다. 이웃 달 칸은 60% 흐리게.
export function CalendarDay({ day, inMonth = true, events, onEventClick }: CalendarDayProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [fade, setFade] = useState({ top: false, bottom: false })

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const compute = () =>
      setFade({
        top: el.scrollTop > 0,
        bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 1,
      })
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
        'flex h-[78px] w-full flex-col gap-8 overflow-hidden bg-white p-8 min-[500px]:h-[132px]',
        'max-[1023px]:gap-[2px]',
        !inMonth && 'opacity-60',
      )}
    >
      <span
        className={cn(
          'shrink-0 text-m-14 text-black',
          'max-[1023px]:text-r-12 max-[1023px]:leading-none',
        )}
      >
        {day}
      </span>
      <div
        ref={scrollRef}
        className={cn(
          'no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto',
          'max-[1023px]:gap-[2px] max-[639px]:gap-8',
          fadeClass,
        )}
      >
        {events.map((event) => {
          const chipClass = cn(
            'w-full shrink-0 truncate rounded-8 bg-primary px-8 py-4 text-left text-r-14 text-white',
            'max-[1023px]:px-[clamp(2px,0.8vw,8px)] max-[1023px]:py-[clamp(1px,0.2vw,2px)] max-[1023px]:text-[clamp(8px,1.4vw,14px)] max-[1023px]:leading-none',
            // 375 시안: 일정이 8x8 점으로 줄고 간격 8 (점 y=33·49·65·81 → pitch 16).
            'max-[639px]:h-8 max-[639px]:w-8 max-[639px]:rounded-full max-[639px]:p-0 max-[639px]:text-[0px]',
          )
          return onEventClick ? (
            <button
              key={event.id}
              type="button"
              onClick={(domEvent) => onEventClick(event, domEvent.currentTarget)}
              className={cn(
                chipClass,
                'cursor-pointer transition hover:brightness-110 active:brightness-95',
              )}
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
    </div>
  )
}
