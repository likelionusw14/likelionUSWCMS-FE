import { useMemo, useRef, useState } from 'react'
import { Button, WheelPicker, WindowPanel } from '@atoms'
import { Modal, WheelDeck } from '@molecules'
import type { DatePickerModalProps } from '@types'

const YEAR_START = 2020
const YEAR_END = 2035

const years = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_START + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)

const pad2 = (n: number) => String(n).padStart(2, '0')
const clamp = (n: number, max: number) => Math.max(0, Math.min(max, n))
const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()

// 날짜 선택 팝업 — 년/월/일 3열 휠. '일정 등록/수정' · '일정(날짜) 변경'(741:3639) 공용, title 로 구분.
// 일(day) 열은 선택된 년·월의 실제 일수만큼만 생성한다(2월 31일 등 불가능한 날짜 방지).
export function DatePickerModal({
  open,
  onClose,
  onConfirm,
  value,
  title = '날짜 선택',
  granularity = 'day',
}: DatePickerModalProps) {
  // value 변화 시 초기 인덱스 계산. 휠은 열릴 때 remount 되어 이 값으로 위치를 잡는다(열 때마다 초기화).
  const initial = useMemo(() => {
    const now = new Date()
    const parts = value?.split('.').map(Number)
    const y = parts?.[0] || now.getFullYear()
    const m = parts?.[1] || now.getMonth() + 1
    const d = parts?.[2] || now.getDate()
    const maxDay = daysInMonth(y, m)
    return {
      year: clamp(y - YEAR_START, years.length - 1),
      month: clamp(m - 1, months.length - 1),
      day: clamp(d - 1, maxDay - 1),
    }
  }, [value])

  const yearRef = useRef(initial.year)
  const monthRef = useRef(initial.month)
  const dayRef = useRef(initial.day)

  // 선택된 년·월에 맞춰 일 목록을 다시 만든다. 월이 바뀌어 일수가 줄면 day 인덱스를 클램프한다.
  const [dayCount, setDayCount] = useState(() =>
    daysInMonth(years[initial.year], months[initial.month]),
  )
  const days = useMemo(() => Array.from({ length: dayCount }, (_, i) => i + 1), [dayCount])

  function refreshDays() {
    const nextCount = daysInMonth(years[yearRef.current], months[monthRef.current])
    if (nextCount !== dayCount) {
      if (dayRef.current > nextCount - 1) dayRef.current = nextCount - 1
      setDayCount(nextCount)
    }
  }

  function handleConfirm() {
    const year = years[yearRef.current]
    const month = months[monthRef.current]
    if (granularity === 'month') {
      onConfirm(`${year}.${pad2(month)}`)
      onClose()
      return
    }
    const day = days[clamp(dayRef.current, days.length - 1)]
    onConfirm(`${year}.${pad2(month)}.${pad2(day)}`)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} panelClassName="" ariaLabel={title}>
      <WindowPanel
        className="w-[408px] max-[800px]:w-[330px]"
        bodyClassName="flex flex-col items-stretch gap-40 !p-24"
      >
        <h2 className="text-left text-sm-22 text-black">{title}</h2>

        <WheelDeck className="mx-auto w-[360px] max-[800px]:w-[282px]">
          <WheelPicker
            items={years.map((y) => `${y}`)}
            defaultIndex={initial.year}
            onChange={(i) => {
              yearRef.current = i
              refreshDays()
            }}
            widthClass="w-[55px]"
            ariaLabel="년"
          />
          <WheelPicker
            items={months.map((m) => `${m}월`)}
            defaultIndex={initial.month}
            onChange={(i) => {
              monthRef.current = i
              refreshDays()
            }}
            widthClass="w-[43px]"
            ariaLabel="월"
          />
          {granularity === 'day' && (
            <WheelPicker
              key={dayCount}
              items={days.map((d) => `${d}일`)}
              defaultIndex={clamp(dayRef.current, days.length - 1)}
              onChange={(i) => {
                dayRef.current = i
              }}
              widthClass="w-[46px]"
              ariaLabel="일"
            />
          )}
        </WheelDeck>

        <div className="flex justify-center gap-16">
          <Button variant="primary" onClick={handleConfirm}>
            저장
          </Button>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
        </div>
      </WindowPanel>
    </Modal>
  )
}
