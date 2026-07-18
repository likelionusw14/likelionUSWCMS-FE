import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog, ResultDialog, ScheduleFormModal } from '@molecules'
import { ScheduleCalendar } from '@organisms'
import {
  toCreateScheduleRequest,
  toUpdateScheduleRequest,
  useCreateSchedule,
  useDeleteSchedule,
  useSchedules,
  useUpdateSchedule,
} from '@hooks'
import type { CalendarEvent, ScheduleFormValues } from '@types'

// 일정 관리 — 월 캘린더(ScheduleCalendar). 칩 클릭 시 상세 팝업(수정/삭제), + 버튼으로 일정 작성.
// Figma 491:3357.
export function SchedulePage() {
  const navigate = useNavigate()
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const { data: events } = useSchedules(year, month)
  const createSchedule = useCreateSchedule()
  const updateSchedule = useUpdateSchedule()
  const deleteSchedule = useDeleteSchedule()
  const [formOpen, setFormOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<CalendarEvent | null>(null)
  const [deleteDoneOpen, setDeleteDoneOpen] = useState(false)

  // 저장(등록/수정) — editingEvent 유무로 분기. 미연동이면 mutation 이 no-op 이라 그대로 닫힌다.
  function handleSubmit(values: ScheduleFormValues) {
    if (editingEvent) {
      updateSchedule.mutate({
        scheduleId: editingEvent.id,
        // version 은 낙관적 동시성 필수. 응답에서 받은 값을 그대로 전달한다.
        body: toUpdateScheduleRequest(values, editingEvent.version ?? 0, editingEvent.cohortId),
      })
    } else {
      createSchedule.mutate(toCreateScheduleRequest(values))
    }
    setFormOpen(false)
    setEditingEvent(null)
  }

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
          onEventDelete={(event) => {
            setDeleteTarget(event)
            setDeleteOpen(true)
          }}
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
        onSubmit={handleSubmit}
      />
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          if (deleteTarget) deleteSchedule.mutate(deleteTarget.id)
          setDeleteOpen(false)
          setDeleteTarget(null)
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
