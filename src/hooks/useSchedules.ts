import type { CalendarEvent } from '@types'

// 백엔드 연동 전 목데이터. 연동 시 이 훅 안에서 apiClient(월 단위 조회 + 인접 달 prefetch)로 교체한다
// (컴포넌트는 { data, isLoading } 모양에만 의존한다).
const now = new Date()
const Y = now.getFullYear()
const M = now.getMonth() // 0-11
const day = (d: number) => `${Y}-${String(M + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
const kdt = (d: number, time: string) => `${Y}년 ${M + 1}월 ${d}일 ${time}`

// 'YYYY-MM-DD' (임의 Date). 그레이존(이웃 달 spill) 칸 예시용.
const toKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

// 이번 달 그리드(월요일 시작)에 보이는 이웃 달 spill 날짜 하나를 구한다.
// 1일이 월요일이 아니면 앞쪽(이전 달) spill 칸이, 월요일이면 뒤쪽(다음 달) spill 칸이 존재한다.
const startOffset = (new Date(Y, M, 1).getDay() + 6) % 7
const daysInMonth = new Date(Y, M + 1, 0).getDate()
const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7
const spillDate =
  startOffset > 0 ? new Date(Y, M, 1 - startOffset) : new Date(Y, M, 1 - startOffset + totalCells - 1)

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

// 일정(캘린더 이벤트) 목록 조회.
export function useSchedules(): { data: CalendarEvent[]; isLoading: boolean } {
  return { data: MOCK_SCHEDULES, isLoading: false }
}
