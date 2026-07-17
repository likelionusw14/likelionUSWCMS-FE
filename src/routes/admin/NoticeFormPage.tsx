import { useParams } from 'react-router-dom'
import { NOTICE_TAG_OPTIONS } from '@constants'
import { useNotice, useNoticeForm } from '@hooks'
import { NoticeForm } from '@organisms'

// 작성(/new)과 수정(/:noticeId/edit)을 같은 폼으로 처리한다.
export function NoticeFormPage() {
  const { noticeId } = useParams()
  const { data: notice } = useNotice(noticeId)
  const isEdit = Boolean(noticeId)
  const { values, setField, handleSubmit, handleDelete, pinned, setPinned, fileName, setFileName } =
    useNoticeForm(
      notice ? { title: notice.title, tag: notice.tag, content: notice.content } : undefined,
    )


  return (
    <>
      <NoticeForm
        values={values}
        onFieldChange={setField}
        onSubmit={handleSubmit}
        onDelete={isEdit ? handleDelete : undefined}
        pinned={pinned}
        onPinnedChange={setPinned}
        tagOptions={NOTICE_TAG_OPTIONS}
        fileName={fileName}
        onFileChange={setFileName}
        onFileClear={() => setFileName('')}
      />
    </>
  )
}
