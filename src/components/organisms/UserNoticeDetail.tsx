import { WindowPanel } from '@atoms'
import type { UserNoticeDetailProps } from '@types'

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value))
}

export function UserNoticeDetail({ notice }: UserNoticeDetailProps) {
  return (
    <WindowPanel bodyClassName="flex flex-col gap-24">
      {/* 모바일(375): 제목이 태그와 한 줄을 다투면 63px 까지 눌려 읽을 수 없다 — 세로로 쌓고 sm 이상에서만 양끝 정렬. */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-24">
        <div className="min-w-0">
          <h2 className="truncate text-sm-20 text-black">{notice.title}</h2>
          <p className="mt-4 text-r-14 text-gray-500">{formatDateTime(notice.publishedAt)}</p>
        </div>
        <p className="shrink-0 text-sm-16 text-secondary-2"># {notice.tagLabel}</p>
      </div>

      <div className="min-h-[360px] whitespace-pre-wrap rounded-16 bg-background-1 p-24 text-m-16-home text-black">
        {notice.content}
      </div>

      {notice.externalUrl && (
        <a
          href={notice.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="self-end text-m-14 text-primary underline"
        >
          관련 링크 열기
        </a>
      )}
    </WindowPanel>
  )
}
