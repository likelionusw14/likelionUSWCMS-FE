import { DetailActions } from '@molecules'
import type { NoticeDetailProps } from '@types'

// 정보표 라벨/값 셀 (라벨 secondary-1 144px + 값 fill).
const LABEL = 'flex h-40 w-[144px] shrink-0 items-center bg-secondary-1 px-24 text-m-14 text-black'
const VALUE = 'flex h-40 min-w-px flex-1 items-center px-24 text-m-14 text-black'

// 공지 상세 — 제목 + 목록/수정 버튼 + 태그·작성일·첨부 정보표 + 공지내용. Figma 5:1369.
export function NoticeDetail({ notice }: NoticeDetailProps) {
  return (
    <div className="flex w-full flex-col gap-16">
      {/* 타이틀 카드 */}
      <div className="flex w-full flex-col items-end gap-16 rounded-8 bg-white px-32 py-24">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm-20 text-black">{notice.title}</h2>
          <DetailActions
            listHref="/admin/notices"
            editHref={`/admin/notices/${notice.id}/edit`}
          />
        </div>

        <div className="w-full overflow-hidden rounded-8 border border-secondary-1">
          <div className="flex w-full items-center border-b border-secondary-1">
            <span className={LABEL}>태그</span>
            <span className={VALUE}>{notice.tag}</span>
            <span className={LABEL}>작성일</span>
            <span className={VALUE}>{notice.createdAt}</span>
          </div>
          <div className="flex w-full items-center">
            <span className={LABEL}>첨부 링크</span>
            <span className={VALUE}>{notice.fileName || '-'}</span>
          </div>
        </div>
      </div>

      {/* 공지내용 카드 */}
      <div className="flex w-full flex-col gap-16 rounded-8 bg-white px-32 py-24">
        <h3 className="text-sm-18 text-black">공지내용</h3>
        <div className="min-h-[333px] w-full whitespace-pre-line rounded-8 bg-background-1 p-24 text-m-14 text-black">
          {notice.content}
        </div>
      </div>
    </div>
  )
}
