import searchIcon from '@/assets/icons/search.svg'
import { FilterSelect } from '@atoms'
import type { ProjectFilterBarProps } from '@types'

// 목록 상단 검색바 — 기수·파트 필터 + 검색.
// 선택지와 검색 동작은 백엔드 연동 시 채운다 (디자인에 목록·입력창이 없다).
export function ProjectFilterBar({
  cohort,
  part,
  onCohortChange,
  onPartChange,
  cohortOptions,
  partOptions,
  onSearch,
}: ProjectFilterBarProps) {
  return (
    <div className="flex w-full items-center justify-between overflow-hidden rounded-16 bg-white px-32 py-12">
      <div className="flex items-center gap-24">
        <FilterSelect
          value={cohort}
          onChange={(event) => onCohortChange(event.target.value)}
          options={cohortOptions}
          placeholder="기수"
          className="w-[120px]"
        />
        <FilterSelect
          value={part}
          onChange={(event) => onPartChange(event.target.value)}
          options={partOptions}
          placeholder="파트"
          className="w-[120px]"
        />
      </div>
      <button type="button" onClick={onSearch} aria-label="검색">
        <img src={searchIcon} alt="" className="h-40 w-24" />
      </button>
    </div>
  )
}
