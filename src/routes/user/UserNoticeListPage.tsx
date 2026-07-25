import { useLocation } from 'react-router-dom'
import { USER_NOTICE_TAG_OPTIONS } from '@constants'
import { useUserNoticeListPage } from '@hooks'
import { UserNoticeFilterBar, UserNoticeList } from '@organisms'

// 멤버(/app/notices)·게스트(/notices)가 같은 목록을 공유한다. 상세 링크 베이스는 현재 라우트에서 딴다.
export function UserNoticeListPage() {
  const { pathname } = useLocation()
  const { data, isLoading, tag, page, setTag, setPage, resetPage } = useUserNoticeListPage()

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-48 px-24 pb-96 pt-40 sm:gap-64 sm:px-32 sm:pt-48 lg:px-64">
      <header className="flex flex-col items-center gap-8">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-h1 text-black">NOTICE</h1>
        </div>
        <p className="text-sm-18 text-black">공지</p>
      </header>

      <div className="flex flex-col gap-24">
        <UserNoticeFilterBar
          tag={tag}
          tagOptions={USER_NOTICE_TAG_OPTIONS}
          onTagChange={setTag}
          onSearch={resetPage}
        />
        <UserNoticeList
          notices={data.content}
          totalCount={data.totalElements}
          page={page}
          totalPages={data.totalPages}
          isLoading={isLoading}
          onPageChange={setPage}
          detailBasePath={pathname}
        />
      </div>
    </div>
  )
}
