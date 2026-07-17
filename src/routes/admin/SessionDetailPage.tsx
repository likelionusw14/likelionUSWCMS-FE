import { useParams } from 'react-router-dom'
import { useSession } from '@hooks'
import { NotFoundPanel, SessionDetail } from '@organisms'

export function SessionDetailPage() {
  const { sessionId } = useParams()
  const { data: session } = useSession(sessionId)

  return (
    <>
      {session ? <SessionDetail session={session} /> : <NotFoundPanel />}
    </>
  )
}
