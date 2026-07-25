import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Dropdown, Input, PinToggle } from '@atoms'
import { FileUploadField, FormRow } from '@molecules'
import type { NoticeFormProps, NoticeFormValues } from '@types'

// 공지 작성 폼 — 표 형태(라벨 secondary-1 + 입력): 제목·태그·고정여부·첨부링크·공지내용.
// 저장 시 제목/내용이 비어있으면 '작성내용을 다시 확인해주세요'(R/12 error) 표시. Figma 818:16948/16949.
export function NoticeForm({
  values,
  onFieldChange,
  onSubmit,
  onDelete,
  pinned,
  onPinnedChange,
  tagOptions,
  fileName,
  onFileChange,
  onFileClear,
}: NoticeFormProps) {
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [error, setError] = useState(false)

  // 공지내용 auto-grow — 엔터/입력마다 scrollHeight 만큼 높이를 늘린다. 값(초기값 포함) 변화 시 재계산.
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [values.content])

  function change(field: keyof NoticeFormValues, value: string) {
    onFieldChange(field, value)
    if (error) setError(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!values.title.trim() || !values.content.trim()) {
      event.preventDefault()
      setError(true)
      return
    }
    setError(false)
    onSubmit(event)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-24 px-24 pb-[120px] pt-32"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="w-full rounded-8 bg-white">
          {/* 제목 / 태그 — Figma 실측상 1280 만 2열(504+504)이고 800·375 는 전폭 단일 행 2개다
              (800: 1181:24374/24380 각 752). 그래서 경계가 sm 이 아니라 lg 다. */}
          <div className="relative z-40 flex w-full flex-col items-stretch border-b border-secondary-1 lg:h-[56px] lg:flex-row">
            {/* input/textarea 는 FormRow 입력 셀(flex)의 자식이라 min-w-px 가 없으면
                기본 폭(size=20, 약 188px) 아래로 줄지 않아 375에서 셀을 밀고 나간다. */}
            <FormRow label="제목" labelClassName="rounded-tl-8" className="min-h-[56px] lg:min-h-0">
              <Input
                variant="form"
                className="min-w-px"
                value={values.title}
                onChange={(event) => change('title', event.target.value)}
                placeholder="제목을 입력해주세요"
              />
            </FormRow>
            <FormRow label="태그" className="min-h-[56px] lg:min-h-0">
              <Dropdown
                value={values.tag}
                onChange={(value) => change('tag', value)}
                options={tagOptions}
                placeholder="태그"
                className="w-[172px] min-w-px"
              />
            </FormRow>
          </div>

          {/* 고정여부 */}
          <div className="relative z-30 flex h-[52px] w-full items-stretch">
            <FormRow label="고정여부">
              <PinToggle pinned={pinned} onChange={onPinnedChange} ariaLabel="고정여부" />
            </FormRow>
          </div>

          {/* 첨부링크 — 800·375 는 업로드 박스 아래로 찾기/삭제가 접혀 높이가 달라진다(800: 103). */}
          <div className="relative z-20 flex w-full items-stretch border-y border-secondary-1 lg:h-[115px]">
            <FormRow label="첨부링크">
              <FileUploadField
                fileName={fileName}
                onFileChange={onFileChange}
                onFileClear={onFileClear}
              />
            </FormRow>
          </div>

          {/* 공지내용 */}
          <div className="relative z-10 flex w-full items-stretch">
            <FormRow label="공지내용" labelClassName="rounded-bl-8">
              <textarea
                ref={contentRef}
                rows={6}
                className="no-scrollbar min-h-[148px] w-full min-w-px resize-none rounded-8 border border-secondary-1 bg-background-1 px-16 py-[8.5px] text-m-14 text-black placeholder:text-primary/50 focus:outline-none"
                value={values.content}
                onChange={(event) => change('content', event.target.value)}
                placeholder="공지내용을 작성해주세요"
              />
            </FormRow>
          </div>
        </div>

        {error && (
          <p className="px-8 text-right text-r-12 text-error">작성내용을 다시 확인해주세요</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-16">
        <Button type="submit" size="block">
          저장
        </Button>
        {onDelete ? (
          <Button size="block" variant="danger" onClick={onDelete}>
            삭제
          </Button>
        ) : null}
      </div>
    </form>
  )
}
