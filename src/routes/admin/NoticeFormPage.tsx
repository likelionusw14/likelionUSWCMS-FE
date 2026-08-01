import { useParams } from 'react-router-dom'
import { NOTICE_TAG_OPTIONS } from '@constants'
import { useNotice, useNoticeForm } from '@hooks'
import { NoticeForm } from '@organisms'

// 작성(/new)과 수정(/:noticeId/edit)을 같은 폼으로 처리한다.
// 삭제는 두지 않는다 — 스펙에 공지 DELETE 엔드포인트가 없다. 눌러도 지워지지 않는데
// '삭제 완료' 만 뜨면 지워진 줄 알게 되므로, 엔드포인트가 생기면 그때 되살린다.
export function NoticeFormPage() {
  const { noticeId } = useParams()
  const { data: notice } = useNotice(noticeId)
  const { values, setField, handleSubmit, pinned, setPinned, fileName, selectFile, clearFile } =
    useNoticeForm(notice)

  return (
    <NoticeForm
      values={values}
      onFieldChange={setField}
      onSubmit={handleSubmit}
      pinned={pinned}
      onPinnedChange={setPinned}
      tagOptions={NOTICE_TAG_OPTIONS}
      fileName={fileName}
      onFileChange={selectFile}
      onFileClear={clearFile}
    />
  )
}
