import { useState } from 'react'
import { Dropdown } from '@atoms'
import { NOTICE_TAG_OPTIONS } from '@constants'
import { useNotices } from '@hooks'
import { NoticeList, SearchBar } from '@organisms'

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
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <SearchBar onSearch={() => setPage(1)}>
          <Dropdown
            value={tag}
            onChange={(value) => {
              setTag(value)
              setPage(1)
            }}
            options={NOTICE_TAG_OPTIONS}
            placeholder="태그"
          />
        </SearchBar>
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
