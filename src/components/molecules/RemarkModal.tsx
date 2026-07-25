import { useEffect, useState } from 'react'
import { Button, WindowPanel } from '@atoms'
import type { RemarkModalProps } from '@types'
import { Modal } from '@molecules'

// 비고 작성 팝업 — 작은 창(WindowPanel) 안에 제목 '비고' + 단일행 입력 + 저장/취소.
// Figma "비고 작성 팝업"(671:3837): 본문 w-320·p-24·gap-8, 라벨 M/16(px-8),
// 입력 h-32 bg-background-1·border-secondary-1·rounded-8·px-16(placeholder primary/50),
// 버튼 w-56·h-32·rounded-8·M/14 (저장=primary 채움 / 취소=흰+primary 테두리), gap-10.
export function RemarkModal({ open, onClose, onSubmit, value = '' }: RemarkModalProps) {
  const [text, setText] = useState(value)

  useEffect(() => {
    if (open) setText(value)
  }, [open, value])

  function handleSubmit() {
    onSubmit(text)
    onClose()
  }

  return (
    // 폭은 Modal 패널에 건다 — Modal 의 패널 div 는 shrink-to-fit 이라 WindowPanel 쪽 w-full 만으로는 320px 이 서지 않는다.
    <Modal open={open} onClose={onClose} panelClassName="w-full max-w-[320px]" ariaLabel="비고">
      {/* 모바일(375) — 카드 320px 이 오버레이 px-24 안쪽 327px 에 그대로 들어가고, 본문 !p-24 기준 내부폭 272px 은
          Figma 1249:20441(272) 과 동일하다. 입력은 w-full, 버튼은 56+10+56=122 라 축약 없이 가로 유지. */}
      <WindowPanel className="w-full" bodyClassName="!p-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <span className="px-8 text-m-16 text-black">비고</span>
            <div className="flex h-48 flex-col">
              <input
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="비고를 적어주세요"
                className="h-32 w-full rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14 text-black placeholder:text-primary/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-center gap-[10px]">
            <Button
              size="sm"
              variant="primary"
              onClick={handleSubmit}
              className="whitespace-nowrap"
            >
              저장
            </Button>
            <Button size="sm" variant="outline" onClick={onClose} className="whitespace-nowrap">
              취소
            </Button>
          </div>
        </div>
      </WindowPanel>
    </Modal>
  )
}
