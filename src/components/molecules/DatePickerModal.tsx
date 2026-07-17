import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from '@molecules'
import { WindowPanel } from '@atoms'
import { cn } from '@utils'
import type { DatePickerModalProps } from '@types'

// 휠 치수 (Figma 741:3144 / TimePickerModal 과 공통) — 행 40, 뷰포트 220, 위/아래 스페이서 90.
const ITEM_H = 40
const CONTAINER_H = 220
const SPACER = 90

const YEAR_START = 2020
const YEAR_END = 2035

const years = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_START + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = Array.from({ length: 31 }, (_, i) => i + 1)

const pad2 = (n: number) => String(n).padStart(2, '0')
const clamp = (n: number, max: number) => Math.max(0, Math.min(max, n))

// 3열 휠 — 세로 스크롤 스냅. 중앙에 온 값이 선택값이며 거리별로 흐려진다.
function Wheel({
  items,
  initialIndex,
  onSettle,
  width,
}: {
  items: string[]
  initialIndex: number
  onSettle: (index: number) => void
  width: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<number | undefined>(undefined)
  const [active, setActive] = useState(initialIndex)

  // 마운트 시: 초기 위치로 스크롤 + 휠 이벤트를 가로채 한 번에 한 칸만 이동(네이티브 휠은 2~3칸 점프).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = initialIndex * ITEM_H
    onSettle(initialIndex)

    let cooling = false
    function onWheel(event: WheelEvent) {
      event.preventDefault()
      const node = ref.current
      if (!node || cooling) return
      cooling = true
      window.setTimeout(() => {
        cooling = false
      }, 90)
      const cur = clamp(Math.round(node.scrollTop / ITEM_H), items.length - 1)
      const next = clamp(cur + (event.deltaY > 0 ? 1 : -1), items.length - 1)
      node.scrollTo({ top: next * ITEM_H, behavior: 'smooth' })
      setActive(next)
      onSettle(next)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function settle(index: number, smooth: boolean) {
    const el = ref.current
    if (!el) return
    const next = clamp(index, items.length - 1)
    el.scrollTo({ top: next * ITEM_H, behavior: smooth ? 'smooth' : 'auto' })
    setActive(next)
    onSettle(next)
  }

  function handleScroll() {
    const el = ref.current
    if (!el) return
    const next = clamp(Math.round(el.scrollTop / ITEM_H), items.length - 1)
    setActive(next)
    // 스크롤이 멈추면 가장 가까운 행으로 부드럽게 정렬(건너뜀 방지).
    clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => settle(next, true), 120)
  }

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className={cn('no-scrollbar select-none overflow-y-scroll text-center', width)}
      style={{ height: CONTAINER_H, scrollbarWidth: 'none' }}
    >
      <div style={{ height: SPACER }} />
      {items.map((label, i) => {
        const dist = Math.abs(i - active)
        const opacity = dist === 0 ? 1 : Math.max(0.12, 0.4 / dist)
        return (
          <button
            type="button"
            key={label}
            onClick={() => settle(i, true)}
            className={cn(
              'flex w-full items-center justify-center whitespace-nowrap text-[22px] text-black',
              dist === 0 ? 'font-semibold' : 'font-medium',
            )}
            style={{ height: ITEM_H, opacity }}
          >
            {label}
          </button>
        )
      })}
      <div style={{ height: SPACER }} />
    </div>
  )
}

// 날짜 선택 팝업 — 년/월/일 3열 휠. '일정 등록/수정' · '일정(날짜) 변경'(741:3639) 공용, title 로 구분.
export function DatePickerModal({
  open,
  onClose,
  onConfirm,
  value,
  title = '날짜 선택',
}: DatePickerModalProps) {
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
      <WindowPanel
        className="w-[408px]"
        bodyClassName="flex flex-col items-stretch gap-40 !p-24"
      >
        <h2 className="text-left text-sm-22 text-black">{title}</h2>

        <div className="relative mx-auto w-[360px]">
          {/* 중앙 선택 밴드 (Figma 741:3139 · 300×40) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-40 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-black/5"
            aria-hidden
          />
          <div className="relative z-10 flex justify-center gap-32">
            <Wheel
              items={years.map((y) => `${y}`)}
              initialIndex={initial.year}
              onSettle={(i) => (yearRef.current = i)}
              width="w-[55px]"
            />
            <Wheel
              items={months.map((m) => `${m}월`)}
              initialIndex={initial.month}
              onSettle={(i) => (monthRef.current = i)}
              width="w-[43px]"
            />
            <Wheel
              items={days.map((d) => `${d}일`)}
              initialIndex={initial.day}
              onSettle={(i) => (dayRef.current = i)}
              width="w-[46px]"
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
