import { USER_SESSION_PART_OPTIONS, USER_SESSION_WEEK_OPTIONS } from '@constants'
import { useUserSessionListPage } from '@hooks'
import { UserSessionFilterBar, UserSessionList } from '@organisms'

export function UserSessionListPage() {
  const { data, isLoading, week, part, page, setWeek, setPart, setPage, resetPage } =
    useUserSessionListPage()

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-48 px-24 pb-96 pt-40 sm:gap-64 sm:px-32 sm:pt-48 lg:px-64">
      <header className="flex flex-col items-center gap-8">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-sm-22 text-black sm:text-h1">SESSION</h1>
        </div>
        <p className="text-sm-18 text-black">세션자료</p>
      </header>

      <div className="flex flex-col gap-24">
        <UserSessionFilterBar
          week={week}
          part={part}
          weekOptions={USER_SESSION_WEEK_OPTIONS}
          partOptions={USER_SESSION_PART_OPTIONS}
          onWeekChange={setWeek}
          onPartChange={setPart}
          onSearch={resetPage}
        />
        <UserSessionList
          sessions={data.content}
          totalCount={data.totalElements}
          page={page}
          totalPages={data.totalPages}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
