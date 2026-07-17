import { useParams } from 'react-router-dom'
import { useSession } from '@hooks'
import { NotFoundPanel, SessionDetail } from '@organisms'

export function SessionDetailPage() {
  const { sessionId } = useParams()
  const { data: session } = useSession(sessionId)

  return (
    <div className="px-24 pb-[120px] pt-32">
      {session ? <SessionDetail session={session} /> : <NotFoundPanel />}
    </div>
  )
}
