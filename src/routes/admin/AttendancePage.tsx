import calendarIcon from '@/assets/icons/calendar.svg'
import { Dropdown } from '@atoms'
import { DatePickerModal, RemarkModal } from '@molecules'
import { AttendanceCodeCreate, AttendanceList, SearchBar } from '@organisms'
import { useAttendanceCode, useAttendanceList } from '@hooks'
import { PART_OPTIONS } from '@constants'

// 출결 관리 — 출석 코드 생성 카드 + (출석 내역 제목 + 검색바 + 출석 내역 카드). Figma 29:18174 / 563:9299.
export function AttendancePage() {
  const { code, remainingSeconds, generate } = useAttendanceCode()
  const {
    records,
    totalCount,
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
  } = useAttendanceList()

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[90px] pt-32 sm:px-32 sm:pb-[120px] lg:px-24 lg:pb-[180px]">
        <AttendanceCodeCreate
          code={code}
          remainingSeconds={remainingSeconds}
          onGenerate={generate}
        />

        <h2 className="text-center text-sm-22 text-black">출석 내역</h2>
        <SearchBar onSearch={() => setPage(1)}>
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
          records={records}
          totalCount={totalCount}
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
        onSubmit={saveRemark}
        value={remarkRecord?.remark}
      />
    </>
  )
}
