import { useState } from 'react'
import { PART_OPTIONS, WEEK_OPTIONS } from '@constants'
import { Dropdown } from '@atoms'
import { useSessions, usePagination } from '@hooks'
import { SearchBar, SessionList } from '@organisms'

export function SessionListPage() {
  const { data: sessions } = useSessions()
  const [week, setWeek] = useState('')
  const [part, setPart] = useState('')
  const filtered = sessions.filter(
    (session) => (!week || session.week === week) && (!part || session.part === part),
  )
  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: filtered.length,
    pageSize: 20,
  })

  const visibleSessions = slice(filtered)

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[90px] pt-32 sm:pb-[120px] lg:pb-[180px]">
        <SearchBar onSearch={() => setPage(1)}>
          <Dropdown
            value={week}
            onChange={(value) => {
              setWeek(value)
              setPage(1)
            }}
            options={WEEK_OPTIONS}
            placeholder="주차"
          />
          <Dropdown
            value={part}
            onChange={(value) => {
              setPart(value)
              setPage(1)
            }}
            options={PART_OPTIONS}
            placeholder="파트"
          />
        </SearchBar>
        <SessionList
          sessions={visibleSessions}
          totalCount={filtered.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
