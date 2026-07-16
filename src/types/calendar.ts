import type { ReactNode } from 'react'

// 캘린더(월 뷰) — 일정 관리·출결 관리에서 재사용. presentational: 데이터는 props 로만 받는다.

// 하루에 얹히는 일정. date 는 'YYYY-MM-DD'.
export interface CalendarEvent {
  id: string
  date: string
  title: string
  // 칩 배경색. 생략 시 primary.
  color?: string
}

// 월 그리드 한 칸.
export interface MonthDay {
  date: Date
  // 현재 보는 달에 속하는 날짜인지(이전/다음 달 spill 은 false).
  inMonth: boolean
}

export interface CalendarProps {
  year: number
  // 0-11 (JS Date 월 인덱스).
  month: number
  events: CalendarEvent[]
  // 선택된 날짜 'YYYY-MM-DD'.
  selectedDate?: string
  onSelectDate?: (date: string) => void
  // ◀ ▶ 월 이동.
  onMonthChange?: (year: number, month: number) => void
  // ＋ 등록.
  onRegister?: () => void
  // 셀에 보일 최대 일정 수(초과분은 +N).
  maxVisibleEvents?: number
  className?: string
}

export interface CalendarDayProps {
  day: number
  inMonth?: boolean
  isToday?: boolean
  isSelected?: boolean
  events: CalendarEvent[]
  maxVisibleEvents?: number
  onClick?: () => void
  // 셀 내용 커스텀(출결 등 재사용). 있으면 기본 일정 칩 대신 렌더.
  renderContent?: () => ReactNode
}
