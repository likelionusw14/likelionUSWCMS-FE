import { useMemo, useRef } from 'react'
import { WheelPicker, WindowPanel } from '@atoms'
import { Modal } from '@molecules'
import type { TimePickerModalProps } from '@types'

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

// 시간 선택 팝업 — 시/분/오전·오후 3열 휠. Figma #741:3285.
export function TimePickerModal({ open, onClose, onConfirm, value }: TimePickerModalProps) {
  // value 변화 시 초기 인덱스 계산. 휠은 열릴 때 remount 되어 이 값으로 위치를 잡는다(열 때마다 초기화).
  const initial = useMemo(() => parseValue(value), [value])
  const hourRef = useRef(initial.hourIdx)
  const minuteRef = useRef(initial.minuteIdx)
  const apRef = useRef(initial.apIdx)

  function handleConfirm() {
    const hour12 = hourRef.current + 1 // 1~12
    const base = hour12 % 12 // 12→0
    const hour24 = apRef.current === 0 ? base : base + 12 // AM: 0~11, PM: 12~23
    const hh = String(hour24).padStart(2, '0')
    const mm = String(minuteRef.current).padStart(2, '0')
    onConfirm(`${hh}:${mm}`)
  }

  return (
    <Modal open={open} onClose={onClose} panelClassName="" ariaLabel="시간 선택">
      <WindowPanel className="w-[366px]" bodyClassName="flex flex-col items-center gap-40">
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
            <WheelPicker
              items={HOURS}
              defaultIndex={initial.hourIdx}
              onChange={(i) => {
                hourRef.current = i
              }}
              widthClass="w-[24px]"
              ariaLabel="시"
            />
            <WheelPicker
              items={MINUTES}
              defaultIndex={initial.minuteIdx}
              onChange={(i) => {
                minuteRef.current = i
              }}
              widthClass="w-[28px]"
              ariaLabel="분"
            />
            <WheelPicker
              items={MERIDIEM}
              defaultIndex={initial.apIdx}
              onChange={(i) => {
                apRef.current = i
              }}
              widthClass="w-[34px]"
              ariaLabel="오전/오후"
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
