import { useParams } from 'react-router-dom'
import { useUserSessionDetail } from '@hooks'
import { NotFoundPanel, UserSessionDetail } from '@organisms'

export function UserSessionDetailPage() {
  const { resourceId } = useParams()
  const { data: session, isLoading } = useUserSessionDetail(resourceId)

  if (isLoading) {
    return (
      <div className="flex min-h-[480px] items-center justify-center text-m-18 text-gray-700">
        세션자료를 불러오는 중입니다.
      </div>
    )
  }

  if (!session) return <NotFoundPanel />

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-64 px-64 pb-96 pt-48">
      <header className="flex flex-col items-center gap-8">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-h1 text-black">SESSION</h1>
        </div>
        <p className="text-sm-18 text-black">세션자료</p>
      </header>
      <UserSessionDetail session={session} />
    </div>
  )
}
