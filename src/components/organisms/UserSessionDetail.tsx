import { WindowPanel } from '@atoms'
import type { UserSessionDetailProps } from '@types'

function PreviewPlaceholder() {
  return (
    <div
      aria-label="자료 미리보기 준비 중"
      className="grid aspect-[16/9] w-full grid-cols-[repeat(16,minmax(0,1fr))] overflow-hidden"
    >
      {Array.from({ length: 144 }, (_, index) => {
        const row = Math.floor(index / 16)
        const column = index % 16
        const isGray = (row + column) % 2 === 0

        return (
          <span
            key={index}
            aria-hidden="true"
            className={isGray ? 'aspect-square bg-gray-100' : 'aspect-square bg-white'}
          />
        )
      })}
    </div>
  )
}

export function UserSessionDetail({ session }: UserSessionDetailProps) {
  const pageText = session.pageCount ? `Page (1/${session.pageCount})` : 'Page'
  const isImage = session.mimeType.startsWith('image/')

  return (
    <WindowPanel bodyClassName="flex flex-col gap-24 p-32">
      <div className="flex items-center gap-24">
        <h2 className="min-w-0 truncate text-sm-18 text-black">{session.fileName}</h2>
        <p className="shrink-0 text-m-16 text-gray-500">{pageText}</p>
      </div>
      {session.previewUrl && isImage ? (
        <img
          src={session.previewUrl}
          alt={`${session.title} 미리보기`}
          className="max-h-screen w-full object-contain"
        />
      ) : session.previewUrl ? (
        <iframe
          src={session.previewUrl}
          title={`${session.title} 미리보기`}
          className="aspect-[16/9] w-full border-0 bg-gray-100"
        />
      ) : (
        <PreviewPlaceholder />
      )}
    </WindowPanel>
  )
}
