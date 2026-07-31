import { useEffect, useState } from 'react'
import { Button, WindowPanel } from '@atoms'
import type { RemarkModalProps } from '@types'
import { Modal } from '@molecules'

// 비고 작성 팝업 — 작은 창(WindowPanel) 안에 제목 '비고' + 단일행 입력 + 저장/취소.
// Figma 671:3837(마스터 320x211): 헤더 32 + 본문 179(p-24) → 콘텐츠 272x131, gap-8.
// 라벨 671:3859 M/16·px-8, 입력 754:3969 h-32 bg-background-1·border-secondary-1·rounded-8·px-16
// (placeholder primary/50 M/14), 버튼 671:3867·3868 w-56·h-32·rounded-8·M/14 gap-10.
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
    // 모바일 1249:20203 / 태블릿 1249:20355 / 데스크탑 1249:20434 인스턴스가 모두 320px → sm: 분기 불필요.
    <Modal open={open} onClose={onClose} panelClassName="w-full max-w-[320px]" ariaLabel="비고">
      {/* Modal 래퍼가 px-16 이라 320px 카드는 375 뷰포트(안쪽 343)에 그대로 들어간다.
          WindowPanel 기본 p-24 sm:p-32 을 !p-24 로 고정해야 내부폭이 Figma 671:3872(272) 와 같아진다. */}
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
          {/* Figma 저장/취소 컨테이너는 272x48 이고 56x32 버튼이 그 안에 세로 가운데(y=8). */}
          <div className="flex h-48 items-center justify-center gap-[10px]">
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
