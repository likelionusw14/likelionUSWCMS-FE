import { useEffect, useState } from 'react'
import { Button, Dropdown, WindowPanel } from '@atoms'
import type { MemberEditModalProps } from '@types'
import { Modal } from '@molecules'
import { ConfirmDialog } from '@molecules'

// 이름 입력 — bg-background-1 + secondary-1 테두리 (Figma 754:5754).
const FIELD =
  'h-32 w-full rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14 text-black placeholder:text-primary/50 focus:outline-none'

// 회원정보 수정 팝업 — 창(WindowPanel) 안에 제목 + 삭제 링크 + 이름/기수/파트 폼 + 저장/취소.
// Figma 754:5683: 본문 p-32·gap-40, 내부 gap-24(제목행+폼), 라벨 M/16(px-8), 이름 w-280,
// 기수/파트 Dropdown(w-120, bg-background-1), 버튼 h-48·min-w-128·SM/18.
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
      <Modal open={open} onClose={onClose} panelClassName="" ariaLabel="회원정보 수정">
      <WindowPanel className="w-[640px]" bodyClassName="flex flex-col items-center gap-40">
        <div className="flex w-full flex-col items-center gap-24">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-sm-22 text-black">회원정보 수정</h2>
            <button type="button" onClick={() => setConfirmOpen(true)} className="text-m-14 text-error underline">
              회원정보 삭제
            </button>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <span className="px-8 text-m-16 text-black">이름</span>
              <div className="flex h-48 w-[280px] flex-col gap-4">
                <input
                  className={FIELD}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                    if (nameError) setNameError(false)
                  }}
                  placeholder="이름"
                />
                {nameError && (
                  <p className="text-r-12 text-error">
                    이름을 다시 확인해주세요
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-32">
              <div className="flex flex-col gap-8">
                <span className="px-8 text-m-16 text-black">기수</span>
                <Dropdown value={cohort} onChange={setCohort} options={cohortOptions} placeholder="기수" />
              </div>
              <div className="flex flex-col gap-8">
                <span className="px-8 text-m-16 text-black">파트</span>
                <Dropdown value={part} onChange={setPart} options={partOptions} placeholder="파트" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-16">
          <Button variant="primary" onClick={handleSave}>
            저장
          </Button>
          <Button variant="outline" onClick={onClose}>
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
