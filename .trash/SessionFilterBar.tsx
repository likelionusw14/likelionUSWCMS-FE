import searchIcon from '@/assets/icons/search.svg'
import { Dropdown } from '@atoms'
import type { SessionFilterBarProps } from '@types'

// 세션자료 목록 상단 검색바 — 주차·파트 필터 + 검색.
// 검색 동작은 백엔드 연동 시 채운다 (지금은 목록을 첫 페이지로 되돌리기만 한다).
export function SessionFilterBar({
  week,
  part,
  onWeekChange,
  onPartChange,
  weekOptions,
  partOptions,
  onSearch,
}: SessionFilterBarProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-16 bg-white px-32 py-12">
      <div className="flex items-center gap-16">
        <Dropdown value={week} onChange={onWeekChange} options={weekOptions} placeholder="주차" />
        <Dropdown value={part} onChange={onPartChange} options={partOptions} placeholder="파트" />
      </div>
      <button type="button" onClick={onSearch} aria-label="검색">
        <img src={searchIcon} alt="" className="h-40 w-24" />
      </button>
    </div>
  )
}
