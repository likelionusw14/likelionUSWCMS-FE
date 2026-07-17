import { useMemo, useState } from 'react'
import calendarIcon from '@/assets/icons/calendar.svg'
import { Dropdown } from '@atoms'
import { DatePickerModal, RemarkModal } from '@molecules'
import { AttendanceCodeCreate, AttendanceList, SearchBar } from '@organisms'
import { useAttendance, useAttendanceCode } from '@hooks'
import { PART_OPTIONS } from '@constants'
import type { AttendanceRecord } from '@types'

const PAGE_SIZE = 10

// 출결 관리 — 출석 코드 생성 카드 + (출석 내역 제목 + 검색바 + 출석 내역 카드). Figma 29:18174 / 563:9299.
export function AttendancePage() {
  const { code, remainingSeconds, generate } = useAttendanceCode()
  const { data } = useAttendance()
  const [records, setRecords] = useState<AttendanceRecord[]>(data)
  const [page, setPage] = useState(1)
  const [remarkRecord, setRemarkRecord] = useState<AttendanceRecord | null>(null)
  // 검색바 필터 — 날짜(693:3887) · 파트(693:3920). 파트로 목록을 좁힌다.
  const [dateOpen, setDateOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState('2026.07.03')
  const [partFilter, setPartFilter] = useState('')

  const filtered = useMemo(
    () => (partFilter ? records.filter((record) => record.part === partFilter) : records),
    [records, partFilter],
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function togglePresent(id: string) {
    setRecords((previous) =>
      previous.map((record) =>
        record.id === id ? { ...record, present: !record.present } : record,
      ),
    )
  }

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <AttendanceCodeCreate
          code={code}
          remainingSeconds={remainingSeconds}
          onGenerate={generate}
        />

        <h2 className="text-center text-sm-22 text-black">출석 내역</h2>
        <SearchBar>
          <button
            type="button"
            onClick={() => setDateOpen(true)}
            className="flex h-32 w-[160px] items-center justify-between rounded-8 border border-secondary-1 bg-background-1 px-16 py-8 text-m-14 text-background-2"
          >
            <span>{dateFilter}</span>
            <img src={calendarIcon} alt="" className="h-24 w-24 shrink-0" />
          </button>
          <Dropdown
            value={partFilter}
            onChange={(value) => {
              setPartFilter(value)
              setPage(1)
            }}
            options={PART_OPTIONS}
            placeholder="파트"
          />
        </SearchBar>
        <AttendanceList
          records={visible}
          totalCount={filtered.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onTogglePresent={togglePresent}
          onEditRemark={setRemarkRecord}
        />
      </div>

      <DatePickerModal
        open={dateOpen}
        onClose={() => setDateOpen(false)}
        onConfirm={setDateFilter}
        value={dateFilter}
      />
      <RemarkModal
        open={!!remarkRecord}
        onClose={() => setRemarkRecord(null)}
        onSubmit={() => setRemarkRecord(null)}
        value={remarkRecord?.remark}
      />
    </>
  )
}
