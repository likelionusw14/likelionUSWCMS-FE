import { useAttendanceCheckIn, useMyAttendanceList } from '@hooks'
import { AttendanceCheckIn, UserAttendanceList } from '@organisms'

// 출결 페이지 — 출석 코드 입력 + 본인 출석 내역.
export function UserAttendancePage() {
  const checkIn = useAttendanceCheckIn()
  const list = useMyAttendanceList()

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-48 px-24 pb-96 pt-40 sm:gap-64 sm:px-32 sm:pt-48 lg:px-64">
      <header className="flex flex-col items-center gap-8">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-h1 text-black">ATTENDANCE</h1>
        </div>
        <p className="text-sm-18 text-black">출석체크</p>
      </header>

      <AttendanceCheckIn
        code={checkIn.code}
        onCodeChange={checkIn.setCode}
        remainingSeconds={checkIn.remainingSeconds}
        result={checkIn.result}
        onSubmit={checkIn.submit}
        onCloseResult={checkIn.closeResult}
      />

      <div className="flex flex-col gap-24">
        <h2 className="text-center text-sm-20 text-black">출석 내역</h2>
        <UserAttendanceList
          records={list.records}
          totalCount={list.totalCount}
          page={list.page}
          totalPages={list.totalPages}
          onPageChange={list.setPage}
        />
      </div>
    </div>
  )
}
