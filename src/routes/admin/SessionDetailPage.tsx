import { useParams } from 'react-router-dom'
import { useSession } from '@hooks'
import { AdminTopBar, NotFoundPanel, SessionDetail } from '@organisms'

export function SessionDetailPage() {
  const { sessionId } = useParams()
  const { data: session } = useSession(sessionId)

  return (
    <>
      <AdminTopBar
        breadcrumb={[
          { label: '홈', to: '/admin' },
          { label: '세션자료 관리', to: '/admin/sessions' },
          { label: '세션자료 상세' },
        ]}
        title="세션자료 상세"
      />
      {session ? <SessionDetail session={session} /> : <NotFoundPanel />}
    </>
  )
}
