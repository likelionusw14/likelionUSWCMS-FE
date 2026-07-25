import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Dropdown } from '@atoms'
import { FileUploadField, FormRow } from '@molecules'
import type { SessionFormProps } from '@types'

// 세션자료 작성·수정 폼 — 표 형태(라벨 secondary-1 + 입력): 주차·파트 + 첨부파일.
// 저장 시 주차/파트/첨부파일이 비어있으면 '작성내용을 다시 확인해주세요'(R/12 error) 표시. Figma 818:16570/16569.
export function SessionForm({
  values,
  onFieldChange,
  onSubmit,
  onDelete,
  weekOptions,
  partOptions,
  fileName,
  onFileChange,
  onFileClear,
}: SessionFormProps) {
  const [error, setError] = useState(false)

  function change(field: keyof typeof values, value: string) {
    onFieldChange(field, value)
    if (error) setError(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!values.week.trim() || !values.part.trim() || !fileName.trim()) {
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
          {/* 주차 / 파트 — 모바일은 한 행에 두 칸을 넣을 폭이 없어 전폭 단일 행 2개로 쪼갠다 (Figma 1181:24897 / 24902) */}
          <div className="relative z-20 flex w-full flex-col items-stretch border-b border-secondary-1 sm:h-[56px] sm:flex-row">
            <FormRow label="주차" labelClassName="rounded-tl-8" className="min-h-[56px] sm:min-h-0">
              <Dropdown
                value={values.week}
                onChange={(value) => change('week', value)}
                options={weekOptions}
                placeholder="0주차"
                className="w-[172px] min-w-px"
              />
            </FormRow>
            <FormRow label="파트" className="min-h-[56px] sm:min-h-0">
              <Dropdown
                value={values.part}
                onChange={(value) => change('part', value)}
                options={partOptions}
                placeholder="기획"
                className="w-[172px] min-w-px"
              />
            </FormRow>
          </div>
          {/* 첨부파일 — 모바일은 업로드 박스 아래로 찾기/삭제가 접히므로 높이를 고정하지 않는다 (Figma 1181:24907) */}
          <div className="relative z-10 flex w-full items-stretch sm:h-[115px]">
            <FormRow label="첨부파일" labelClassName="rounded-bl-8">
              <FileUploadField
                fileName={fileName}
                onFileChange={onFileChange}
                onFileClear={onFileClear}
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
