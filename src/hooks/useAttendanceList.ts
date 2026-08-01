import { useState, useMemo, useEffect } from 'react'
import { useAttendance, useUpdateAttendance } from './useAttendance'
import { usePagination } from './usePagination'
import { useSchedules } from './useSchedules'
import { toPartCode } from './useMembers'
import { isBackendConnected } from '@config'
import type { AttendanceRecord } from '@types'

// 'YYYY.MM.DD' → 'YYYY-MM-DD' (일정 응답의 scheduleDate 형식).
function toIsoDate(dotted: string): string {
  return dotted.replace(/\./g, '-')
}

// 오늘을 'YYYY.MM.DD' 로. 필터 초기값이 고정 날짜면 매번 빈 화면부터 시작한다.
function today(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}.${month}.${day}`
}

// 관리자 출결 목록 상태.
// 스펙상 출결은 일정(scheduleId)에 종속인데 화면에는 날짜 필터만 있다.
// 그래서 선택한 날짜가 속한 달의 일정을 받아 그 날짜의 일정을 찾고, 그 scheduleId 로 출결을 조회한다.
// (한 날짜에 일정이 여럿이면 첫 번째를 쓴다 — 일정 선택 UI 가 생기면 그 값을 받도록 바꾼다.)
export function useAttendanceList() {
  const [dateFilter, setDateFilter] = useState(today)
  const [partFilter, setPartFilter] = useState('')

  const [year, month] = dateFilter.split('.').map(Number)
  // useSchedules 의 month 는 0-11(JS Date 월 인덱스).
  const { data: monthEvents } = useSchedules(year, (month ?? 1) - 1)
  const scheduleId = monthEvents.find((event) => event.date === toIsoDate(dateFilter))?.id

  const { data } = useAttendance(
    scheduleId
      ? {
          scheduleId: Number(scheduleId),
          // 파트 필터는 서버에서 거른다 (선택지 value 는 한국어 라벨이라 enum 으로 옮긴다).
          ...(partFilter ? { part: toPartCode(partFilter) } : {}),
          // 한 일정의 출결은 기수 인원 규모라 한 번에 받고 페이지네이션은 화면에서 한다.
          size: 100,
        }
      : undefined,
  )
  const updateAttendanceMutation = useUpdateAttendance()

  const [records, setRecords] = useState<AttendanceRecord[]>(data)
  const [remarkRecord, setRemarkRecord] = useState<AttendanceRecord | null>(null)
  const [dateOpen, setDateOpen] = useState(false)

  // 실 API 조회 결과가 바뀌면 로컬 표시 상태를 동기화(연동 모드).
  useEffect(() => {
    if (isBackendConnected) setRecords(data)
  }, [data])

  // 미연동 데모는 서버 필터가 없어 화면에서 거른다.
  const filtered = useMemo(
    () =>
      !isBackendConnected && partFilter
        ? records.filter((record) => record.part === partFilter)
        : records,
    [records, partFilter],
  )

  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: filtered.length,
    pageSize: 10,
  })

  const visible = slice(filtered)

  function togglePresent(id: string) {
    const target = records.find((record) => record.id === id)
    if (!target) return

    // 낙관적 토글 — 서버 반영은 아래 mutation, 성공 시 무효화로 다시 맞춰진다.
    setRecords((previous) =>
      previous.map((record) =>
        record.id === id ? { ...record, present: !record.present } : record,
      ),
    )

    // 연동 + version 있으면 실 mutation. 체크→PRESENT, 해제→ABSENT.
    if (isBackendConnected && target.version !== undefined) {
      updateAttendanceMutation.mutate({
        attendanceId: id,
        status: target.present ? 'ABSENT' : 'PRESENT',
        memo: target.remark,
        version: target.version,
      })
    }
  }

  function saveRemark(value: string) {
    const target = remarkRecord
    if (!target) return

    setRecords((previous) =>
      previous.map((record) => (record.id === target.id ? { ...record, remark: value } : record)),
    )

    // 연동 + version 있으면 실 mutation(비고=memo, 기존 상태 보존).
    if (isBackendConnected && target.version !== undefined) {
      updateAttendanceMutation.mutate({
        attendanceId: target.id,
        status: target.present ? 'PRESENT' : 'ABSENT',
        memo: value,
        version: target.version,
      })
    }

    setRemarkRecord(null)
  }

  function changeDate(value: string) {
    setDateFilter(value)
    setPage(1)
  }

  return {
    records: visible,
    totalCount: filtered.length,
    page,
    setPage,
    totalPages,
    remarkRecord,
    setRemarkRecord,
    dateOpen,
    setDateOpen,
    dateFilter,
    setDateFilter: changeDate,
    partFilter,
    setPartFilter,
    togglePresent,
    saveRemark,
    // 출석 코드 발급도 같은 일정에 매인다. 일정이 없으면 undefined.
    scheduleId,
    // 연동 상태인데 그 날짜에 일정이 없으면 화면이 왜 비었는지 알려줘야 한다.
    hasSchedule: !isBackendConnected || scheduleId !== undefined,
  }
}
