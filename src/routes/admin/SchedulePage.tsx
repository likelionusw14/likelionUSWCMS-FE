import { useState } from 'react'
import { ConfirmDialog, ScheduleFormModal } from '@molecules'
import { AdminTopBar, ScheduleCalendar } from '@organisms'
import { useSchedules } from '@hooks'

// 일정 관리 — 월 캘린더(ScheduleCalendar). 칩 클릭 시 상세 팝업(수정/삭제), + 버튼으로 일정 작성.
// Figma 491:3357.
export function SchedulePage() {
  const { data: events } = useSchedules()
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <AdminTopBar breadcrumb={[{ label: '홈', to: '/admin' }, { label: '일정 관리' }]} title="일정 관리" />
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <ScheduleCalendar
          year={year}
          month={month}
          events={events}
          onMonthChange={(y, m) => {
            setYear(y)
            setMonth(m)
          }}
          onRegister={() => setFormOpen(true)}
          onEventEdit={() => setFormOpen(true)}
          onEventDelete={() => setDeleteOpen(true)}
          className="w-full"
        />
      </div>

      <ScheduleFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={() => setFormOpen(false)}
      />
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => setDeleteOpen(false)}
        title="일정 삭제"
        description="해당 일정을 삭제하시겠습니까?"
      />
    </>
  )
}
