import { useState } from 'react'
import { PART_OPTIONS, WEEK_OPTIONS } from '@constants'
import { Dropdown } from '@atoms'
import { useSessions } from '@hooks'
import { SearchBar, SessionList } from '@organisms'

const PAGE_SIZE = 20

export function SessionListPage() {
  const { data: sessions } = useSessions()
  const [week, setWeek] = useState('')
  const [part, setPart] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(sessions.length / PAGE_SIZE))
  const visibleSessions = sessions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

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
