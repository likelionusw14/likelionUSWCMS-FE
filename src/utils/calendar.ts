import type { MonthDay } from '@types'

// 날짜 → 'YYYY-MM-DD' 키. 일정 매칭·선택·오늘 비교에 쓴다(로컬 타임존 기준).
export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
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
