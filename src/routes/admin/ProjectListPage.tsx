import { useState } from 'react'
import { COHORT_OPTIONS } from '@constants'
import { Dropdown } from '@atoms'
import { useProjects, usePagination } from '@hooks'
import { ProjectList, SearchBar } from '@organisms'

export function ProjectListPage() {
  const { data: projects } = useProjects()
  const [cohort, setCohort] = useState('')
  // Project 모델엔 파트 개념이 없어 기수(cohortId)만 필터한다. COHORT_OPTIONS value 는 '14기' 형식.
  const filtered = cohort
    ? projects.filter((project) => `${project.cohortId}기` === cohort)
    : projects
  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: filtered.length,
    pageSize: 4,
  })

  const visibleProjects = slice(filtered)

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[90px] pt-32 sm:pb-[120px] lg:pb-[180px]">
        <SearchBar onSearch={() => setPage(1)}>
          <Dropdown
            value={cohort}
            onChange={(value) => {
              setCohort(value)
              setPage(1)
            }}
            options={COHORT_OPTIONS}
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
