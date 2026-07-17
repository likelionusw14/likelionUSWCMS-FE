import { useMemo, useRef } from 'react'
import { WheelPicker, WindowPanel } from '@atoms'
import { Modal } from '@molecules'
import type { DatePickerModalProps } from '@types'

const YEAR_START = 2020
const YEAR_END = 2035

const years = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_START + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = Array.from({ length: 31 }, (_, i) => i + 1)

const pad2 = (n: number) => String(n).padStart(2, '0')
const clamp = (n: number, max: number) => Math.max(0, Math.min(max, n))

// 날짜 선택 팝업 — 년/월/일 3열 휠. '일정 등록/수정' · '일정(날짜) 변경'(741:3639) 공용, title 로 구분.
export function DatePickerModal({
  open,
  onClose,
  onConfirm,
  value,
  title = '날짜 선택',
}: DatePickerModalProps) {
  // value 변화 시 초기 인덱스 계산. 휠은 열릴 때 remount 되어 이 값으로 위치를 잡는다(열 때마다 초기화).
  const initial = useMemo(() => {
    const now = new Date()
    const parts = value?.split('.').map(Number)
    const y = parts?.[0] || now.getFullYear()
    const m = parts?.[1] || now.getMonth() + 1
    const d = parts?.[2] || now.getDate()
    return {
      year: clamp(y - YEAR_START, years.length - 1),
      month: clamp(m - 1, months.length - 1),
      day: clamp(d - 1, days.length - 1),
    }
  }, [value])

  const yearRef = useRef(initial.year)
  const monthRef = useRef(initial.month)
  const dayRef = useRef(initial.day)

  function handleConfirm() {
    const year = years[yearRef.current]
    const month = months[monthRef.current]
    const day = days[dayRef.current]
    onConfirm(`${year}.${pad2(month)}.${pad2(day)}`)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} panelClassName="" ariaLabel={title}>
      <WindowPanel className="w-[408px]" bodyClassName="flex flex-col items-stretch gap-40 !p-24">
        <h2 className="text-left text-sm-22 text-black">{title}</h2>

        <div className="relative mx-auto w-[360px] touch-pan-y">
          {/* 중앙 선택 밴드 (Figma 741:3139 · 300×40) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-40 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-black/5"
            aria-hidden
          />
          <div className="relative z-10 flex touch-pan-y justify-center gap-32">
            <WheelPicker
              items={years.map((y) => `${y}`)}
              defaultIndex={initial.year}
              onChange={(i) => {
                yearRef.current = i
              }}
              widthClass="w-[55px]"
              ariaLabel="년"
            />
            <WheelPicker
              items={months.map((m) => `${m}월`)}
              defaultIndex={initial.month}
              onChange={(i) => {
                monthRef.current = i
              }}
              widthClass="w-[43px]"
              ariaLabel="월"
            />
            <WheelPicker
              items={days.map((d) => `${d}일`)}
              defaultIndex={initial.day}
              onChange={(i) => {
                dayRef.current = i
              }}
              widthClass="w-[46px]"
              ariaLabel="일"
            />
          </div>
          {/* 위/아래 페이드 마스크 — 중앙 외 행을 흐리게 (스크롤 방해 없음) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[90px] bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[90px] bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="flex justify-center gap-16">
          <button
            type="button"
            onClick={handleConfirm}
            className="h-48 min-w-[128px] rounded-8 bg-primary px-32 text-sm-18 text-white"
          >
            저장
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-48 min-w-[128px] rounded-8 border border-primary bg-white px-32 text-sm-18 text-primary"
          >
            취소
          </button>
        </div>
      </WindowPanel>
    </Modal>
  )
}
