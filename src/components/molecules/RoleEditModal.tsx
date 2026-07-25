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
    // 폭은 Modal 패널에 건다 — Modal 의 패널 div 는 shrink-to-fit 이라 WindowPanel 쪽 w-full 만으로는 폭이 서지 않는다.
    // 모바일 330 (Figma 1205:23369), 태블릿·데스크탑 538 (Figma 1249:21089 / 754:5970).
    <Modal
      open={open}
      onClose={onClose}
      panelClassName="w-full max-w-[330px] sm:max-w-[538px]"
      ariaLabel="권한 수정"
    >
      {/* 본문 패딩은 모바일도 32 다 — Figma 1205:23375 본문 274 안에서 콘텐츠 1205:23376 이 x=32,y=32,266x210.
          WindowPanel 기본값이 p-24 sm:p-32 라 !p-32 로 덮는다. 세로 gap 은 모바일 24 (26→50, 138→162),
          데스크탑 40 (Figma 754:5970 의 gap-[40px]). */}
      <WindowPanel className="w-full" bodyClassName="!p-32 flex flex-col gap-24 sm:gap-40">
        {/* 제목 22 SemiBold, 좌측 정렬 — Figma 1205:23378 (82x26) / I754:5970;754:5891. */}
        <h2 className="text-left text-sm-22 text-black">권한 수정</h2>

        {/* 역할 토글 — 모바일은 전체폭(266) 세로 스택 gap 8 (Figma 1205:23379: 0→40, 48→88),
            데스크탑은 221 두 개 가로 gap 32 (221+32+221=474=538-64, Figma I754:5970;754:5892). */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-32">
          {ROLE_OPTIONS.map((option) => {
            const selected = role === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={cn(
                  // 40 높이 / radius 8 / secondary-1 테두리 / M-14 (Figma 754:5867·754:5868).
                  'flex h-40 w-full items-center justify-center rounded-8 border border-secondary-1 text-m-14 text-black sm:w-[221px]',
                  selected ? 'bg-secondary-1' : 'bg-white',
                )}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* 저장/취소 — 행 높이 48, gap 10, 가운데 정렬 (Figma I754:5970;754:5895).
            모바일은 flex-1 로 128+10+128=266 이 정확히 본문 폭을 채우고(Figma 1205:23382~23384),
            데스크탑은 min-w-128 그대로 두고 474 안에서 가운데 정렬한다. */}
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
