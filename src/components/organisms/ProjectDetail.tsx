import { DetailActions } from '@molecules'
import type { ProjectDetailProps } from '@types'

// 정보 테이블 라벨/값 셀 공통 스타일.
// 값이 길어지면(URL 등) 셀 높이가 늘도록 h-40 대신 min-h-40 + py-8 을 쓰고, 라벨은 행 높이에 맞춰 늘어난다.
// 값 셀은 flex 라서 break-words 로는 긴 URL 이 안 쪼개진다(내부 익명 아이템의 min-width 가 max-content).
// 375px 에서 셀 밖으로 삐져나가지 않도록 break-all 을 쓴다.
// 셀 좌우 패딩은 Figma 기준 375=16 / 800·1280=24, 라벨 열 폭은 세 폭 모두 144 고정이다.
// 행 높이 40 은 행(div)이 갖고 셀은 채우기만 한다 — 셀에 min-h-40 을 주면 행 테두리 1px 이 더해져 41 이 된다.
const LABEL_CELL =
  'flex w-[144px] shrink-0 items-center bg-secondary-1 px-16 text-m-14 text-black sm:px-24'
const VALUE_CELL =
  'flex min-w-px flex-1 items-center break-all px-16 py-8 text-m-14 text-black sm:px-24'

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
      {/* 정보 카드 패딩 — 375 는 16/16, sm 이상은 좌우 32·상하 24 (Figma 1205:14615 · 13654 · 13528).
          아래 이미지·설명 카드는 375 에서도 32/24 라 반응형 분기가 없다(시안 그대로). */}
      <section className="flex flex-col gap-24 overflow-hidden rounded-8 bg-white p-16 sm:px-32 sm:py-24">
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
              <div
                key={row.label}
                className="flex min-h-40 w-full border-b border-secondary-1 last:border-b-0"
              >
                <span className={LABEL_CELL}>{row.label}</span>
                <span className={VALUE_CELL}>{row.value}</span>
              </div>
            ))}
          </div>
          {/* 375 는 참여자 블록이 행 아래로 내려오므로 위쪽 경계선이 필요하고, sm 이상은 우측 열이라 필요 없다. */}
          <div className="flex min-w-px flex-1 items-stretch self-stretch border-t border-secondary-1 sm:border-t-0">
            <span className={LABEL_CELL}>프로젝트 참여자</span>
            {/* 값은 세로 가운데 — 시안 1280 은 160 높이 안 34px 텍스트가 y=63, 375 는 101 안 85px 가 y=8 이다. */}
            <p className="flex min-w-px flex-1 items-center break-words px-16 py-8 text-m-14 text-black sm:px-24">
              {/* part 는 응답에 없어 비어 올 수 있다 — 빈 조각을 그대로 두면 '김ㅇㅇ(14기,,팀장)' 이 된다. */}
              {project.participants
                .map((participant) => {
                  const detail = [
                    `${participant.cohortNumber}기`,
                    participant.part,
                    participant.role,
                  ]
                    .filter(Boolean)
                    .join(', ')
                  return `${participant.name}(${detail})`
                })
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
            className="h-[146px] w-full rounded-8 object-cover sm:h-[210px]"
          />
        ) : (
          <div className="h-[146px] w-full rounded-8 bg-gray-100 sm:h-[210px]" />
        )}
      </section>

      <section className="flex flex-col gap-16 overflow-hidden rounded-8 bg-white px-32 py-24">
        <h3 className="text-sm-18 text-black">프로젝트 설명</h3>
        <p className="min-h-[157px] w-full whitespace-pre-line break-words rounded-8 bg-background-1 p-24 text-m-14 text-black sm:min-h-[210px]">
          {project.description}
        </p>
      </section>
    </div>
  )
}
