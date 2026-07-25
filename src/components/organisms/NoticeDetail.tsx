import { DetailActions } from '@molecules'
import type { NoticeDetailProps } from '@types'

// 정보표 라벨/값 셀 (라벨 secondary-1 144px + 값 fill).
// 값이 두 줄 이상으로 늘어날 수 있어 h-40 대신 min-h-40 + py-8 을 쓰고, 라벨은 행 높이만큼 늘어난다.
// 값 셀은 flex 라서 break-words 로는 긴 첨부 URL 이 안 쪼개진다 → 375px 대응으로 break-all 을 쓴다.
const LABEL =
  'flex min-h-40 w-[144px] shrink-0 items-center bg-secondary-1 px-24 text-m-14 text-black'
const VALUE = 'flex min-h-40 min-w-px flex-1 items-center break-all px-24 py-8 text-m-14 text-black'

// 공지 상세 — 제목 + 목록/수정 버튼 + 태그·작성일·첨부 정보표 + 공지내용. Figma 5:1369.
export function NoticeDetail({ notice }: NoticeDetailProps) {
  return (
    <div className="flex w-full flex-col gap-16">
      {/* 타이틀 카드 — 패딩은 모바일 24 → sm 이상 32 (Figma 375: 1205:20322). */}
      <div className="flex w-full flex-col items-end gap-16 rounded-8 bg-white p-24 sm:px-32">
        <div className="flex w-full items-center justify-between gap-8">
          {/* 제목이 길어도 목록/수정 버튼을 밀어내지 않도록 남는 폭만 차지하고 말줄임 처리한다. */}
          <h2 className="min-w-px flex-1 truncate text-sm-20 text-black">{notice.title}</h2>
          <DetailActions listHref="/admin/notices" editHref={`/admin/notices/${notice.id}/edit`} />
        </div>

        <div className="w-full overflow-hidden rounded-8 border border-secondary-1">
          {/* 태그/작성일은 Figma 실측상 1280 에서만 한 줄 2열이고, 800·375 는 세로로 쌓인다
              (800: 1205:20094/20099 가 y=0/40 으로 스택). 그래서 경계가 sm 이 아니라 lg 다. */}
          <div className="flex w-full flex-col border-b border-secondary-1 lg:flex-row">
            <div className="flex min-w-px flex-1 border-b border-secondary-1 lg:border-b-0">
              <span className={LABEL}>태그</span>
              <span className={VALUE}>{notice.tag}</span>
            </div>
            <div className="flex min-w-px flex-1">
              <span className={LABEL}>작성일</span>
              <span className={VALUE}>{notice.createdAt}</span>
            </div>
          </div>
          <div className="flex w-full">
            <span className={LABEL}>첨부 링크</span>
            <span className={VALUE}>{notice.fileName || '-'}</span>
          </div>
        </div>
      </div>

      {/* 공지내용 카드 — 패딩은 모바일 24 → sm 이상 32. */}
      <div className="flex w-full flex-col gap-16 rounded-8 bg-white p-24 sm:px-32">
        <h3 className="text-sm-18 text-black">공지내용</h3>
        <div className="min-h-[333px] w-full whitespace-pre-line break-words rounded-8 bg-background-1 p-24 text-m-14 text-black">
          {notice.content}
        </div>
      </div>
    </div>
  )
}
