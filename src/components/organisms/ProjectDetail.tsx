import { DetailActions } from '@molecules'
import type { ProjectDetailProps } from '@types'

// 정보 테이블 라벨/값 셀 공통 스타일.
// 값이 길어지면(URL 등) 셀 높이가 늘도록 h-40 대신 min-h-40 + py-8 을 쓰고, 라벨은 행 높이에 맞춰 늘어난다.
// 값 셀은 flex 라서 break-words 로는 긴 URL 이 안 쪼개진다(내부 익명 아이템의 min-width 가 max-content).
// 375px 에서 셀 밖으로 삐져나가지 않도록 break-all 을 쓴다.
const LABEL_CELL =
  'flex min-h-40 w-[144px] shrink-0 items-center bg-secondary-1 px-24 text-m-14 text-black'
const VALUE_CELL =
  'flex min-h-40 min-w-px flex-1 items-center break-all px-24 py-8 text-m-14 text-black'

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
    <div className="flex flex-col gap-16">
      {/* 카드 패딩은 모바일 24 → sm 이상 32 (Figma 375: 1205:14615). */}
      <section className="flex flex-col gap-24 overflow-hidden rounded-8 bg-white p-24 sm:px-32">
        <div className="flex w-full items-center justify-between gap-8">
          {/* 제목이 길어도 목록/수정 버튼을 밀어내지 않도록 남는 폭만 차지하고 말줄임 처리한다. */}
          <h2 className="min-w-px flex-1 truncate text-sm-20 text-black">{project.title}</h2>
          <DetailActions
            listHref="/admin/projects"
            editHref={`/admin/projects/${project.id}/edit`}
          />
        </div>
        {/* 정보표: 모바일은 세로 1열(참여자 블록이 아래로 내려감), sm 이상에서만 좌우 2열로 붙인다. */}
        <div className="flex w-full flex-col rounded-8 border border-secondary-1 sm:flex-row sm:items-start">
          <div className="flex min-w-px flex-1 flex-col">
            {rows.map((row) => (
              <div key={row.label} className="flex w-full border-b border-secondary-1">
                <span className={LABEL_CELL}>{row.label}</span>
                <span className={VALUE_CELL}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="flex min-w-px flex-1 items-stretch self-stretch">
            <span className="flex w-[144px] shrink-0 items-center bg-secondary-1 px-24 text-m-14 text-black">
              프로젝트 참여자
            </span>
            <p className="min-w-px flex-1 break-words px-24 py-12 text-m-14 text-black">
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

      <section className="flex flex-col gap-16 overflow-hidden rounded-8 bg-white p-24 sm:px-32">
        <h3 className="text-sm-18 text-black">프로젝트 이미지</h3>
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={`${project.title} 대표 이미지`}
            className="h-[146px] w-full rounded-8 object-cover sm:h-[210px]"
          />
        ) : (
          <div className="h-[146px] w-full rounded-8 bg-gray-100 sm:h-[210px]" />
        )}
      </section>

      <section className="flex flex-col gap-16 overflow-hidden rounded-8 bg-white p-24 sm:px-32">
        <h3 className="text-sm-18 text-black">프로젝트 설명</h3>
        <p className="min-h-[157px] w-full whitespace-pre-line break-words rounded-8 bg-background-1 p-24 text-m-14 text-black sm:min-h-[210px]">
          {project.description}
        </p>
      </section>
    </div>
  )
}
