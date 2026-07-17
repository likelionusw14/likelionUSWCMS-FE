import { Link } from 'react-router-dom'
import plusIcon from '@/assets/icons/plus.svg'
import { Pagination, ProjectCard } from '@molecules'
import type { ProjectListProps } from '@types'

// 프로젝트 목록 — 건수 + 등록 버튼 + 카드 그리드 + 페이지네이션.
export function ProjectList({
  projects,
  totalCount,
  page,
  totalPages,
  onPageChange,
  detailBasePath,
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
      {projects.length > 0 ? (
        <>
          <div className="grid w-full grid-cols-1 gap-x-[29px] gap-y-[59px] lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                detailPath={`${detailBasePath}/${project.id}`}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={Math.max(1, totalPages)}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="flex min-h-[240px] items-center justify-center rounded-8 bg-background-1 px-24 text-center text-m-18 text-gray-700">
          조건에 맞는 프로젝트가 없습니다.
          <br />
          다른 기수나 태그를 선택해 주세요.
        </div>
      )}
    </div>
  )
}
