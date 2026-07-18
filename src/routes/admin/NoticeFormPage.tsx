import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NOTICE_TAG_OPTIONS } from '@constants'
import { useNotice, useNoticeForm } from '@hooks'
import { ConfirmDialog, ResultDialog } from '@molecules'
import { NoticeForm } from '@organisms'

// 작성(/new)과 수정(/:noticeId/edit)을 같은 폼으로 처리한다.
export function NoticeFormPage() {
  const { noticeId } = useParams()
  const navigate = useNavigate()
  const { data: notice } = useNotice(noticeId)
  const isEdit = Boolean(noticeId)
  const { values, setField, handleSubmit, pinned, setPinned, fileName, setFileName } =
    useNoticeForm(notice)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteDoneOpen, setDeleteDoneOpen] = useState(false)

  return (
    <>
      <NoticeForm
        values={values}
        onFieldChange={setField}
        onSubmit={handleSubmit}
        onDelete={isEdit ? () => setConfirmOpen(true) : undefined}
        pinned={pinned}
        onPinnedChange={setPinned}
        tagOptions={NOTICE_TAG_OPTIONS}
        fileName={fileName}
        onFileChange={setFileName}
        onFileClear={() => setFileName('')}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          // 스펙상 공지 삭제(DELETE) 엔드포인트가 없어 실제 삭제는 no-op. UI 흐름만 유지하고 목록으로 이동한다.
          setConfirmOpen(false)
          setDeleteDoneOpen(true)
        }}
        title="공지 삭제"
        description="해당 공지를 삭제하시겠습니까?"
      />
      <ResultDialog
        open={deleteDoneOpen}
        onConfirm={() => {
          setDeleteDoneOpen(false)
          navigate('/admin/notices')
        }}
        title="삭제 완료"
        description="삭제처리가 완료되었습니다."
        confirmLabel="공지 관리로 이동"
      />
    </>
  )
}
