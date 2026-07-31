import searchIcon from '@/assets/icons/search.svg'
import { Dropdown } from '@atoms'
import type { UserSessionFilterBarProps } from '@types'

export function UserSessionFilterBar({
  week,
  part,
  weekOptions,
  partOptions,
  onWeekChange,
  onPartChange,
  onSearch,
}: UserSessionFilterBarProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-16 bg-white px-12 py-12 sm:px-32">
      <div className="flex min-w-0 items-center gap-16 sm:gap-24">
        <Dropdown value={week} onChange={onWeekChange} options={weekOptions} placeholder="주차" />
        <Dropdown value={part} onChange={onPartChange} options={partOptions} placeholder="파트" />
      </div>
      <button type="button" onClick={onSearch} aria-label="검색" className="shrink-0">
        <img src={searchIcon} alt="" className="h-40 w-24" />
      </button>
    </div>
  )
}
