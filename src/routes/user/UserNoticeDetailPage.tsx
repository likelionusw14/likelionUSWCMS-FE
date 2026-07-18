import { useParams } from 'react-router-dom'
import { useUserNoticeDetail } from '@hooks'
import { NotFoundPanel, UserNoticeDetail } from '@organisms'

export function UserNoticeDetailPage() {
  const { noticeId } = useParams()
  const { data: notice, isLoading } = useUserNoticeDetail(noticeId)

  if (isLoading) {
    return (
      <div className="flex min-h-[480px] items-center justify-center text-m-18 text-gray-700">
        공지를 불러오는 중입니다.
      </div>
    )
  }

  if (!notice) return <NotFoundPanel />

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-64 px-64 pb-96 pt-48">
      <header className="flex flex-col items-center gap-8">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-h1 text-black">NOTICE</h1>
        </div>
        <p className="text-sm-18 text-black">공지</p>
      </header>
      <UserNoticeDetail notice={notice} />
    </div>
  )
}
