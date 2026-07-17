import { useParams } from 'react-router-dom'
import { useNotice } from '@hooks'
import { AdminTopBar, NoticeDetail, NotFoundPanel } from '@organisms'

export function NoticeDetailPage() {
  const { noticeId } = useParams()
  const { data: notice } = useNotice(noticeId)

  return (
    <>
      <AdminTopBar breadcrumb="홈 / 공지 관리 / 공지 상세" title="공지 상세" />
      <div className="px-24 pb-[120px] pt-32">
        {notice ? <NoticeDetail notice={notice} /> : <NotFoundPanel />}
      </div>
    </>
  )
}
