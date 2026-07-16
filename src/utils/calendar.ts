import type { MonthDay } from '@types'

// 날짜 → 'YYYY-MM-DD' 키. 일정 매칭·선택·오늘 비교에 쓴다(로컬 타임존 기준).
export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

// 월(month) 그리드 생성 — 일요일 시작, 6주(42칸) 고정.
// 그 달 1일의 요일만큼 앞을 이전 달로 채우고, 42칸을 다음 달로 마저 채운다.
export function buildMonthGrid(year: number, month: number): MonthDay[] {
  const startOffset = new Date(year, month, 1).getDay() // 0=일 … 6=토
  const cells: MonthDay[] = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(year, month, 1 - startOffset + i)
    cells.push({ date, inMonth: date.getMonth() === month })
  }
  return cells
}
