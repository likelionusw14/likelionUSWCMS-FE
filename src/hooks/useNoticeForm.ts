import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadFile } from '@api'
import { useCreateNotice, useUpdateNotice } from '@hooks'
import type { ApiCreateNoticeRequest, ApiNoticeTag } from '@api'
import type { Notice, NoticeFormValues } from '@types'

// 폼 tag 값은 NoticeTag enum(NOTICE_TAG_OPTIONS 의 value). 미선택이면 기본값 OTHER.
const EMPTY_VALUES: NoticeFormValues = { title: '', tag: '', content: '' }

// 엔티티 → 폼 값 매핑. tag 는 enum 원본(tagValue)을 사용해 드롭다운 value 와 일치시킨다.
function toNoticeValues(notice: Notice | undefined): NoticeFormValues {
  if (!notice) return EMPTY_VALUES
  return { title: notice.title, tag: notice.tagValue, content: notice.content }
}

// 공지 작성·수정 폼 상태. 고정여부(pinned)는 폼 값과 별개 상태로,
// 엔티티 정체성이 바뀌면 mustRead 로 재하이드레이트한다.
export function useNoticeForm(notice?: Notice) {
  const navigate = useNavigate()
  const createNotice = useCreateNotice()
  const updateNotice = useUpdateNotice()

  const [values, setValues] = useState<NoticeFormValues>(() => toNoticeValues(notice))
  const [fileName, setFileName] = useState(() => notice?.fileName ?? '')
  // 새로 고른 이미지. 저장 시점에만 업로드한다 (null = 새로 고른 것 없음).
  const [file, setFile] = useState<File | null>(null)
  const [pinned, setPinned] = useState(() => notice?.mustRead ?? false)

  // 엔티티 정체성이 바뀔 때만 재하이드레이트 (매 렌더 리셋 방지). 신규 폼(entity 없음)은 id ''.
  const hydratedId = useRef(notice?.id ?? '')
  useEffect(() => {
    const nextId = notice?.id ?? ''
    if (nextId === hydratedId.current) return
    hydratedId.current = nextId
    setValues(toNoticeValues(notice))
    setFileName(notice?.fileName ?? '')
    setFile(null)
    setPinned(notice?.mustRead ?? false)
  }, [notice])

  function setField<K extends keyof NoticeFormValues>(field: K, value: NoticeFormValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  function selectFile(next: File) {
    setFile(next)
    setFileName(next.name)
  }

  function clearFile() {
    setFile(null)
    setFileName('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // 미선택 태그는 기타로 보낸다.
    const tag = (values.tag || 'OTHER') as ApiNoticeTag
    // 새 이미지를 골랐을 때만 업로드해 imageAssetId 를 얻는다.
    // 수정에서 미전달은 '기존 이미지 유지' 이므로 안 고르면 필드를 아예 넣지 않는다.
    const imageAssetId = file
      ? await uploadFile('NOTICE_IMAGE', file, crypto.randomUUID())
      : undefined
    const body: ApiCreateNoticeRequest = {
      title: values.title,
      content: values.content,
      tag,
      isFixed: pinned,
      ...(imageAssetId === undefined ? {} : { imageAssetId }),
    }

    if (notice) {
      await updateNotice.mutateAsync({ id: notice.id, body: { ...body, version: notice.version } })
    } else {
      await createNotice.mutateAsync(body)
    }
    navigate('/admin/notices')
  }

  return { values, setField, handleSubmit, fileName, selectFile, clearFile, pinned, setPinned }
}
