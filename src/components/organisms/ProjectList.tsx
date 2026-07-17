import { Link } from 'react-router-dom'
import plusIcon from '@/assets/icons/plus.svg'
import { Pagination, ProjectCard } from '@molecules'
import type { ProjectListProps } from '@types'

// 프로젝트 목록 — 건수 + 등록 버튼(옵션) + 카드 그리드 + 페이지네이션.
// 관리자·사용자 화면이 공유한다 (createPath 있으면 등록 버튼 표시, 없으면 숨김).
export function ProjectList({
  projects,
  totalCount,
  page,
  totalPages,
  onPageChange,
  createPath,
}: ProjectListProps) {
  return (
    <div className="flex w-full flex-col justify-center gap-24 rounded-16 bg-white p-24">
      <div className="flex w-full items-center justify-between">
        <p className="text-m-14 text-black">총 {totalCount}건</p>
        {createPath && (
          <Link
            to={createPath}
            aria-label="프로젝트 등록"
            className="flex h-40 w-40 items-center justify-center"
          >
            <img src={plusIcon} alt="" className="h-16 w-16" />
          </Link>
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-x-[29px] gap-y-[59px] lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}
