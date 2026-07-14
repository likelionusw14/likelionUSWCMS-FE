import { useState } from 'react'
import { COHORT_OPTIONS, PART_OPTIONS } from '@constants'
import { useProjects } from '@hooks'
import { AdminTopBar, ProjectFilterBar, ProjectList } from '@organisms'

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
      <AdminTopBar breadcrumb="홈 / 프로젝트 관리" title="프로젝트 관리" />
      <div className="flex flex-col gap-24 px-24 pb-[120px] pt-32">
        <ProjectFilterBar
          cohort={cohort}
          part={part}
          onCohortChange={setCohort}
          onPartChange={setPart}
          cohortOptions={COHORT_OPTIONS}
          partOptions={PART_OPTIONS}
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
    </>
  )
}
