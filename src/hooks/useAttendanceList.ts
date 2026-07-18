import { useState, useMemo, useEffect } from 'react'
import { useAttendance, useUpdateAttendance } from './useAttendance'
import { usePagination } from './usePagination'
import { isBackendConnected } from '@config'
import type { AdminAttendanceQuery } from '@api'
import type { AttendanceRecord } from '@types'

// [추정] admin 출결은 스펙상 scheduleId 에 종속되나 현 UI 는 날짜 필터만 있다.
// scheduleId 를 옵셔널로 받아 실 API 경로를 준비만 해두고, 미연동/미지정 데모에서는
// 기존 mock + 로컬 토글 흐름을 그대로 유지한다.
export function useAttendanceList(query?: AdminAttendanceQuery) {
  const { data } = useAttendance(query)
  const updateAttendanceMutation = useUpdateAttendance()

  const [records, setRecords] = useState<AttendanceRecord[]>(data)
  const [remarkRecord, setRemarkRecord] = useState<AttendanceRecord | null>(null)
  const [dateOpen, setDateOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState('2026.07.03')
  const [partFilter, setPartFilter] = useState('')

  // 실 API 조회 결과가 바뀌면 로컬 표시 상태를 동기화(연동 모드).
  useEffect(() => {
    if (isBackendConnected) setRecords(data)
  }, [data])

  const filtered = useMemo(
    () => (partFilter ? records.filter((record) => record.part === partFilter) : records),
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

    // 로컬 낙관적 토글(데모 유지).
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

    // 로컬 반영(데모 유지).
    setRecords((previous) =>
      previous.map((record) =>
        record.id === target.id ? { ...record, remark: value } : record,
      ),
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
    setDateFilter,
    partFilter,
    setPartFilter,
    togglePresent,
    saveRemark,
  }
}
