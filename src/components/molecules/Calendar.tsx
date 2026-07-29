import { useLayoutEffect, useRef, useState } from 'react'
import calendarNext from '@/assets/icons/calendar-next.svg'
import calendarPrev from '@/assets/icons/calendar-prev.svg'
import plusIcon from '@/assets/icons/plus.svg'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDay, WindowPanel } from '@atoms'
import { buildMonthGrid, toDateKey } from '@utils'
import { cn } from '@utils'
import type { CalendarEvent, CalendarProps } from '@types'

// 월요일 시작, 토=파랑(info)·일=빨강(error)·평일=회색(gray-500).
const WEEKDAYS = [
  { label: '월', color: 'text-gray-500' },
  { label: '화', color: 'text-gray-500' },
  { label: '수', color: 'text-gray-500' },
  { label: '목', color: 'text-gray-500' },
  { label: '금', color: 'text-gray-500' },
  { label: '토', color: 'text-info' },
  { label: '일', color: 'text-error' },
]

// 월(month) 캘린더 — 창(WindowPanel: primary 헤더바 h-40 + 엠보 흰 본문) + 월 네비 + 요일 + 날짜 그리드.
// presentational: 데이터는 events prop 으로만 받는다. 창 크롬은 WindowPanel 아톰을 재사용한다.
export function Calendar({
  year,
  month,
  events,
  onMonthChange,
  onDateSelect,
  onRegister,
  onEventClick,
  mobileTitleLeft = false,
  className,
}: CalendarProps) {
  const grid = buildMonthGrid(year, month)
  const reduce = useReducedMotion()
  const rows = grid.length / 7

  // 현재 달 그리드의 실제 높이를 측정해 컨테이너 높이 애니메이션 목표로 삼는다.
  // 셀이 aspect-ratio 로 가변폭이라 픽셀을 직접 못 구하므로 렌더 후 측정한다.
  // rows(줄 수)가 바뀔 때마다 재측정 → 5↔6주 전환 시 마지막 줄이 부드럽게 늘고 준다.
  const activeGridRef = useRef<HTMLDivElement>(null)
  const isFirstMeasureRef = useRef(true)
  const [gridHeight, setGridHeight] = useState<number | undefined>(undefined)
  useLayoutEffect(() => {
    const el = activeGridRef.current
    if (!el) return
    const measure = () => setGridHeight(el.getBoundingClientRect().height)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [year, month, rows])

  // 날짜별 일정 묶기.
  const byDate = new Map<string, CalendarEvent[]>()
  for (const event of events) {
    const list = byDate.get(event.date) ?? []
    list.push(event)
    byDate.set(event.date, list)
  }

  // 월 이동 — Date 생성자가 12월↔1월 롤오버를 처리한다.
  function shift(delta: number) {
    const moved = new Date(year, month + delta, 1)
    onMonthChange?.(moved.getFullYear(), moved.getMonth())
  }

  return (
    <WindowPanel
      className={className}
      headerClassName="h-40"
      bodyClassName="flex flex-col gap-40 !px-32 !py-40"
    >
      {/* 년월 + 등록 - 시안의 좌측 '빈칸' 40 은 년월을 행 가운데로 미는 균형추다.
          관리자 일정(1203:12588·13894)만 375·500 에서 hidden="true" 라 년월이 좌측(x=0)으로 붙고,
          사용자·게스트(1181:10150·10997)는 모든 폭에서 가운데다(375 에서도 년월 x=52, 행 가운데). */}
      <div className="flex items-center justify-between">
        <span className={cn('h-40 w-40', mobileTitleLeft && 'max-[500px]:hidden')} aria-hidden />
        <div className="flex items-center gap-16">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="이전 달"
            className="flex h-24 w-24 items-center justify-center"
          >
            <img src={calendarPrev} alt="" className="h-24 w-24" />
          </button>
          {onDateSelect ? (
            <button
              type="button"
              onClick={onDateSelect}
              className="whitespace-nowrap text-sm-22 text-black underline decoration-gray-500 underline-offset-4"
              aria-label="날짜 선택"
            >
              {year}년 {month + 1}월
            </button>
          ) : (
            <span className="whitespace-nowrap text-sm-22 text-black underline decoration-gray-500 underline-offset-4">
              {year}년 {month + 1}월
            </span>
          )}
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="다음 달"
            className="flex h-24 w-24 items-center justify-center"
          >
            <img src={calendarNext} alt="" className="h-24 w-24" />
          </button>
        </div>
        {onRegister ? (
          <button
            type="button"
            onClick={onRegister}
            aria-label="일정 등록"
            className="flex h-40 w-40 items-center justify-center"
          >
            <img src={plusIcon} alt="" className="h-16 w-16" />
          </button>
        ) : (
          <span className="h-40 w-40" aria-hidden />
        )}
      </div>

      {/* 요일 + 날짜 그리드 — 시안(563:8586)의 달력 박스에는 테두리가 없다.
          선은 그리드(563:8602: bg·border 모두 secondary-1, radius 16)에만 걸려 있어
          바깥 선과 셀 사이 1px 선이 이어지고 격자가 박스에 딱 맞는다.
          시안 박스의 패딩 8 은 제거해 그리드가 년월 행과 같은 폭을 쓴다. */}
      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((weekday) => (
            <span key={weekday.label} className={cn('text-center text-sm-16', weekday.color)}>
              {weekday.label}
            </span>
          ))}
        </div>

        {/* 월 전환 — 크로스페이드(이전 흐려짐 + 새 진해짐 동시).
            줄 수가 다른 달(5↔6주)로 넘어갈 때 컨테이너 높이를 애니메이트해
            추가/제거되는 마지막 줄만 자연스럽게 늘었다 줄었다 하게 한다. */}
        <motion.div
          className="relative overflow-hidden"
          initial={false}
          animate={{ height: gridHeight ?? 'auto' }}
          transition={{
            duration: reduce || isFirstMeasureRef.current ? 0 : 0.35,
            ease: 'easeInOut',
          }}
          onAnimationComplete={() => {
            isFirstMeasureRef.current = false
          }}
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={`${year}-${month}`}
              ref={activeGridRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-0 grid grid-cols-7 gap-px overflow-hidden rounded-16 border border-secondary-1 bg-secondary-1"
            >
              {grid.map(({ date, inMonth }) => {
                const key = toDateKey(date)
                return (
                  <CalendarDay
                    key={key}
                    day={date.getDate()}
                    inMonth={inMonth}
                    events={byDate.get(key) ?? []}
                    onEventClick={onEventClick}
                  />
                )
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </WindowPanel>
  )
}
