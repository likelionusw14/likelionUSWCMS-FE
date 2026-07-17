import { useEffect, useRef, useState } from 'react'
import { WindowPanel } from '@atoms'
import { Modal } from '@molecules'
import { cn } from '@utils'
import type { TimePickerModalProps } from '@types'

// 휠 치수(Figma #741:3149 시간 선택 302×220). 항목 40px, 위아래 여백 90px = (220-40)/2.
const WHEEL_H = 220
const ITEM_H = 40
const SPACER = 90

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1)) // 1~12
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')) // 00~59
const MERIDIEM = ['AM', 'PM']

// 'HH:MM'(24h) → { hourIdx(0=1시), minuteIdx, apIdx(0=AM) }. 잘못된 값이면 현재 시각.
function parseValue(value?: string) {
  const now = new Date()
  let h = now.getHours()
  let m = now.getMinutes()
  if (value) {
    const match = /^(\d{1,2}):(\d{1,2})$/.exec(value.trim())
    if (match) {
      const hh = Number(match[1])
      const mm = Number(match[2])
      if (hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59) {
        h = hh
        m = mm
      }
    }
  }
  const apIdx = h < 12 ? 0 : 1
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return { hourIdx: hour12 - 1, minuteIdx: m, apIdx }
}

// 세로 휠 한 열 — scroll-snap + 중앙 정렬. 스크롤이 멎으면 가장 가까운 항목을 선택한다.
function Wheel({
  items,
  index,
  onIndexChange,
  widthClass,
}: {
  items: string[]
  index: number
  onIndexChange: (i: number) => void
  widthClass: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const [active, setActive] = useState(index)

  // 마운트(팝업 열림) 시 초기 위치로 스크롤 + 휠을 가로채 한 번에 한 칸만 이동(네이티브 휠은 2~3칸 점프).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = index * ITEM_H
    setActive(index)

    let cooling = false
    function onWheel(event: WheelEvent) {
      event.preventDefault()
      const node = ref.current
      if (!node || cooling) return
      cooling = true
      window.setTimeout(() => {
        cooling = false
      }, 90)
      const cur = Math.max(0, Math.min(items.length - 1, Math.round(node.scrollTop / ITEM_H)))
      const next = Math.max(0, Math.min(items.length - 1, cur + (event.deltaY > 0 ? 1 : -1)))
      node.scrollTo({ top: next * ITEM_H, behavior: 'smooth' })
      setActive(next)
      if (next !== index) onIndexChange(next)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function settle(i: number, smooth: boolean) {
    const el = ref.current
    if (!el) return
    const next = Math.max(0, Math.min(items.length - 1, i))
    el.scrollTo({ top: next * ITEM_H, behavior: smooth ? 'smooth' : 'auto' })
    setActive(next)
    if (next !== index) onIndexChange(next)
  }

  function handleScroll() {
    const el = ref.current
    if (!el) return
    const next = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollTop / ITEM_H)))
    setActive(next)
    // 스크롤이 멎으면 가장 가까운 행으로 부드럽게 정렬(건너뜀 방지).
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => settle(next, true), 120)
  }

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className={cn('no-scrollbar select-none overflow-y-scroll text-center', widthClass)}
      style={{ height: WHEEL_H, scrollbarWidth: 'none' }}
    >
      <div style={{ height: SPACER }} />
      {items.map((it, i) => {
        const dist = Math.abs(i - active)
        const opacity = dist === 0 ? 1 : Math.max(0.12, 0.4 / dist)
        return (
          <button
            key={it}
            type="button"
            onClick={() => settle(i, true)}
            className={cn(
              'flex w-full items-center justify-center whitespace-nowrap text-[22px] leading-none text-black',
              dist === 0 ? 'font-semibold' : 'font-medium',
            )}
            style={{ height: ITEM_H, opacity }}
          >
            {it}
          </button>
        )
      })}
      <div style={{ height: SPACER }} />
    </div>
  )
}

// 시간 선택 팝업 — 시/분/오전·오후 3열 휠. Figma #741:3285.
export function TimePickerModal({ open, onClose, onConfirm, value }: TimePickerModalProps) {
  const [hourIdx, setHourIdx] = useState(0)
  const [minuteIdx, setMinuteIdx] = useState(0)
  const [apIdx, setApIdx] = useState(0)

  // 열릴 때마다 value 를 12시간+AM/PM 으로 변환해 초기 위치 세팅.
  useEffect(() => {
    if (!open) return
    const { hourIdx: h, minuteIdx: m, apIdx: a } = parseValue(value)
    setHourIdx(h)
    setMinuteIdx(m)
    setApIdx(a)
  }, [open, value])

  function handleConfirm() {
    const hour12 = hourIdx + 1 // 1~12
    const base = hour12 % 12 // 12→0
    const hour24 = apIdx === 0 ? base : base + 12 // AM: 0~11, PM: 12~23
    const hh = String(hour24).padStart(2, '0')
    const mm = String(minuteIdx).padStart(2, '0')
    onConfirm(`${hh}:${mm}`)
  }

  return (
    <Modal open={open} onClose={onClose} panelClassName="" ariaLabel="시간 선택">
      <WindowPanel
        className="w-[366px]"
        bodyClassName="flex flex-col items-center gap-40"
      >
        {/* 제목 (SM/22, 왼쪽) */}
        <div className="w-full">
          <span className="text-sm-22 text-black">시간 선택</span>
        </div>

        {/* 3열 휠 */}
        <div className="relative h-[220px] w-[302px] overflow-hidden rounded-8 bg-white">
          {/* 중앙 선택 밴드 230×40 */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-black/5" />
          {/* 3열 (시 24 · 분 28 · AM/PM 34, gap 32, 좌우 76) */}
          <div className="flex h-full items-center justify-center gap-32 px-[76px]">
            <Wheel items={HOURS} index={hourIdx} onIndexChange={setHourIdx} widthClass="w-[24px]" />
            <Wheel
              items={MINUTES}
              index={minuteIdx}
              onIndexChange={setMinuteIdx}
              widthClass="w-[28px]"
            />
            <Wheel
              items={MERIDIEM}
              index={apIdx}
              onIndexChange={setApIdx}
              widthClass="w-[34px]"
            />
          </div>
          {/* 위·아래 흐림 (흰 그라디언트) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[90px] bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px] bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* 저장 / 취소 */}
        <div className="flex items-center gap-16">
          <button
            type="button"
            onClick={handleConfirm}
            className="flex h-48 min-w-[128px] items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
          >
            저장
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-48 min-w-[128px] items-center justify-center rounded-8 border border-primary px-32 text-sm-18 text-primary"
          >
            취소
          </button>
        </div>
      </WindowPanel>
    </Modal>
  )
}
