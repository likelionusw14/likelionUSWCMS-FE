import searchIcon from '@/assets/icons/search.svg'
import { Dropdown } from '@atoms'
import type { UserNoticeFilterBarProps } from '@types'

export function UserNoticeFilterBar({
  tag,
  tagOptions,
  onTagChange,
  onSearch,
}: UserNoticeFilterBarProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-16 bg-white px-12 py-12 sm:px-32">
      <Dropdown value={tag} onChange={onTagChange} options={tagOptions} placeholder="태그" />
      <button type="button" onClick={onSearch} aria-label="검색" className="shrink-0">
        <img src={searchIcon} alt="" className="h-40 w-24" />
      </button>
    </div>
  )
}
