import { WindowPanel } from '@atoms'
import type { UserProjectDetailProps } from '@types'
import cameraIcon from '@/assets/icons/camera-white.png'

const INFO_ROW = 'flex min-h-64 items-center border-b border-secondary-1 py-16 last:border-b-0'
const INFO_LABEL = 'w-[160px] shrink-0 text-sm-18 text-black'
const INFO_VALUE = 'min-w-px flex-1 text-right text-m-16 text-gray-500'

export function UserProjectDetail({ project }: UserProjectDetailProps) {
  const developedDate = `${project.startedMonth.replace('-', '.')} - ${project.endedMonth.replace('-', '.')}`
  const participants = project.participants
    .map((participant) => `${participant.name}(${participant.role})`)
    .join(', ')

  return (
    <article className="flex flex-col gap-48">
      <WindowPanel bodyClassName="flex flex-col gap-16 p-16">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={`${project.title} 대표 이미지`}
            className="aspect-[1120/630] w-full rounded-8 object-cover"
          />
        ) : (
          <div className="aspect-[1120/630] w-full rounded-8 bg-gray-100" />
        )}
        <div className="grid grid-cols-5 gap-16">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt="선택된 프로젝트 이미지"
              className="aspect-[16/9] w-full rounded-4 object-cover"
            />
          ) : (
            <div aria-hidden="true" className="aspect-[16/9] w-full rounded-4 bg-gray-100" />
          )}
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              aria-hidden="true"
              className="aspect-[16/9] w-full rounded-4 bg-gray-100"
            />
          ))}
        </div>
        <div className="flex justify-center py-8">
          <span className="flex h-64 w-64 items-center justify-center rounded-full bg-primary">
            <img src={cameraIcon} alt="" className="h-32 w-auto" />
          </span>
        </div>
      </WindowPanel>

      <section className="flex flex-col gap-24">
        <h2 className="text-h1 text-black">{project.title}</h2>
        <p className="rounded-16 bg-white p-24 text-m-18-body text-black">{project.description}</p>
      </section>

      <dl>
        <div className={INFO_ROW}>
          <dt className={INFO_LABEL}>Lions</dt>
          <dd className={INFO_VALUE}>{participants}</dd>
        </div>
        <div className={INFO_ROW}>
          <dt className={INFO_LABEL}>Duration</dt>
          <dd className={INFO_VALUE}>{developedDate}</dd>
        </div>
        <div className={INFO_ROW}>
          <dt className={INFO_LABEL}>Link</dt>
          <dd className={INFO_VALUE}>
            {project.deployUrl ? (
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                {project.deployUrl}
              </a>
            ) : (
              '등록된 링크가 없습니다.'
            )}
          </dd>
        </div>
        <div className={INFO_ROW}>
          <dt className={INFO_LABEL}>GitHub</dt>
          <dd className={INFO_VALUE}>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                {project.githubUrl}
              </a>
            ) : (
              '등록된 링크가 없습니다.'
            )}
          </dd>
        </div>
      </dl>
    </article>
  )
}
