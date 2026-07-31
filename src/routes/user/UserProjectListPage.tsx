import { useLocation } from 'react-router-dom'
import { PROJECT_COHORT_OPTIONS, USER_PROJECT_TYPE_OPTIONS } from '@constants'
import { useUserProjectListPage } from '@hooks'
import { ProjectFilterBar, ProjectList } from '@organisms'

// 멤버(/app/projects)·게스트(/projects)가 같은 목록을 공유한다. 상세 링크 베이스는 현재 라우트에서 딴다.
export function UserProjectListPage() {
  const { pathname } = useLocation()
  const { data, cohort, projectType, page, setCohort, setProjectType, setPage, resetPage } =
    useUserProjectListPage()

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-48 px-24 pb-96 pt-40 sm:gap-64 sm:px-32 sm:pt-48 lg:px-64">
      <header className="flex flex-col items-center">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-sm-22 text-black sm:text-h1">PROJECTS</h1>
        </div>
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
          detailBasePath={pathname}
        />
      </div>
    </div>
  )
}
