import type { MonthDay } from '@types'

// 날짜 → 'YYYY-MM-DD' 키. 일정 매칭·선택·오늘 비교에 쓴다(로컬 타임존 기준).
export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

// 'YYYY-MM' 월 키 (조회 파라미터 yearMonth 형식). month 는 0-11(JS Date 월 인덱스).
export function toYearMonth(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

// 달력 한 화면에 걸치는 달들(이전·현재·다음).
// 그리드가 앞뒤 달 날짜로 채워지므로(buildMonthGrid) 그 칸의 일정도 함께 받아야
// 그레이존이 빈 채로 남지 않는다. 달을 넘길 때 이미 받아둔 데이터라 깜빡임도 없다.
export function getVisibleMonths(year: number, month: number): { year: number; month: number }[] {
  return [-1, 0, 1].map((offset) => {
    const date = new Date(year, month + offset, 1)
    return { year: date.getFullYear(), month: date.getMonth() }
  })
}

// 월(month) 그리드 생성 — 월요일 시작, 필요한 주 수(5 또는 6)만큼.
// 그 달 1일의 요일만큼 앞을 이전 달로 채우고, 마지막 주까지 다음 달로 마저 채운다.
export function buildMonthGrid(year: number, month: number): MonthDay[] {
  // 월요일 시작(디자인 요일 순서 월~일). getDay(): 일=0→6, 월=1→0 … 토=6→5.
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7
  const cells: MonthDay[] = []
  for (let i = 0; i < totalCells; i++) {
    const date = new Date(year, month, 1 - startOffset + i)
    cells.push({ date, inMonth: date.getMonth() === month })
  }
  return cells
}
