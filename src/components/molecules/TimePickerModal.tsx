import { useMemo, useRef } from 'react'
import { Button, WheelPicker, WindowPanel } from '@atoms'
import { Modal, WheelDeck } from '@molecules'
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
    <Modal
      open={open}
      onClose={onClose}
      panelClassName="w-full max-w-[366px]"
      ariaLabel="시간 선택"
    >
      <WindowPanel className="w-full" bodyClassName="flex flex-col items-center gap-40">
        {/* 제목 (SM/22, 왼쪽) — 블록 h2 로 둔다. div+inline span 은 부모 폰트 스트럿 때문에 줄상자가 2px 커진다. */}
        <h2 className="w-full text-sm-22 text-black">시간 선택</h2>

        {/* 3열 휠 (시 · 분 · AM/PM). 밴드 폭 230, 컨테이너 302 */}
        <WheelDeck
          className="h-[220px] w-full max-w-[302px] overflow-hidden rounded-8 bg-white"
          bandClassName="w-full max-w-[230px]"
        >
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
        </WheelDeck>

        {/* 저장 / 취소 */}
        <div className="flex items-center gap-16">
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
