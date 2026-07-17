import { useEffect, useRef, useState } from 'react'
import { useEntityForm } from '@hooks'
import type { Notice, NoticeFormValues } from '@types'

const EMPTY_VALUES: NoticeFormValues = { title: '', tag: '', content: '' }

// 엔티티 → 폼 값 매핑. useEntityForm 의 useEffect 재실행을 막기 위해 모듈 상수 함수로 둔다.
function toNoticeValues(notice: Notice | undefined): NoticeFormValues {
  if (!notice) return EMPTY_VALUES
  return { title: notice.title, tag: notice.tag, content: notice.content }
}

// 엔티티 → 첨부 파일명. edit 진입 시 기존 파일명을 하이드레이트한다.
function toNoticeFileName(notice: Notice | undefined): string {
  return notice?.fileName ?? ''
}

// 공지 작성·수정 폼 상태. 고정여부(pinned)는 폼 값과 별개 상태로,
// 엔티티 정체성이 바뀌면 useEntityForm 과 동일하게 mustRead 로 재하이드레이트한다.
export function useNoticeForm(notice?: Notice) {
  const form = useEntityForm<Notice, NoticeFormValues>({
    entity: notice,
    toValues: toNoticeValues,
    toFileName: toNoticeFileName,
    redirectTo: '/admin/notices',
  })

  const [pinned, setPinned] = useState(() => notice?.mustRead ?? false)
  const hydratedId = useRef(notice?.id ?? '')
  useEffect(() => {
    const nextId = notice?.id ?? ''
    if (nextId === hydratedId.current) return
    hydratedId.current = nextId
    setPinned(notice?.mustRead ?? false)
  }, [notice])

  return { ...form, pinned, setPinned }
}
