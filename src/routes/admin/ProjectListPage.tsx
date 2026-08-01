import { useState } from 'react'
import { Dropdown } from '@atoms'
import { useCohorts, useProjects, usePagination } from '@hooks'
import { ProjectList, SearchBar } from '@organisms'

export function ProjectListPage() {
  const { data: projects } = useProjects()
  const cohorts = useCohorts()
  const [cohort, setCohort] = useState('')
  // Project 모델엔 파트 개념이 없어 기수(cohortId)만 필터한다.
  // 선택지 value 가 곧 cohortId 라 ID 로 비교한다 — 라벨('14기')과 ID(1)는 다르다.
  const filtered = cohort
    ? projects.filter((project) => String(project.cohortId) === cohort)
    : projects
  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: filtered.length,
    pageSize: 4,
  })

  const visibleProjects = slice(filtered)

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[90px] pt-32 min-[376px]:pb-[120px] lg:pb-[180px]">
        <SearchBar onSearch={() => setPage(1)}>
          <Dropdown
            value={cohort}
            onChange={(value) => {
              setCohort(value)
              setPage(1)
            }}
            options={cohorts.data}
            placeholder="기수"
          />
        </SearchBar>
        <ProjectList
          projects={visibleProjects}
          totalCount={filtered.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          detailBasePath="/admin/projects"
          createPath="/admin/projects/new"
        />
      </div>
    </>
  )
}
