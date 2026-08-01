import { useEffect, useState } from 'react'
import { WindowPanel } from '@atoms'
import type { UserProjectDetailProps } from '@types'
import cameraIcon from '@/assets/icons/camera-white.png'

const INFO_ROW =
  'flex min-h-64 flex-wrap items-center justify-between gap-y-8 border-b border-secondary-1 py-16 last:border-b-0'
const INFO_LABEL = 'w-[112px] shrink-0 text-sm-18 text-black sm:w-[160px]'
const INFO_VALUE =
  'w-max max-w-full shrink-0 break-words text-left text-m-16 text-gray-500 [overflow-wrap:anywhere]'

export function UserProjectDetail({ project }: UserProjectDetailProps) {
  const initialImage = project.imageUrls[0] ?? project.thumbnailUrl
  const projectImages = project.imageUrls.length
    ? project.imageUrls
    : project.thumbnailUrl
      ? [project.thumbnailUrl]
      : []
  const [selectedImage, setSelectedImage] = useState(initialImage)

  useEffect(() => {
    setSelectedImage(initialImage)
  }, [project.id, initialImage])

  const developedDate = `${project.startedMonth.replace('-', '.')} - ${project.endedMonth.replace('-', '.')}`
  const participants = project.participants
    .map((participant) => `${participant.name}(${participant.role})`)
    .join(', ')

  return (
    <article className="flex flex-col gap-40 sm:gap-48">
      <WindowPanel headerClassName="h-32" bodyClassName="flex flex-col gap-8 !p-0">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={`${project.title} 대표 이미지`}
            className="aspect-[1120/630] w-full object-cover"
          />
        ) : (
          <div className="aspect-[1120/630] w-full bg-gray-100" />
        )}
        <div className="flex w-full gap-8 overflow-hidden px-8 sm:px-16">
          {projectImages.map((imageUrl, index) => (
            <button
              key={`${imageUrl}-${index}`}
              type="button"
              onClick={() => setSelectedImage(imageUrl)}
              aria-label={`${index + 1}번째 프로젝트 이미지 보기`}
              aria-pressed={selectedImage === imageUrl}
              className="aspect-[16/9] w-[104px] shrink-0 overflow-hidden rounded-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={imageUrl}
                alt={`${project.title} 프로젝트 이미지 ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
        <div className="flex justify-center py-8">
          <span className="flex h-64 w-64 items-center justify-center rounded-full bg-primary">
            <img src={cameraIcon} alt="" className="h-32 w-auto" />
          </span>
        </div>
      </WindowPanel>

      <section className="flex flex-col gap-24">
        <h2 className="break-words text-sm-22 text-black sm:text-h1">{project.title}</h2>
        <p className="whitespace-pre-wrap break-words rounded-16 bg-white p-16 text-m-16-home text-black sm:p-24 sm:text-m-18-body">
          {project.description}
        </p>
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
