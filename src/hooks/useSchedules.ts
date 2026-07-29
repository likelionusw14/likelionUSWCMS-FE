import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createSchedule, deleteSchedule, fetchSchedules, updateSchedule } from '@api'
import type { ApiCreateScheduleRequest, ApiScheduleResponse, ApiUpdateScheduleRequest } from '@api'
import { isBackendConnected } from '@config'
import type { CalendarEvent, QueryResult, ScheduleFormValues } from '@types'

const SCHEDULES_KEY = 'admin-schedules'

// 백엔드 미연동 데모용 목데이터(현재 월 기준). 연동 시엔 fetchSchedules 응답을 사용한다.
const now = new Date()
const Y = now.getFullYear()
const M = now.getMonth() // 0-11
const day = (d: number) => `${Y}-${String(M + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
const kdt = (d: number, time: string) => `${Y}년 ${M + 1}월 ${d}일 ${time}`

// 'YYYY-MM-DD' (임의 Date). 그레이존(이웃 달 spill) 칸 예시용.
const toKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

// 이번 달 그리드(월요일 시작)에 보이는 이웃 달 spill 날짜 하나를 구한다.
const startOffset = (new Date(Y, M, 1).getDay() + 6) % 7
const daysInMonth = new Date(Y, M + 1, 0).getDate()
const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7
const spillDate =
  startOffset > 0
    ? new Date(Y, M, 1 - startOffset)
    : new Date(Y, M, 1 - startOffset + totalCells - 1)

const MOCK_SCHEDULES: CalendarEvent[] = [
  {
    id: 's1',
    date: day(3),
    title: '정기 세션',
    dateTime: kdt(3, '10:00'),
    place: '수원대학교 ACE 교육관 506호',
    description: '이번 주 정기 세션. 리액트 상태관리 실습을 진행합니다.',
  },
  {
    id: 's2',
    date: day(15),
    title: '중간 점검',
    dateTime: kdt(15, '15:00'),
    place: '동아리방',
    description: '프로젝트 중간 점검 미팅.',
  },
  {
    id: 's3',
    date: day(17),
    title: '해커톤',
    dateTime: kdt(17, '09:00'),
    place: '수원대학교 미래혁신관',
    description: '무박 2일 해커톤. 팀별 프로젝트 발표까지 이어집니다.',
  },
  {
    id: 's4',
    date: day(17),
    title: '회식',
    dateTime: kdt(17, '19:00'),
    place: '수원역 인근',
    description: '해커톤 뒤풀이 회식.',
  },
  {
    id: 's4b',
    date: day(17),
    title: '뒤풀이 정산',
    dateTime: kdt(17, '22:00'),
    place: '동아리방',
    description: '해커톤·회식 비용 정산.',
  },
  {
    id: 's5',
    date: day(24),
    title: '스터디 발표',
    dateTime: kdt(24, '19:00'),
    place: '동아리방',
    description: '주제별 스터디 발표.',
  },
  {
    // 그레이존(이웃 달 spill) 칸 예시 칩.
    id: 's6',
    date: toKey(spillDate),
    title: '이웃 달 일정',
    dateTime: `${spillDate.getFullYear()}년 ${spillDate.getMonth() + 1}월 ${spillDate.getDate()}일 12:00`,
    place: '동아리방',
    description: '이웃 달(회색 칸) 일정 예시.',
  },
]

// 폼에 기수 선택이 없어 임시 기본 기수를 사용한다. [추정] 실제 기수 선택 UI 도입 전까지의 기본값.
const DEFAULT_COHORT_ID = 1

// scheduleDate('YYYY-MM-DD') + startTime('HH:MM'|null) → 상세 팝업용 한글 dateTime.
function toDisplayDateTime(scheduleDate: string, startTime?: string | null): string {
  const [y, mo, d] = scheduleDate.split('-')
  const base = `${Number(y)}년 ${Number(mo)}월 ${Number(d)}일`
  // startTime 은 'HH:MM' 또는 'HH:MM:SS' 로 올 수 있으므로 시:분만 취한다.
  const time = startTime ? startTime.slice(0, 5) : ''
  return time ? `${base} ${time}` : base
}

// ApiScheduleResponse → CalendarEvent(화면모델).
function toCalendarEvent(response: ApiScheduleResponse): CalendarEvent {
  return {
    id: String(response.scheduleId),
    date: response.scheduleDate,
    title: response.title,
    dateTime: toDisplayDateTime(response.scheduleDate, response.startTime),
    place: response.location ?? undefined,
    description: response.description ?? undefined,
    version: response.version,
    cohortId: response.cohort?.cohortId,
  }
}

// ScheduleFormValues → CreateScheduleRequest. 폼에 기수 필드가 없어 cohortId 는 기본값 사용.
export function toCreateScheduleRequest(
  values: ScheduleFormValues,
  cohortId: number = DEFAULT_COHORT_ID,
): ApiCreateScheduleRequest {
  const hasTime = Boolean(values.time.trim())
  return {
    title: values.title.trim(),
    description: values.description.trim() || null,
    cohortId,
    scheduleDate: values.date.replace(/\./g, '-'),
    // 시간 입력이 없으면 종일 일정으로 처리한다.
    isAllDay: !hasTime,
    startTime: hasTime ? values.time : null,
    location: values.place.trim() || null,
  }
}

// ScheduleFormValues → UpdateScheduleRequest. version 은 수정 대상(editingEvent)의 값을 필수 전달.
export function toUpdateScheduleRequest(
  values: ScheduleFormValues,
  version: number,
  cohortId: number = DEFAULT_COHORT_ID,
): ApiUpdateScheduleRequest {
  const hasTime = Boolean(values.time.trim())
  return {
    version,
    title: values.title.trim(),
    description: values.description.trim() || null,
    cohortId,
    scheduleDate: values.date.replace(/\./g, '-'),
    isAllDay: !hasTime,
    startTime: hasTime ? values.time : null,
    location: values.place.trim() || null,
  }
}

// 월별 일정(캘린더 이벤트) 조회. month 는 0-11(JS Date 월 인덱스).
// 백엔드 미연동이면 현재 월 목데이터를 반환한다(데모 유지).
export function useSchedules(year: number, month: number): QueryResult<CalendarEvent[]> {
  const yearMonth = `${year}-${String(month + 1).padStart(2, '0')}`
  const request = useQuery({
    queryKey: [SCHEDULES_KEY, yearMonth],
    queryFn: () => fetchSchedules({ yearMonth }),
    enabled: isBackendConnected,
  })

  const data = request.data ? request.data.map(toCalendarEvent) : MOCK_SCHEDULES
  return { data, isLoading: isBackendConnected && request.isLoading }
}

// 일정 등록.
export function useCreateSchedule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: ApiCreateScheduleRequest) => {
      // 미연동 데모: 서버 호출 없이 성공 처리.
      if (!isBackendConnected) return
      await createSchedule(body)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SCHEDULES_KEY] }),
  })
}

// 일정 수정. version 필수(낙관적 동시성).
export function useUpdateSchedule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      scheduleId,
      body,
    }: {
      scheduleId: string
      body: ApiUpdateScheduleRequest
    }) => {
      if (!isBackendConnected) return
      await updateSchedule(scheduleId, body)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SCHEDULES_KEY] }),
  })
}

// 일정 삭제.
export function useDeleteSchedule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (scheduleId: string) => {
      if (!isBackendConnected) return
      await deleteSchedule(scheduleId)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SCHEDULES_KEY] }),
  })
}
