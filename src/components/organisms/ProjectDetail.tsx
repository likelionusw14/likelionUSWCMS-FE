import { Link } from 'react-router-dom'
import type { ProjectDetailProps } from '@types'

// 정보 테이블 라벨 셀 공통 스타일.
const LABEL_CELL =
  'flex h-40 w-[144px] shrink-0 items-center bg-secondary-1 px-24 text-m-14 text-black'
const VALUE_CELL = 'flex h-40 min-w-px flex-1 items-center px-24 text-m-14 text-black'

// 프로젝트 상세 — 정보 테이블 + 이미지 + 설명.
export function ProjectDetail({ project }: ProjectDetailProps) {
  const rows = [
    { label: '태그', value: project.tags.join(', ') },
    {
      label: '제작기간',
      value: `${project.developedYear}.${String(project.developedMonth).padStart(2, '0')}`,
    },
    { label: '깃허브 URL', value: project.githubUrl },
    { label: '프로젝트 URL', value: project.deployUrl },
  ]

  return (
    <div className="flex flex-col gap-16 px-24 pb-[120px] pt-32">
      <section className="flex flex-col gap-24 overflow-hidden rounded-8 bg-white px-32 py-24">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm-20 text-black">{project.title}</h2>
          <div className="flex items-center gap-8">
            <Link
              to="/admin/projects"
              className="flex h-32 items-center rounded-8 border border-primary px-16 text-m-14 text-primary"
            >
              목록
            </Link>
            <Link
              to={`/admin/projects/${project.id}/edit`}
              className="flex h-32 items-center rounded-8 bg-primary px-16 text-m-14 text-white"
            >
              수정
            </Link>
          </div>
        </div>
        <div className="flex w-full items-start rounded-8 border border-secondary-1">
          <div className="flex min-w-px flex-1 flex-col">
            {rows.map((row) => (
              <div key={row.label} className="flex w-full items-center border-b border-secondary-1">
                <span className={LABEL_CELL}>{row.label}</span>
                <span className={VALUE_CELL}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="flex min-w-px flex-1 items-stretch self-stretch">
            <span className="flex w-[144px] shrink-0 items-center bg-secondary-1 px-24 text-m-14 text-black">
              프로젝트 참여자
            </span>
            <p className="min-w-px flex-1 px-24 py-12 text-m-14 text-black">
              {project.participants
                .map(
                  (participant) =>
                    `${participant.name}(${participant.cohortId}기,${participant.part},${participant.role})`,
                )
                .join(', ')}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-16 overflow-hidden rounded-8 bg-white px-32 py-24">
        <h3 className="text-sm-18 text-black">프로젝트 이미지</h3>
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={`${project.title} 대표 이미지`}
            className="h-[210px] w-full rounded-8 object-cover"
          />
        ) : (
          <div className="h-[210px] w-full rounded-8 bg-gray-100" />
        )}
      </section>

      <section className="flex flex-col gap-16 overflow-hidden rounded-8 bg-white px-32 py-24">
        <h3 className="text-sm-18 text-black">프로젝트 설명</h3>
        <p className="min-h-[210px] w-full rounded-8 bg-background-1 p-24 text-m-14 text-black">
          {project.description}
        </p>
      </section>
    </div>
  )
}
