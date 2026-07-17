import { useState } from 'react'
import { PART_OPTIONS } from '@constants'
import {
  ConfirmDialog,
  DatePickerModal,
  MemberEditModal,
  RemarkModal,
  ResultDialog,
  RoleEditModal,
  ScheduleFormModal,
  TimePickerModal,
} from '@molecules'

// ⚠️ 임시 미리보기 화면(커밋 대상 아님) — 팝업 눈으로 확인용.
const COHORT_OPTIONS = [
  { value: '13', label: '13기' },
  { value: '14', label: '14기' },
]

export function SandboxPage() {
  const [open, setOpen] = useState<string | null>(null)
  const close = () => setOpen(null)

  const triggers = [
    '삭제',
    '삭제완료',
    '일정 작성',
    '날짜 선택',
    '시간 선택',
    '비고 작성',
    '회원정보 수정',
    '권한 수정',
  ]

  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-40 bg-background-1 p-40">
      <section className="flex flex-col gap-16">
        <h1 className="text-h1 text-black">팝업 (Dialog / Modal)</h1>
        <div className="flex flex-wrap gap-16">
          {triggers.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setOpen(t)}
              className="flex h-48 items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <ConfirmDialog
        open={open === '삭제'}
        onClose={close}
        onConfirm={() => setOpen('삭제완료')}
        title="삭제"
        description="해당 문서를 삭제하시겠습니까?"
      />
      <ResultDialog
        open={open === '삭제완료'}
        onConfirm={close}
        title="삭제 완료"
        description="삭제처리가 완료되었습니다."
        confirmLabel="프로젝트 관리로 이동"
      />
      <ScheduleFormModal
        open={open === '일정 작성'}
        onClose={close}
        onSubmit={close}
      />
      <DatePickerModal open={open === '날짜 선택'} onClose={close} onConfirm={close} />
      <TimePickerModal open={open === '시간 선택'} onClose={close} onConfirm={close} />
      <RemarkModal open={open === '비고 작성'} onClose={close} onSubmit={close} />
      <MemberEditModal
        open={open === '회원정보 수정'}
        onClose={close}
        onSubmit={close}
        onDelete={close}
        initialValues={{ name: '김OO' }}
        cohortOptions={COHORT_OPTIONS}
        partOptions={PART_OPTIONS}
      />
      <RoleEditModal open={open === '권한 수정'} onClose={close} onSubmit={close} />
    </div>
  )
}
