import { useState } from 'react'
import { COHORT_OPTIONS, PROJECT_CATEGORY_OPTIONS } from '@constants'
import { useProjects } from '@hooks'
import { ProjectFilterBar, ProjectList } from '@organisms'

const PAGE_SIZE = 4

export function UserProjectListPage() {
  const { data: projects } = useProjects()
  const [cohort, setCohort] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE))
  const visibleProjects = projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-64 px-64 pb-96 pt-48">
      <header className="flex flex-col items-center gap-8">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-h1 text-black">PROJECTS</h1>
        </div>
        <p className="text-sm-18 text-black">프로젝트</p>
      </header>

      <div className="flex flex-col gap-24">
        <ProjectFilterBar
          cohort={cohort}
          filterValue={category}
          onCohortChange={setCohort}
          onFilterChange={setCategory}
          cohortOptions={COHORT_OPTIONS}
          filterOptions={PROJECT_CATEGORY_OPTIONS}
          filterPlaceholder="프로젝트"
          onSearch={() => setPage(1)}
        />
        <ProjectList
          projects={visibleProjects}
          totalCount={projects.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
