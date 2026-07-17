import { useState } from 'react'
import { COHORT_OPTIONS, PART_OPTIONS } from '@constants'
import { Dropdown } from '@atoms'
import { useProjects, usePagination } from '@hooks'
import { ProjectList, SearchBar } from '@organisms'


export function ProjectListPage() {
  const { data: projects } = useProjects()
  const [cohort, setCohort] = useState('')
  const [part, setPart] = useState('')
  const { page, setPage, totalPages, slice } = usePagination({
    totalItems: projects.length,
    pageSize: 4,
  })

  const visibleProjects = slice(projects)

  return (
    <>
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <SearchBar onSearch={() => setPage(1)}>
          <Dropdown
            value={cohort}
            onChange={setCohort}
            options={COHORT_OPTIONS}
            placeholder="기수"
          />
          <Dropdown value={part} onChange={setPart} options={PART_OPTIONS} placeholder="파트" />
        </SearchBar>
        <ProjectList
          projects={visibleProjects}
          totalCount={projects.length}
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
