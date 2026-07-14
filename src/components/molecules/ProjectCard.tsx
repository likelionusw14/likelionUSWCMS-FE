import { Link } from 'react-router-dom'
import { Chip, WindowPanel } from '@atoms'
import { cn } from '@utils'
import type { ProjectCardProps } from '@types'

// 프로젝트 목록 카드 — 창 패널 안에 대표 이미지 + 제목/기간 + 설명 + 해시태그.
export function ProjectCard({ project, className }: ProjectCardProps) {
  const [coverImage] = project.imageUrls

  return (
    <Link to={`/admin/projects/${project.id}`} className={cn('block', className)}>
      {/* 카드가 디자인(555px)보다 넓어지면 이미지도 같이 커지므로 높이는 최소값으로 두고,
          gap-24 로 설명·태그가 붙지 않을 최소 간격을 준다. */}
      <WindowPanel bodyClassName="flex min-h-[574px] flex-col justify-between gap-24">
        {coverImage ? (
          <img src={coverImage} alt="" className="aspect-[484/272] w-full rounded-8 object-cover" />
        ) : (
          <div className="aspect-[484/272] w-full rounded-8 bg-gray-100" />
        )}
        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center gap-16">
            <h2 className="text-sm-22 text-black">{project.name}</h2>
            <p className="text-m-16-home text-secondary-2">
              {project.startDate} ~ {project.endDate}
            </p>
          </div>
          <p className="text-m-16-home text-black">{project.description}</p>
        </div>
        <div className="flex w-full gap-8">
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      </WindowPanel>
    </Link>
  )
}
