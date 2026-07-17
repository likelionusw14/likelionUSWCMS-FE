import { useState } from 'react'
import { PART_OPTIONS, WEEK_OPTIONS } from '@constants'
import { Dropdown } from '@atoms'
import { useSessions, usePagination } from '@hooks'
import { SearchBar, SessionList } from '@organisms'


export function SessionListPage() {
  const { data: sessions } = useSessions()
  const [week, setWeek] = useState('')
  const [part, setPart] = useState('')
  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: sessions.length,
    pageSize: 20,
  })

  const visibleSessions = slice(sessions)

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <SearchBar onSearch={() => setPage(1)}>
          <Dropdown value={week} onChange={setWeek} options={WEEK_OPTIONS} placeholder="주차" />
          <Dropdown value={part} onChange={setPart} options={PART_OPTIONS} placeholder="파트" />
        </SearchBar>
        <SessionList
          sessions={visibleSessions}
          totalCount={sessions.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
