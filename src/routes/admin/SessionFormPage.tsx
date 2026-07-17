import { useParams } from 'react-router-dom'
import { PART_OPTIONS, WEEK_OPTIONS } from '@constants'
import { useSession, useSessionForm } from '@hooks'
import { AdminTopBar, SessionForm } from '@organisms'

// 작성(/new)과 수정(/:sessionId/edit)을 같은 폼으로 처리한다.
export function SessionFormPage() {
  const { sessionId } = useParams()
  const { data: session } = useSession(sessionId)
  const { values, setField, handleSubmit, fileName, setFileName } = useSessionForm(session)

  const label = sessionId ? '세션자료 수정' : '세션자료 작성'

  return (
    <>
      <AdminTopBar
        breadcrumb={[
          { label: '홈', to: '/admin' },
          { label: '세션자료 관리', to: '/admin/sessions' },
          { label: label },
        ]}
        title={label}
      />
      <SessionForm
        values={values}
        onFieldChange={setField}
        onSubmit={handleSubmit}
        weekOptions={WEEK_OPTIONS}
        partOptions={PART_OPTIONS}
        fileName={fileName}
        onFileChange={setFileName}
        onFileClear={() => setFileName('')}
      />
    </>
  )
}
