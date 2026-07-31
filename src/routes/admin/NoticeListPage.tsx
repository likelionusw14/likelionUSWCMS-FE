import { useState } from 'react'
import { Dropdown } from '@atoms'
import { NOTICE_TAG_OPTIONS } from '@constants'
import { useNotices, usePagination } from '@hooks'
import { NoticeList, SearchBar } from '@organisms'

export function NoticeListPage() {
  const { data: notices } = useNotices()
  const [tag, setTag] = useState('')
  const filtered = tag ? notices.filter((notice) => notice.tagValue === tag) : notices
  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: filtered.length,
    pageSize: 20,
  })

  const visible = slice(filtered)

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[90px] pt-32 min-[376px]:pb-[120px] lg:pb-[180px]">
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
