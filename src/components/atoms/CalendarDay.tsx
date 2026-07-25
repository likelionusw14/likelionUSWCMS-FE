import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@utils'
import type { CalendarDayProps } from '@types'

// 캘린더 한 칸 — 날짜 숫자 + 일정(세로 스택).
// Figma 실측 셀 높이는 375=78 / 376 이상=132(500·800·1280 프레임이 모두 132). 높이를 고정해야 일정이 넘칠 때 셀 안에서
// 스크롤되고 scroll-fade-*(mask-image 그래디언트)가 걸린다 — min-height 로 두면 칸이 계속 늘어나
// 넘침 자체가 없어져 그래디언트가 사라진다. aspect-ratio 는 폭에 끌려가 800=88 / 1280=122 로 어긋난다.
// 일정은 376 이상에서 칩, 375 이하에서 8x8 점으로 보이지만 같은 스크롤 목록 하나를 쓴다 —
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
        // 셀 패딩 8 · 날짜와 일정 사이 8 — 시안은 375/800/1280 모두 같다.
        'flex h-[78px] w-full flex-col gap-8 overflow-hidden bg-white p-8 min-[376px]:h-[132px]',
        !inMonth && 'opacity-60',
      )}
    >
      {/* 날짜 숫자 — 시안 17px 높이(14px 글자)로 폭에 상관없이 동일하다. */}
      <span className="shrink-0 text-m-14 text-black">{day}</span>
      <div
        ref={scrollRef}
        className={cn(
          'no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto',
          fadeClass,
        )}
      >
        {events.map((event) => {
          const chipClass = cn(
            // 칩은 시안상 800·1280 이 동일하다 — 높이 25(px-8 py-4 + 17px 글자), 칩 간격 8.
            // 종전 max-[1023px] clamp 가 태블릿에서 py 를 1~2px 로 눌러 칩이 납작해져 있었다.
            'w-full shrink-0 truncate rounded-8 bg-primary px-8 py-4 text-left text-r-14 text-white',
            // 375 프레임만 8x8 점 + 간격 8 (점 y=33·49·65·81 → pitch 16, 1203:13520~13523).
            // 500 프레임(1203:13924)은 132px 셀에 칩이 그대로라 점 전환은 375 이하에서만 건다.
            'max-[375px]:h-8 max-[375px]:w-8 max-[375px]:rounded-full max-[375px]:p-0 max-[375px]:text-[0px]',
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
