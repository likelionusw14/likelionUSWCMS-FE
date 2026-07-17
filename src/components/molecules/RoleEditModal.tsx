import { useEffect, useState } from 'react'
import { WindowPanel } from '@atoms'
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
    <Modal open={open} onClose={onClose} panelClassName="" ariaLabel="권한 수정">
      <WindowPanel className="w-[538px]" bodyClassName="flex flex-col gap-40 p-32">
        <h2 className="text-left text-sm-22 text-black">권한 수정</h2>

        <div className="flex items-center gap-32">
          {ROLE_OPTIONS.map((option) => {
            const selected = role === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={cn(
                  'flex h-40 w-[221px] items-center justify-center rounded-8 border text-m-14 text-black',
                  selected
                    ? 'border-secondary-1 bg-secondary-1'
                    : 'border-secondary-1 bg-white',
                )}
              >
                {option}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-[10px]">
          <button
            type="button"
            onClick={() => onSubmit(role)}
            className="flex h-48 min-w-[128px] items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
          >
            저장
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-48 min-w-[128px] items-center justify-center rounded-8 border border-primary bg-white px-32 text-sm-18 text-primary"
          >
            취소
          </button>
        </div>
      </WindowPanel>
    </Modal>
  )
}
