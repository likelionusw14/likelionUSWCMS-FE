import { useState } from 'react'
import { COHORT_OPTIONS, PART_OPTIONS } from '@constants'
import { Dropdown } from '@atoms'
import { useProjects } from '@hooks'
import { ProjectList, SearchBar } from '@organisms'

const PAGE_SIZE = 4

export function ProjectListPage() {
  const { data: projects } = useProjects()
  const [cohort, setCohort] = useState('')
  const [part, setPart] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE))
  const visibleProjects = projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

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
