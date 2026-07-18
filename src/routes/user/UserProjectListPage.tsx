import { PROJECT_COHORT_OPTIONS, USER_PROJECT_TYPE_OPTIONS } from '@constants'
import { useUserProjectListPage } from '@hooks'
import { ProjectFilterBar, ProjectList } from '@organisms'

export function UserProjectListPage() {
  const { data, cohort, projectType, page, setCohort, setProjectType, setPage, resetPage } =
    useUserProjectListPage()

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
          filterValue={projectType}
          onCohortChange={setCohort}
          onFilterChange={setProjectType}
          cohortOptions={PROJECT_COHORT_OPTIONS}
          filterOptions={USER_PROJECT_TYPE_OPTIONS}
          filterPlaceholder="프로젝트"
          onSearch={resetPage}
        />
        <ProjectList
          projects={data.content}
          totalCount={data.totalElements}
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
          detailBasePath="/app/projects"
        />
      </div>
    </div>
  )
}
