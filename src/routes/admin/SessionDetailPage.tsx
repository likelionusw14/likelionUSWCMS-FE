import { useParams } from 'react-router-dom'
import { useSession } from '@hooks'
import { NotFoundPanel, SessionDetail } from '@organisms'

export function SessionDetailPage() {
  const { sessionId } = useParams()
  const { data: session } = useSession(sessionId)

  return (
    <div className="px-24 pb-[90px] pt-32 sm:px-32 sm:pb-[120px] lg:px-24 lg:pb-[180px]">
      {session ? <SessionDetail session={session} /> : <NotFoundPanel />}
    </div>
  )
}
