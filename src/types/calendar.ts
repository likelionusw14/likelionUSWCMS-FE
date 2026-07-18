// 캘린더(월 뷰) — 일정 관리에서 재사용. presentational: 데이터는 props 로만 받는다.

// 하루에 얹히는 일정. date 는 'YYYY-MM-DD'.
export interface CalendarEvent {
  id: string
  date: string
  title: string
  // 상세 팝업(SchedulePopup)용 — 있으면 칩 클릭 시 표시. 없으면 date/빈값으로 대체.
  dateTime?: string
  place?: string
  description?: string
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
  // 월 제목 클릭. 사용자 캘린더의 날짜 선택 팝업 연결에만 사용한다.
  onDateSelect?: () => void
  // ＋ 등록.
  onRegister?: () => void
  // 일정 칩 클릭 — 클릭된 DOM(위치 계산용)과 함께 전달. ScheduleCalendar 가 이걸로 팝업을 띄운다.
  onEventClick?: (event: CalendarEvent, target: HTMLElement) => void
  className?: string
}

export interface CalendarDayProps {
  day: number
  // 현재 달 여부(이전/다음 달은 흐리게).
  inMonth?: boolean
  events: CalendarEvent[]
  // 일정 칩 클릭 — 클릭된 DOM(위치 계산용)과 함께 전달. 없으면 칩은 비클릭 텍스트.
  onEventClick?: (event: CalendarEvent, target: HTMLElement) => void
}

// Calendar + SchedulePopup 조합 — 일정 칩 클릭 시 셀 옆에 상세 말풍선을 띄운다.
export interface ScheduleCalendarProps {
  year: number
  month: number
  events: CalendarEvent[]
  onMonthChange?: (year: number, month: number) => void
  onDateSelect?: () => void
  onRegister?: () => void
  // 팝업의 수정/삭제. 없으면 읽기 전용으로 뜬다.
  onEventEdit?: (event: CalendarEvent) => void
  onEventDelete?: (event: CalendarEvent) => void
  className?: string
}

// ScheduleCalendar 내부 — 선택된 일정 칩의 위치 정보.
export interface ScheduleCalendarSelected {
  event: CalendarEvent
  // 가로 배치·꼬리 방향은 셀 기준, 세로 중심은 클릭한 칩 기준.
  cellRect: DOMRect
  chipRect: DOMRect
  tail: 'left' | 'right'
}
