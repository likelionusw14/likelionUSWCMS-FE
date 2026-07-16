import { cn } from '@utils'
import type { CalendarDayProps } from '@types'

// 캘린더 한 칸 — 날짜 숫자 + 일정 칩(세로 스택). 초과분은 +N.
export function CalendarDay({
  day,
  inMonth = true,
  isToday = false,
  isSelected = false,
  events,
  maxVisibleEvents = 3,
  onClick,
  renderContent,
}: CalendarDayProps) {
  const visible = events.slice(0, maxVisibleEvents)
  const overflow = events.length - visible.length

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex min-h-[112px] w-full flex-col gap-8 bg-white p-8 text-left', !inMonth && 'bg-white/60')}
    >
      <span
        className={cn(
          'text-m-14',
          isSelected
            ? 'flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white'
            : isToday
              ? 'text-primary'
              : inMonth
                ? 'text-black'
                : 'text-gray-300',
        )}
      >
        {day}
      </span>

      {renderContent ? (
        renderContent()
      ) : (
        <span className="flex w-full flex-col gap-8">
          {visible.map((event) => (
            <span
              key={event.id}
              className={cn('w-full truncate rounded-8 px-8 py-4 text-r-14 text-white', !event.color && 'bg-primary')}
              style={event.color ? { backgroundColor: event.color } : undefined}
            >
              {event.title}
            </span>
          ))}
          {overflow > 0 && <span className="px-8 text-r-14 text-gray-500">+{overflow}</span>}
        </span>
      )}
    </button>
  )
}
