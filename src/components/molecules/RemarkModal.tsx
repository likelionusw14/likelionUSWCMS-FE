import { useEffect, useState } from 'react'
import { WindowPanel } from '@atoms'
import type { RemarkModalProps } from '@types'
import { Modal } from './Modal'

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
    <Modal open={open} onClose={onClose} panelClassName="" ariaLabel="비고">
      <WindowPanel className="w-[320px]" bodyClassName="!p-24">
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
            <button
              type="button"
              onClick={handleSubmit}
              className="flex h-32 w-[56px] items-center justify-center whitespace-nowrap rounded-8 bg-primary text-m-14 text-white"
            >
              저장
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-32 w-[56px] items-center justify-center whitespace-nowrap rounded-8 border border-primary text-m-14 text-primary"
            >
              취소
            </button>
          </div>
        </div>
      </WindowPanel>
    </Modal>
  )
}
