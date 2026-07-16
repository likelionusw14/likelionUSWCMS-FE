import { buildMonthGrid, cn, toDateKey } from '@utils'
import type { CalendarEvent, CalendarProps } from '@types'
import { CalendarDay } from './CalendarDay'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

// 월(month) 캘린더 — 월 이동·요일 헤더·날짜 그리드. presentational(데이터는 events prop).
export function Calendar({
  year,
  month,
  events,
  selectedDate,
  onSelectDate,
  onMonthChange,
  onRegister,
  maxVisibleEvents = 3,
  className,
}: CalendarProps) {
  const grid = buildMonthGrid(year, month)
  const todayKey = toDateKey(new Date())

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

  const label = `${year}.${String(month + 1).padStart(2, '0')}`

  return (
    <div className={cn('flex w-full flex-col gap-40', className)}>
      {/* 년월 + 등록 */}
      <div className="flex items-center justify-between">
        <span className="h-40 w-40" aria-hidden />
        <div className="flex items-center gap-16 text-sm-18 text-black">
          <button type="button" onClick={() => shift(-1)} aria-label="이전 달" className="flex h-40 w-40 items-center justify-center">
            ‹
          </button>
          <span>{label}</span>
          <button type="button" onClick={() => shift(1)} aria-label="다음 달" className="flex h-40 w-40 items-center justify-center">
            ›
          </button>
        </div>
        <button type="button" onClick={onRegister} aria-label="일정 등록" className="flex h-40 w-40 items-center justify-center text-sm-18 text-primary">
          +
        </button>
      </div>

      {/* 요일 + 날짜 그리드 */}
      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((weekday) => (
            <span key={weekday} className="text-center text-m-14 text-gray-500">
              {weekday}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-[1px] overflow-hidden rounded-16 border border-secondary-1 bg-secondary-1">
          {grid.map(({ date, inMonth }) => {
            const key = toDateKey(date)
            return (
              <CalendarDay
                key={key}
                day={date.getDate()}
                inMonth={inMonth}
                isToday={key === todayKey}
                isSelected={key === selectedDate}
                events={byDate.get(key) ?? []}
                maxVisibleEvents={maxVisibleEvents}
                onClick={onSelectDate ? () => onSelectDate(key) : undefined}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
