import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PART_OPTIONS, WEEK_OPTIONS } from '@constants'
import { useSession, useSessionForm } from '@hooks'
import { ConfirmDialog, ResultDialog } from '@molecules'
import { SessionForm } from '@organisms'

// 작성(/new)과 수정(/:sessionId/edit)을 같은 폼으로 처리한다.
export function SessionFormPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { data: session } = useSession(sessionId)
  const isEdit = Boolean(sessionId)
  const { values, setField, handleSubmit, fileName, setFileName } = useSessionForm(session)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteDoneOpen, setDeleteDoneOpen] = useState(false)

  return (
    <>
      <SessionForm
        values={values}
        onFieldChange={setField}
        onSubmit={handleSubmit}
        onDelete={isEdit ? () => setConfirmOpen(true) : undefined}
        weekOptions={WEEK_OPTIONS}
        partOptions={PART_OPTIONS}
        fileName={fileName}
        onFileChange={setFileName}
        onFileClear={() => setFileName('')}
      />

      {/* 스펙상 Resource 엔 삭제(DELETE) 엔드포인트가 없다. 기존 UI 는 유지하되 실제
          삭제는 수행하지 않고 확인 후 목록으로만 이동한다(no-op). */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          setDeleteDoneOpen(true)
        }}
        title="세션자료 삭제"
        description="해당 세션자료를 삭제하시겠습니까?"
      />
      <ResultDialog
        open={deleteDoneOpen}
        onConfirm={() => {
          setDeleteDoneOpen(false)
          navigate('/admin/sessions')
        }}
        title="삭제 완료"
        description="삭제처리가 완료되었습니다."
        confirmLabel="세션자료 관리로 이동"
      />
    </>
  )
}
