import { useAttendanceCode } from '@hooks'
import { AdminTopBar, AttendanceCodeCreate } from '@organisms'

// 출결 관리 — 출석 코드 생성 섹션. (출석 내역 목록은 추후 추가)
export function AttendancePage() {
  const { code, remainingSeconds, generate } = useAttendanceCode()

  return (
    <>
      <AdminTopBar breadcrumb="홈 / 출결 관리" title="출결 관리" />
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <AttendanceCodeCreate
          code={code}
          remainingSeconds={remainingSeconds}
          onGenerate={generate}
        />
      </div>
    </>
  )
}
