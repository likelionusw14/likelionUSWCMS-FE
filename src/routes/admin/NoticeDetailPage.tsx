import { useParams } from 'react-router-dom'
import { useNotice } from '@hooks'
import { NoticeDetail, NotFoundPanel } from '@organisms'

export function NoticeDetailPage() {
  const { noticeId } = useParams()
  const { data: notice } = useNotice(noticeId)

  return (
    <>
      <div className="px-24 pb-[90px] pt-32 min-[376px]:pb-[120px] lg:pb-[180px]">
        {notice ? <NoticeDetail notice={notice} /> : <NotFoundPanel />}
      </div>
    </>
  )
}
