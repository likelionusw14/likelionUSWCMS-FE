import { useState } from 'react'
import searchIcon from '@/assets/icons/search.svg'
import { Dropdown } from '@atoms'
import { NOTICE_TAG_OPTIONS } from '@constants'
import { useNotices } from '@hooks'
import { AdminTopBar, NoticeList } from '@organisms'

const PAGE_SIZE = 20

export function NoticeListPage() {
  const { data: notices } = useNotices()
  const [tag, setTag] = useState('')
  const [page, setPage] = useState(1)

  const filtered = tag ? notices.filter((notice) => notice.tag === tag) : notices
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <AdminTopBar breadcrumb="홈 / 공지 관리" title="공지 관리" />
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <div className="flex w-full items-center justify-between rounded-16 bg-white px-32 py-12">
          <Dropdown
            value={tag}
            onChange={(value) => {
              setTag(value)
              setPage(1)
            }}
            options={NOTICE_TAG_OPTIONS}
            placeholder="태그"
          />
          <button type="button" aria-label="검색" onClick={() => setPage(1)}>
            <img src={searchIcon} alt="" className="h-40 w-24" />
          </button>
        </div>
        <NoticeList
          notices={visible}
          totalCount={filtered.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
