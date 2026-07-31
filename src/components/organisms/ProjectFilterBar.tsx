import searchIcon from '@/assets/icons/search.svg'
import { Dropdown } from '@atoms'
import type { ProjectFilterBarProps } from '@types'

// 목록 상단 검색바 — 기수·분류 필터 + 검색.
// 검색 동작은 백엔드 연동 시 채운다 (디자인에 입력창이 없다).
export function ProjectFilterBar({
  cohort,
  filterValue,
  onCohortChange,
  onFilterChange,
  cohortOptions,
  filterOptions,
  filterPlaceholder,
  onSearch,
}: ProjectFilterBarProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-16 bg-white px-12 py-12 sm:px-32">
      <div className="flex min-w-0 flex-row-reverse items-center gap-16 sm:gap-24 lg:flex-row">
        <Dropdown
          value={cohort}
          onChange={onCohortChange}
          options={cohortOptions}
          placeholder="기수"
        />
        <Dropdown
          value={filterValue}
          onChange={onFilterChange}
          options={filterOptions}
          placeholder={filterPlaceholder}
        />
      </div>
      <button type="button" onClick={onSearch} aria-label="검색">
        <img src={searchIcon} alt="" className="h-40 w-24" />
      </button>
    </div>
  )
}
