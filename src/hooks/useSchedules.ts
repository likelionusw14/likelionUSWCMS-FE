import type { CalendarEvent } from '@types'

// 백엔드 연동 전 목데이터. 연동 시 이 훅 안에서 apiClient(월 단위 조회 + 인접 달 prefetch)로 교체한다
// (컴포넌트는 { data, isLoading } 모양에만 의존한다).
const now = new Date()
const Y = now.getFullYear()
const M = now.getMonth() // 0-11
const day = (d: number) => `${Y}-${String(M + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
const kdt = (d: number, time: string) => `${Y}년 ${M + 1}월 ${d}일 ${time}`

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
    id: 's5',
    date: day(24),
    title: '스터디 발표',
    dateTime: kdt(24, '19:00'),
    place: '동아리방',
    description: '주제별 스터디 발표.',
  },
]

// 일정(캘린더 이벤트) 목록 조회.
export function useSchedules(): { data: CalendarEvent[]; isLoading: boolean } {
  return { data: MOCK_SCHEDULES, isLoading: false }
}
