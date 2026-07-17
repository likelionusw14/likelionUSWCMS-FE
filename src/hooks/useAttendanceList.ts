import { useState, useMemo } from 'react'
import { useAttendance } from './useAttendance'
import { usePagination } from './usePagination'
import type { AttendanceRecord } from '@types'

export function useAttendanceList() {
  const { data } = useAttendance()
  const [records, setRecords] = useState<AttendanceRecord[]>(data)
  const [remarkRecord, setRemarkRecord] = useState<AttendanceRecord | null>(null)
  const [dateOpen, setDateOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState('2026.07.03')
  const [partFilter, setPartFilter] = useState('')

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
    setRecords((previous) =>
      previous.map((record) =>
        record.id === id ? { ...record, present: !record.present } : record,
      ),
    )
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
  }
}
