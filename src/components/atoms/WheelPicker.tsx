import { useEffect, useRef } from 'react'
import { cn } from '@utils'

// 휠 치수 (Figma 302×220) — 행 40, 위/아래 스페이서 90 = (220-40)/2.
const ITEM_H = 40
const CONTAINER_H = 220
const SPACER = (CONTAINER_H - ITEM_H) / 2
const ANGLE = 20 // 항목당 회전각(deg) — 실린더 곡률
const MAX = 4 // 중앙 기준 표시 범위(그 밖은 숨김; 4×20=80° < 90°)
const STEP = 40 // 휠 delta 누적 임계 — 노치당 1칸
const DUR = 120 // 센터링 트윈 시간(ms)

export interface WheelPickerProps {
  items: string[]
  defaultIndex: number
  onChange: (index: number) => void
  widthClass?: string
  ariaLabel?: string
}

// iOS 스타일 3D 휠 한 열 — 항목별 perspective+rotateX 로 실린더 곡률.
// 데스크톱 휠: 노치당 1칸(관성 없는 짧은 트윈). 모바일 터치: 자유 스크롤 → 멈추면 가까운 항목으로 센터링.
// CSS scroll-snap 미사용 — mandatory 스냅의 정착 애니메이션이 모바일에서 다음 터치를 씹는 문제를 피하고,
// 대신 '취소 가능한 JS 트윈'으로 센터링한다(터치 시작 시 즉시 취소 → 씹힘 없음).
// 스크롤/센터링 중 React 리렌더가 없도록 DOM 을 직접 갱신(노드 캐시)해 메인스레드 부담을 줄인다.
export function WheelPicker({
  items,
  defaultIndex,
  onChange,
  widthClass,
  ariaLabel,
}: WheelPickerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const nodes = useRef<HTMLElement[]>([])
  const raf = useRef<number | undefined>(undefined)
  const anim = useRef<number | undefined>(undefined)
  const settleTimer = useRef<number | undefined>(undefined)
  const last = useRef(defaultIndex)
  const target = useRef(defaultIndex)
  const acc = useRef(0)

  const clampIdx = (i: number) => Math.max(0, Math.min(items.length - 1, i))

  // 현재 스크롤 위치에 맞춰 각 항목의 3D 변형/투명도/굵기/선택표시를 직접 그린다(리렌더 없음).
  function paint() {
    const el = ref.current
    if (!el) return
    const center = el.scrollTop / ITEM_H
    const sel = Math.round(center)
    nodes.current.forEach((node, i) => {
      const dist = i - center
      const abs = Math.abs(dist)
      if (abs > MAX) {
        node.style.opacity = '0'
        node.style.fontWeight = '500'
      } else {
        node.style.opacity = String(Math.max(0.2, 1 - abs * 0.18))
        node.style.transform = `perspective(1000px) rotateX(${dist * -ANGLE}deg)`
        node.style.fontWeight = abs < 0.5 ? '600' : '500'
      }
      node.setAttribute('aria-selected', String(i === sel))
    })
  }

  // 짧고 고정된 트윈(관성 없는 detent). 새 트윈/터치가 오면 취소된다.
  function animateTo(top: number) {
    const el = ref.current
    if (!el) return
    if (anim.current) cancelAnimationFrame(anim.current)
    const from = el.scrollTop
    const dist = top - from
    if (Math.abs(dist) < 1) {
      el.scrollTop = top
      return
    }
    const start = performance.now()
    function frame(now: number) {
      const node = ref.current
      if (!node) return
      const p = Math.min(1, (now - start) / DUR)
      node.scrollTop = from + dist * (1 - Math.pow(1 - p, 3))
      if (p < 1) anim.current = requestAnimationFrame(frame)
    }
    anim.current = requestAnimationFrame(frame)
  }

  function notify(idx: number) {
    target.current = idx
    if (idx !== last.current) {
      last.current = idx
      onChange(idx)
    }
  }

  function handleScroll() {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(paint)
    if (settleTimer.current) window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      const el = ref.current
      if (!el) return
      const idx = clampIdx(Math.round(el.scrollTop / ITEM_H))
      notify(idx)
      // 터치 후 가까운 항목으로 센터링(휠/클릭은 이미 정렬돼 no-op).
      animateTo(idx * ITEM_H)
    }, 90)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    nodes.current = Array.from(el.querySelectorAll<HTMLElement>('[data-wheel-item]'))
    el.scrollTop = defaultIndex * ITEM_H
    last.current = defaultIndex
    target.current = defaultIndex
    onChange(defaultIndex)
    paint()

    // 데스크톱 휠: 노치당 1칸(트랙패드는 누적)만 목표 항목으로 트윈.
    function onWheel(event: WheelEvent) {
      if (!ref.current) return
      event.preventDefault()
      acc.current += event.deltaY
      if (Math.abs(acc.current) < STEP) return
      acc.current = 0
      target.current = clampIdx(target.current + (event.deltaY > 0 ? 1 : -1))
      animateTo(target.current * ITEM_H)
    }
    // 새 터치가 시작되면 진행 중 센터링 트윈을 즉시 멈춘다(터치 씹힘 방지).
    function cancelAnim() {
      if (anim.current) cancelAnimationFrame(anim.current)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', cancelAnim, { passive: true })
    el.addEventListener('pointerdown', cancelAnim, { passive: true })

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', cancelAnim)
      el.removeEventListener('pointerdown', cancelAnim)
      if (raf.current) cancelAnimationFrame(raf.current)
      if (anim.current) cancelAnimationFrame(anim.current)
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
      style={{ height: CONTAINER_H, scrollbarWidth: 'none' }}
    >
      <div style={{ height: SPACER }} aria-hidden />
      {items.map((it, i) => (
        <button
          key={it}
          type="button"
          data-wheel-item
          role="option"
          onClick={() => {
            target.current = i
            animateTo(i * ITEM_H)
          }}
          className="flex w-full items-center justify-center whitespace-nowrap text-[22px] leading-none text-black [backface-visibility:hidden]"
          style={{ height: ITEM_H }}
        >
          {it}
        </button>
      ))}
      <div style={{ height: SPACER }} aria-hidden />
    </div>
  )
}
