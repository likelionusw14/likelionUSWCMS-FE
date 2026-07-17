import { useState } from 'react'
import searchIcon from '@/assets/icons/search.svg'
import { RemarkModal } from '@molecules'
import { AdminTopBar, AttendanceCodeCreate, AttendanceList } from '@organisms'
import { useAttendance, useAttendanceCode } from '@hooks'
import type { AttendanceRecord } from '@types'

const PAGE_SIZE = 10

// 출결 관리 — 출석 코드 생성 + 출석 내역(출석 토글·비고). Figma 29:18174.
export function AttendancePage() {
  const { code, remainingSeconds, generate } = useAttendanceCode()
  const { data } = useAttendance()
  const [records, setRecords] = useState<AttendanceRecord[]>(data)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [remarkRecord, setRemarkRecord] = useState<AttendanceRecord | null>(null)

  const keyword = query.trim()
  const filtered = keyword
    ? records.filter(
        (record) => record.name.includes(keyword) || record.studentId.includes(keyword),
      )
    : records
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
      <AdminTopBar breadcrumb="홈 / 출결 관리" title="출결 관리" />
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <AttendanceCodeCreate
          code={code}
          remainingSeconds={remainingSeconds}
          onGenerate={generate}
        />
        <div className="flex w-full items-center gap-16 rounded-16 bg-white px-32 py-12">
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="이름 · 학번 검색"
            className="h-40 min-w-px flex-1 bg-transparent text-m-14 text-black placeholder:text-gray-500 focus:outline-none"
          />
          <button type="button" aria-label="검색" className="shrink-0">
            <img src={searchIcon} alt="" className="h-40 w-24" />
          </button>
        </div>
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

      <RemarkModal
        open={!!remarkRecord}
        onClose={() => setRemarkRecord(null)}
        onSubmit={() => setRemarkRecord(null)}
        value={remarkRecord?.remark}
      />
    </>
  )
}
