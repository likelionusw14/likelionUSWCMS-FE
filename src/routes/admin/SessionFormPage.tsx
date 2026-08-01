import { useParams } from 'react-router-dom'
import { PART_OPTIONS, WEEK_OPTIONS } from '@constants'
import { useSession, useSessionForm } from '@hooks'
import { SessionForm } from '@organisms'

// 작성(/new)과 수정(/:sessionId/edit)을 같은 폼으로 처리한다.
// 삭제는 두지 않는다 — 스펙에 세션자료 DELETE 엔드포인트가 없다. 눌러도 지워지지 않는데
// '삭제 완료' 만 뜨면 지워진 줄 알게 되므로, 엔드포인트가 생기면 그때 되살린다.
export function SessionFormPage() {
  const { sessionId } = useParams()
  const { data: session } = useSession(sessionId)
  const { values, setField, handleSubmit, fileName, selectFile, clearFile } =
    useSessionForm(session)

  return (
    <SessionForm
      values={values}
      onFieldChange={setField}
      onSubmit={handleSubmit}
      weekOptions={WEEK_OPTIONS}
      partOptions={PART_OPTIONS}
      fileName={fileName}
      onFileChange={selectFile}
      onFileClear={clearFile}
    />
  )
}
