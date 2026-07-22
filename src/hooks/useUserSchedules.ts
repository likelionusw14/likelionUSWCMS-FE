import { useQuery } from '@tanstack/react-query'
import { fetchUserSchedules } from '@api'
import type { ApiScheduleResponse } from '@api'
import { isBackendConnected } from '@config'
import type { CalendarEvent } from '@types'

function pad2(value: number) {
  return String(value).padStart(2, '0')
}

function toYearMonth(year: number, month: number) {
  return `${year}-${pad2(month + 1)}`
}

function getVisibleMonths(year: number, month: number) {
  return [-1, 0, 1].map((offset) => {
    const date = new Date(year, month + offset, 1)
    return { year: date.getFullYear(), month: date.getMonth() }
  })
}

function formatDateTime(schedule: ApiScheduleResponse) {
  const [year, month, day] = schedule.scheduleDate.split('-').map(Number)
  const date = `${year}년 ${month}월 ${day}일`
  if (schedule.isAllDay) return `${date} 종일`
  return schedule.startTime ? `${date} ${schedule.startTime.slice(0, 5)}` : date
}

function toCalendarEvent(schedule: ApiScheduleResponse): CalendarEvent {
  return {
    id: String(schedule.scheduleId),
    date: schedule.scheduleDate,
    title: schedule.title,
    dateTime: formatDateTime(schedule),
    place: schedule.location ?? '',
    description: schedule.description ?? '',
  }
}

function createMockSchedules(year: number, month: number): ApiScheduleResponse[] {
  const yearMonth = toYearMonth(year, month)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = [2, 4, 6, 7, 8, 11, 13, 14, 15, 16, 18, 19, 20, 21, 25, 30].filter(
    (day) => day <= daysInMonth,
  )

  return days.flatMap((day, index) => {
    const count = day === 15 || day === 19 ? 2 : 1
    return Array.from({ length: count }, (_, eventIndex) => {
      const scheduleId = index * 10 + eventIndex + 1
      return {
        scheduleId,
        title: eventIndex === 0 ? `정기 일정 ${scheduleId}` : `추가 일정 ${scheduleId}`,
        description:
          '멋쟁이사자처럼 활동 일정입니다. 자세한 내용과 준비사항을 확인해 주세요.',
        cohort: { cohortId: 14, number: 14, name: '14기' },
        scheduleDate: `${yearMonth}-${pad2(day)}`,
        isAllDay: false,
        startTime: eventIndex === 0 ? '10:00:00' : '15:00:00',
        location: '수원대학교 ACE 교육관 506호',
        version: 0,
        createdAt: `${yearMonth}-${pad2(day)}T00:00:00Z`,
        updatedAt: `${yearMonth}-${pad2(day)}T00:00:00Z`,
      }
    })
  })
}

export function useUserSchedules(
  year: number,
  month: number,
): { data: CalendarEvent[]; isLoading: boolean } {
  const yearMonth = toYearMonth(year, month)
  const visibleMonths = getVisibleMonths(year, month)
  const request = useQuery({
    queryKey: ['user-schedules', 'calendar', yearMonth],
    queryFn: async () => {
      const responses = await Promise.all(
        visibleMonths.map(({ year: visibleYear, month: visibleMonth }) =>
          fetchUserSchedules(toYearMonth(visibleYear, visibleMonth)),
        ),
      )
      return responses.flat()
    },
    enabled: isBackendConnected,
  })
  const response =
    request.data ??
    visibleMonths.flatMap(({ year: visibleYear, month: visibleMonth }) =>
      createMockSchedules(visibleYear, visibleMonth),
    )

  return {
    data: response.map(toCalendarEvent),
    isLoading: isBackendConnected && request.isLoading,
  }
}
