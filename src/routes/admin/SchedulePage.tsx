import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog, ResultDialog, ScheduleFormModal } from '@molecules'
import { ScheduleCalendar } from '@organisms'
import { useSchedules } from '@hooks'
import type { CalendarEvent } from '@types'

// 일정 관리 — 월 캘린더(ScheduleCalendar). 칩 클릭 시 상세 팝업(수정/삭제), + 버튼으로 일정 작성.
// Figma 491:3357.
export function SchedulePage() {
  const navigate = useNavigate()
  const { data: events } = useSchedules()
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [formOpen, setFormOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteDoneOpen, setDeleteDoneOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <ScheduleCalendar
          year={year}
          month={month}
          events={events}
          onMonthChange={(y, m) => {
            setYear(y)
            setMonth(m)
          }}
          onRegister={() => {
            setEditingEvent(null)
            setFormOpen(true)
          }}
          onEventEdit={(event) => {
            setEditingEvent(event)
            setFormOpen(true)
          }}
          onEventDelete={() => setDeleteOpen(true)}
          className="w-full"
        />
      </div>

      <ScheduleFormModal
        open={formOpen}
        initialEvent={editingEvent}
        onClose={() => {
          setFormOpen(false)
          setEditingEvent(null)
        }}
        onSubmit={() => {
          setFormOpen(false)
          setEditingEvent(null)
        }}
      />
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleteOpen(false)
          setDeleteDoneOpen(true)
        }}
        title="일정 삭제"
        description="해당 일정을 삭제하시겠습니까?"
      />
      <ResultDialog
        open={deleteDoneOpen}
        onConfirm={() => {
          setDeleteDoneOpen(false)
          navigate('/admin/schedule')
        }}
        title="삭제 완료"
        description="삭제처리가 완료되었습니다."
        confirmLabel="일정 관리로 이동"
      />
    </>
  )
}
