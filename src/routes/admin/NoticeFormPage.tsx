import { useParams } from 'react-router-dom'
import { NOTICE_TAG_OPTIONS } from '@constants'
import { useNotice, useNoticeForm } from '@hooks'
import { AdminTopBar, NoticeForm } from '@organisms'

// 작성(/new)과 수정(/:noticeId/edit)을 같은 폼으로 처리한다.
export function NoticeFormPage() {
  const { noticeId } = useParams()
  const { data: notice } = useNotice(noticeId)
  const { values, setField, handleSubmit, pinned, setPinned, fileName, setFileName } = useNoticeForm(
    notice ? { title: notice.title, tag: notice.tag, content: notice.content } : undefined,
  )

  const label = noticeId ? '공지 수정' : '공지 작성'

  return (
    <>
      <AdminTopBar breadcrumb={`홈 / 공지 관리 / ${label}`} title={label} />
      <NoticeForm
        values={values}
        onFieldChange={setField}
        onSubmit={handleSubmit}
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
