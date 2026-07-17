import { useParams } from 'react-router-dom'
import { useNotice } from '@hooks'
import { NoticeDetail, NotFoundPanel } from '@organisms'

export function NoticeDetailPage() {
  const { noticeId } = useParams()
  const { data: notice } = useNotice(noticeId)

  return (
    <>
      <div className="px-24 pb-[120px] pt-32">
        {notice ? <NoticeDetail notice={notice} /> : <NotFoundPanel />}
      </div>
    </>
  )
}
