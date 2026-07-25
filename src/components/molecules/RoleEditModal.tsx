import { useEffect, useState } from 'react'
import { Button, WindowPanel } from '@atoms'
import { Modal } from '@molecules'
import { cn } from '@utils'
import type { RoleEditModalProps } from '@types'

const ROLE_OPTIONS = ['운영진', '아기사자'] as const

// 권한 수정 팝업 — 운영진/아기사자 2분할 토글 + 저장/취소.
export function RoleEditModal({ open, onClose, onSubmit, value }: RoleEditModalProps) {
  const [role, setRole] = useState(value ?? ROLE_OPTIONS[0])

  // value/열림 상태가 바뀌면 선택값 재시드.
  useEffect(() => {
    if (open) setRole(value ?? ROLE_OPTIONS[0])
  }, [open, value])

  return (
    // 폭은 Modal 패널에 건다 — Modal 의 패널 div 는 shrink-to-fit 이라 WindowPanel 쪽 w-full 만으로는 538px 이 서지 않는다.
    <Modal
      open={open}
      onClose={onClose}
      panelClassName="w-full max-w-[538px]"
      ariaLabel="권한 수정"
    >
      {/* 모바일(375, 패널 327) — 본문 패딩은 WindowPanel 기본값(p-24 sm:p-32)에 맡기고 gap 만 24로 줄인다. Figma 1205:23376. */}
      <WindowPanel className="w-full" bodyClassName="flex flex-col gap-24 sm:gap-40">
        <h2 className="text-left text-sm-22 text-black">권한 수정</h2>

        {/* 역할 토글 2개 — 모바일에서는 전체폭 세로 스택(Figma 1205:23379 의 flex-wrap gap 8/32). */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-32">
          {ROLE_OPTIONS.map((option) => {
            const selected = role === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={cn(
                  'flex h-40 w-full items-center justify-center rounded-8 border text-m-14 text-black sm:w-[221px]',
                  selected ? 'border-secondary-1 bg-secondary-1' : 'border-secondary-1 bg-white',
                )}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* 저장/취소 — 모바일에서도 가로 2열 유지. flex-1 로 폭을 나눠 min-w-128 두 개가 327px 안에 들어간다. */}
        <div className="flex w-full items-center justify-center gap-[10px]">
          <Button variant="primary" onClick={() => onSubmit(role)} className="flex-1 sm:flex-none">
            저장
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
            취소
          </Button>
        </div>
      </WindowPanel>
    </Modal>
  )
}
