// 캘린더(월 뷰) — 일정 관리에서 재사용. presentational: 데이터는 props 로만 받는다.

// 하루에 얹히는 일정. date 는 'YYYY-MM-DD'.
export interface CalendarEvent {
  id: string
  date: string
  title: string
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
  // 그 달에 표시할 일정('YYYY-MM-DD'로 각 칸에 매칭). Calendar 는 presentational —
  // fetch/캐시 없음. 데이터 로딩은 페이지/훅(useSchedules)에서 처리한다.
  //
  // [데이터 로딩 설계 메모 — 백엔드 연동 시 페이지/훅에서 구현]
  //  · 보이는 그리드는 이전 달 말 ~ 다음 달 초(spillover)를 포함하므로, 그 달만이 아니라
  //    인접 달(이전·현재·다음)을 함께 조회해야 spillover 칸이 일관되게 채워진다.
  //  · TanStack Query: 월 단위 queryKey(['schedules', year, month]) + 인접 달 prefetch
  //    + staleTime 캐시 → 월 이동 시 직전 데이터 즉시 사용(로딩 지연 없음).
  //  · 훅은 { data: CalendarEvent[], isLoading } 계약 유지 → 이 events 로 그대로 전달.
  events: CalendarEvent[]
  onMonthChange?: (year: number, month: number) => void
  // ＋ 등록.
  onRegister?: () => void
  className?: string
}

export interface CalendarDayProps {
  day: number
  // 현재 달 여부(이전/다음 달은 흐리게).
  inMonth?: boolean
  events: CalendarEvent[]
}
