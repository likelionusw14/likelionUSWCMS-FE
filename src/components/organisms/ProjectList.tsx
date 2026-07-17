import { useNavigate } from 'react-router-dom'
import { ProjectCard } from '@molecules'
import { ListSection } from './ListSection'
import type { ProjectListProps } from '@types'

// 프로젝트 목록 — 건수(총 X건) + 등록 버튼 + 카드 그리드(2열) + 페이지네이션.
export function ProjectList({
  projects,
  totalCount,
  page,
  totalPages,
  onPageChange,
}: ProjectListProps) {
  const navigate = useNavigate()

  return (
    <ListSection
      totalCount={totalCount}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      hidePageInfo
      onAdd={() => navigate('/admin/projects/new')}
    >
      <div className="grid w-full grid-cols-1 gap-x-[29px] gap-y-[59px] lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </ListSection>
  )
}
