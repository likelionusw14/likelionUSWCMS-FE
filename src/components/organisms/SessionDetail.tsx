import { Link } from 'react-router-dom'
import closeIcon from '@/assets/icons/close.svg'
import { DetailActions } from '@molecules'
import type { SessionDetailProps } from '@types'

// 세션자료 상세 — 파일명 헤더 + 자료 뷰어(쪽 표시줄 + 미리보기).
export function SessionDetail({ session }: SessionDetailProps) {
  return (
    <div className="flex flex-col">
      {/* 카드 패딩 — 모바일 16 / sm 이상 좌우 32·상하 24 (Figma 1205:17642 · 1205:17457). */}
      <section className="flex flex-col gap-16 overflow-hidden rounded-8 bg-white p-16 sm:px-32 sm:py-24">
        <div className="flex w-full items-center justify-between gap-8">
          <div className="flex min-w-px flex-1 items-center gap-8">
            <Link
              to="/admin/sessions"
              aria-label="닫기"
              className="flex h-24 w-24 shrink-0 items-center justify-center"
            >
              <img src={closeIcon} alt="" className="h-24 w-24" />
            </Link>
            <h2 className="truncate text-sm-20 text-black">{session.fileName}</h2>
          </div>
          <DetailActions
            listHref="/admin/sessions"
            editHref={`/admin/sessions/${session.id}/edit`}
          />
        </div>
        {/* 뷰어 — 쪽 표시줄이 미리보기 위에 얹힌다. 미리보기가 없으면 회색 판만 보인다. */}
        {/* 높이는 Figma 실측대로 375=222 / 800=452 / 1280=584 (1205:17642 · 17457 · 17279).
            sm:h-[584px] 하나로 두면 800 에서 452 가 아니라 584 가 돼 카드가 132px 길어진다. */}
        <div className="relative h-[222px] w-full overflow-hidden rounded-8 bg-gray-100 sm:h-[452px] lg:h-[584px]">
          {session.previewUrl ? (
            <img
              src={session.previewUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <p className="relative flex h-40 w-full items-center bg-secondary-1 px-24 py-8 text-m-14 text-black">
            Page (1/{session.pageCount})
          </p>
        </div>
      </section>
    </div>
  )
}
