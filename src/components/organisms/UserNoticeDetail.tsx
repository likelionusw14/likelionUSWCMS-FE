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
    <WindowPanel bodyClassName="flex flex-col gap-24 p-32">
      <div className="flex flex-wrap items-start justify-between gap-x-24 gap-y-8">
        <div className="w-max max-w-full shrink-0">
          <h2 className="break-words text-sm-20 text-black">{notice.title}</h2>
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
