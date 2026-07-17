import { useEffect, useRef, useState } from 'react'
import { cn } from '@utils'

// 휠 치수 (Figma 302×220) — 행 40, 위/아래 스페이서 90 = (220-40)/2.
const ITEM_H = 40
const CONTAINER_H = 220
const SPACER = (CONTAINER_H - ITEM_H) / 2
const ANGLE = 20 // 항목당 회전각(deg) — 실린더 곡률
const MAX = 4 // 중앙 기준 표시 범위(그 밖은 숨김; 4×20=80° < 90°)

export interface WheelPickerProps {
  items: string[]
  defaultIndex: number
  onChange: (index: number) => void
  widthClass?: string
  ariaLabel?: string
}

// iOS 스타일 3D 휠 한 열 — 네이티브 scroll-snap(관성·스냅)에 항목별 perspective+rotateX 로 실린더 곡률.
// 스크롤 프레임은 rAF 로 DOM 을 직접 갱신(React state 미사용)해 리렌더 없이 매끄럽게 돈다.
// 정지(디바운스) 시 가장 가까운 항목을 onChange 로 알린다. 초기 위치는 defaultIndex(마운트 시 1회).
export function WheelPicker({
  items,
  defaultIndex,
  onChange,
  widthClass,
  ariaLabel,
}: WheelPickerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef<number | undefined>(undefined)
  const settleTimer = useRef<number | undefined>(undefined)
  const last = useRef(defaultIndex)
  const [active, setActive] = useState(defaultIndex)

  // 현재 스크롤 위치에 맞춰 각 항목의 3D 변형/투명도/굵기를 직접 그린다.
  function paint() {
    const el = ref.current
    if (!el) return
    const center = el.scrollTop / ITEM_H
    el.querySelectorAll<HTMLElement>('[data-wheel-item]').forEach((node, i) => {
      const dist = i - center
      const abs = Math.abs(dist)
      if (abs > MAX) {
        node.style.opacity = '0'
        node.style.fontWeight = '500'
        return
      }
      node.style.opacity = String(Math.max(0.2, 1 - abs * 0.18))
      node.style.transform = `perspective(1000px) rotateX(${dist * -ANGLE}deg)`
      node.style.fontWeight = abs < 0.5 ? '600' : '500'
    })
  }

  function handleScroll() {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(paint)
    if (settleTimer.current) window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      const el = ref.current
      if (!el) return
      const idx = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollTop / ITEM_H)))
      setActive(idx)
      if (idx !== last.current) {
        last.current = idx
        onChange(idx)
      }
    }, 110)
  }

  // 마운트(팝업 열림) 시 초기 위치로 이동 + 최초 페인트 + 초기값 통지.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = defaultIndex * ITEM_H
    last.current = defaultIndex
    setActive(defaultIndex)
    onChange(defaultIndex)
    paint()
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      if (settleTimer.current) window.clearTimeout(settleTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={ariaLabel}
      onScroll={handleScroll}
      className={cn('no-scrollbar select-none overflow-y-scroll text-center', widthClass)}
      style={{ height: CONTAINER_H, scrollbarWidth: 'none', scrollSnapType: 'y mandatory' }}
    >
      <div style={{ height: SPACER }} aria-hidden />
      {items.map((it, i) => (
        <button
          key={it}
          type="button"
          data-wheel-item
          role="option"
          aria-selected={i === active}
          onClick={() => ref.current?.scrollTo({ top: i * ITEM_H, behavior: 'smooth' })}
          className="flex w-full items-center justify-center whitespace-nowrap text-[22px] leading-none text-black [backface-visibility:hidden]"
          style={{ height: ITEM_H, scrollSnapAlign: 'center' }}
        >
          {it}
        </button>
      ))}
      <div style={{ height: SPACER }} aria-hidden />
    </div>
  )
}
