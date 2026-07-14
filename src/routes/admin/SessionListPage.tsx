import { useState } from 'react'
import { PART_OPTIONS, WEEK_OPTIONS } from '@constants'
import { useSessions } from '@hooks'
import { AdminTopBar, SessionFilterBar, SessionList } from '@organisms'

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
      <AdminTopBar breadcrumb="홈 / 세션자료 관리" title="세션자료 관리" />
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <SessionFilterBar
          week={week}
          part={part}
          onWeekChange={setWeek}
          onPartChange={setPart}
          weekOptions={WEEK_OPTIONS}
          partOptions={PART_OPTIONS}
          onSearch={() => setPage(1)}
        />
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
