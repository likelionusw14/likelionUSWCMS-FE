import calendarNext from '@/assets/icons/calendar-next.svg'
import calendarPrev from '@/assets/icons/calendar-prev.svg'
import plusIcon from '@/assets/icons/plus.svg'
import { motion, useReducedMotion } from 'framer-motion'
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
export function Calendar({ year, month, events, onMonthChange, onRegister, onEventClick, className }: CalendarProps) {
  const grid = buildMonthGrid(year, month)
  const reduce = useReducedMotion()

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
      bodyClassName="flex flex-col gap-40 !py-40"
    >
      {/* 년월 + 등록 */}
      <div className="flex items-center justify-between">
        <span className="h-40 w-40" aria-hidden />
        <div className="flex items-center gap-16">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="이전 달"
            className="flex h-24 w-24 items-center justify-center"
          >
            <img src={calendarPrev} alt="" className="h-24 w-24" />
          </button>
          <span className="text-sm-22 text-black underline decoration-gray-500 underline-offset-4">
            {year}년 {month + 1}월
          </span>
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

      {/* 요일 + 날짜 그리드 */}
      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((weekday) => (
            <span key={weekday.label} className={cn('text-center text-sm-16', weekday.color)}>
              {weekday.label}
            </span>
          ))}
        </div>

        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.12 }}
          className="grid grid-cols-7 gap-px overflow-hidden rounded-16 border border-secondary-1 bg-secondary-1"
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
      </div>
    </WindowPanel>
  )
}
