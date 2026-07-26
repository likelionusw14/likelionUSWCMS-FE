import { useEffect, useState } from 'react'
import { Button, Dropdown, WindowPanel } from '@atoms'
import type { MemberEditModalProps } from '@types'
import { Modal } from '@molecules'
import { ConfirmDialog } from '@molecules'

// 이름 입력 — bg-background-1 + secondary-1 테두리 (Figma 754:5754).
const FIELD =
  'h-32 w-full rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14 text-black placeholder:text-primary/50 focus:outline-none'

// 회원정보 수정 팝업 — 창(WindowPanel) 안에 제목 + 삭제 링크 + 이름/기수/파트 폼 + 저장/취소.
// Figma 754:5683(마스터) — 본문 p-32·gap-40, 내부 gap-24(제목행+폼), 제목 SM/22, 삭제 링크 M/14 밑줄,
// 라벨 M/16(px-8), 이름 입력 w-280(h-32 + 오류 슬롯 = 48), 기수/파트 Dropdown w-120·gap-32,
// 버튼 저장(채움)·취소(outline) h-48·min-w-128·gap-16.
export function MemberEditModal({
  open,
  onClose,
  onSubmit,
  onDelete,
  initialValues,
  cohortOptions,
  partOptions,
}: MemberEditModalProps) {
  const [name, setName] = useState('')
  const [cohort, setCohort] = useState('')
  const [part, setPart] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [nameError, setNameError] = useState(false)

  // 팝업이 열릴 때마다 초기값으로 시드한다.
  useEffect(() => {
    if (!open) return
    setName(initialValues?.name ?? '')
    setCohort(initialValues?.cohort ?? '')
    setPart(initialValues?.part ?? '')
    setConfirmOpen(false)
    setNameError(false)
  }, [open, initialValues])

  function handleSave() {
    if (!name.trim()) {
      setNameError(true)
      return
    }
    onSubmit({ name, cohort, part })
  }

  return (
    <>
      {/* 폭은 Modal 패널에 건다 — Modal 의 패널 div 는 shrink-to-fit 이라 WindowPanel 쪽 w-full 만으로는 폭이 서지 않는다.
          모바일 336 (Figma 1249:20786), 데스크탑 640 (Figma 1249:20913). */}
      <Modal
        open={open}
        onClose={onClose}
        panelClassName="w-full max-w-[336px] sm:max-w-[640px]"
        ariaLabel="회원정보 수정"
      >
        {/* 본문 패딩은 모바일도 32 다 — 336 팝업의 콘텐츠가 272(=336-64)여야 기수+파트(120+32+120)와
            버튼(128+16+128)이 정확히 한 줄에 들어간다. 아톰 기본값(p-24 sm:p-32)을 !p-32 로 덮는다. */}
        <WindowPanel className="w-full" bodyClassName="flex flex-col items-center gap-40 !p-32">
          <div className="flex w-full flex-col items-center gap-24">
            {/* 제목 + 삭제 링크 — 모바일에서도 한 줄(Figma 1249:20794, 272px 안에 수납). 좁아지면 줄바꿈되도록 gap 부여. */}
            <div className="flex w-full flex-wrap items-center justify-between gap-8">
              <h2 className="text-sm-22 text-black">회원정보 수정</h2>
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="text-m-14 text-error underline"
              >
                회원정보 삭제
              </button>
            </div>

            {/* 폼 열 — 데스크톱은 내용폭 hug(중앙 정렬), 모바일은 전체폭. */}
            <div className="flex w-full flex-col gap-8 sm:w-auto">
              <div className="flex flex-col gap-8">
                <span className="px-8 text-m-16 text-black">이름</span>
                <div className="flex h-48 w-full flex-col gap-4 sm:w-[280px]">
                  <input
                    className={FIELD}
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value)
                      if (nameError) setNameError(false)
                    }}
                    placeholder="이름"
                  />
                  {nameError && <p className="text-r-12 text-error">이름을 다시 확인해주세요</p>}
                </div>
              </div>
              {/* 기수 + 파트 — 모바일 내부폭 279px 에 120+32+120=272 가 들어간다(Figma 1249:20804). 더 좁아지면 줄바꿈. */}
              <div className="flex flex-wrap gap-x-32 gap-y-8">
                <div className="flex flex-col gap-8">
                  <span className="px-8 text-m-16 text-black">기수</span>
                  <Dropdown
                    value={cohort}
                    onChange={setCohort}
                    options={cohortOptions}
                    placeholder="기수"
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <span className="px-8 text-m-16 text-black">파트</span>
                  <Dropdown
                    value={part}
                    onChange={setPart}
                    options={partOptions}
                    placeholder="파트"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 저장/취소 — 모바일에서도 가로 2열 유지. flex-1 로 폭을 나눠 min-w-128 두 개가 들어간다(Figma 1249:20813). */}
          <div className="flex w-full justify-center gap-16">
            <Button variant="primary" onClick={handleSave} className="flex-1 sm:flex-none">
              저장
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
              취소
            </Button>
          </div>
        </WindowPanel>
      </Modal>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          onDelete()
        }}
        title="삭제"
        description="해당 회원을 삭제하시겠습니까?"
      />
    </>
  )
}
