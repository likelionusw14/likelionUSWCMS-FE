import { useState } from 'react'
import { DatePickerModal } from '@molecules'
import { useUserSchedules } from '@hooks'
import { ScheduleCalendar } from '@organisms'

function pad2(value: number) {
  return String(value).padStart(2, '0')
}

export function UserSchedulePage() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedMonth, setSelectedMonth] = useState(
    `${now.getFullYear()}.${pad2(now.getMonth() + 1)}`,
  )
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const { data: events, isLoading } = useUserSchedules(year, month)

  function changeMonth(nextYear: number, nextMonth: number) {
    setYear(nextYear)
    setMonth(nextMonth)
    setSelectedMonth(`${nextYear}.${pad2(nextMonth + 1)}`)
  }

  function selectMonth(value: string) {
    const [nextYear, nextMonth] = value.split('.').map(Number)
    setSelectedMonth(value)
    setYear(nextYear)
    setMonth(nextMonth - 1)
  }

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-48 px-24 pb-96 pt-40 sm:gap-64 sm:px-32 sm:pt-48 lg:px-64">
      <header className="flex flex-col items-center">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-sm-22 text-black sm:text-h1">CALENDAR</h1>
        </div>
      </header>

      <div className="relative">
        <ScheduleCalendar
          year={year}
          month={month}
          events={events}
          onMonthChange={changeMonth}
          onDateSelect={() => setDatePickerOpen(true)}
          className="w-full"
        />
        {isLoading && (
          <p className="absolute right-32 top-64 text-r-14 text-gray-500">
            일정을 불러오는 중입니다.
          </p>
        )}
      </div>

      <DatePickerModal
        open={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        onConfirm={selectMonth}
        value={selectedMonth}
        granularity="month"
      />
    </div>
  )
}
